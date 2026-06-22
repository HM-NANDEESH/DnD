const fs = require('fs');
const path = require('path');

const DB_DIR = path.join(__dirname, '..', 'data');
const DB_FILE = path.join(DB_DIR, 'db.json');

let client = null;
let db = null;
let MongoClient = null;

async function getDb() {
  if (db) return db;
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error('MONGODB_URI is not defined');
  
  if (!MongoClient) {
    MongoClient = require('mongodb').MongoClient;
  }
  
  client = new MongoClient(uri);
  await client.connect();
  db = client.db();
  console.log('[Database] Connected to MongoDB Atlas successfully.');
  return db;
}

function ensureDbExists() {
  if (!fs.existsSync(DB_DIR)) {
    fs.mkdirSync(DB_DIR, { recursive: true });
  }
  if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify({ users: [], otps: [] }, null, 2));
  }
}

async function readDb() {
  ensureDbExists();
  try {
    const data = await fs.promises.readFile(DB_FILE, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading JSON DB, resetting:', err);
    const empty = { users: [], otps: [] };
    await fs.promises.writeFile(DB_FILE, JSON.stringify(empty, null, 2));
    return empty;
  }
}

async function writeDb(data) {
  ensureDbExists();
  const tempFile = `${DB_FILE}.tmp`;
  await fs.promises.writeFile(tempFile, JSON.stringify(data, null, 2));
  await fs.promises.rename(tempFile, DB_FILE);
}

const dbService = {
  async getUsers() {
    if (process.env.MONGODB_URI) {
      const database = await getDb();
      return await database.collection('users').find({}).toArray();
    } else {
      const dbData = await readDb();
      return dbData.users;
    }
  },

  async getUserByEmail(email) {
    if (!email) return null;
    const normalized = email.toLowerCase().trim();
    if (process.env.MONGODB_URI) {
      const database = await getDb();
      return await database.collection('users').findOne({ email: normalized });
    } else {
      const users = await this.getUsers();
      return users.find(u => u.email.toLowerCase().trim() === normalized) || null;
    }
  },

  async createUser(user) {
    const normalizedEmail = user.email.toLowerCase().trim();
    const newUser = {
      name: user.name.trim(),
      email: normalizedEmail,
      passwordHash: user.passwordHash,
      status: user.status || 'unverified',
      createdAt: new Date().toISOString(),
      dob: user.dob || null,
      gender: user.gender || null,
      phoneNumber: user.phoneNumber || null,
      ssoProvider: user.ssoProvider || null
    };

    if (process.env.MONGODB_URI) {
      const database = await getDb();
      // Check duplication
      const exists = await database.collection('users').findOne({ email: normalizedEmail });
      if (exists) {
        throw new Error('User already exists');
      }
      await database.collection('users').insertOne(newUser);
      return newUser;
    } else {
      const dbData = await readDb();
      // Check duplication
      const exists = dbData.users.some(u => u.email.toLowerCase().trim() === normalizedEmail);
      if (exists) {
        throw new Error('User already exists');
      }
      dbData.users.push(newUser);
      await writeDb(dbData);
      return newUser;
    }
  },

  async updateUser(email, updates) {
    if (!email) return null;
    const normalized = email.toLowerCase().trim();

    if (process.env.MONGODB_URI) {
      const database = await getDb();
      const user = await database.collection('users').findOne({ email: normalized });
      if (!user) return null;

      await database.collection('users').updateOne({ email: normalized }, { $set: updates });
      return await database.collection('users').findOne({ email: normalized });
    } else {
      const dbData = await readDb();
      const index = dbData.users.findIndex(u => u.email.toLowerCase().trim() === normalized);
      if (index === -1) return null;

      dbData.users[index] = { ...dbData.users[index], ...updates };
      await writeDb(dbData);
      return dbData.users[index];
    }
  },

  async getOtps() {
    if (process.env.MONGODB_URI) {
      const database = await getDb();
      return await database.collection('otps').find({}).toArray();
    } else {
      const dbData = await readDb();
      return dbData.otps;
    }
  },

  async getOtp(email, type) {
    if (!email) return null;
    const normalized = email.toLowerCase().trim();
    if (process.env.MONGODB_URI) {
      const database = await getDb();
      return await database.collection('otps').findOne({ email: normalized, type });
    } else {
      const otps = await this.getOtps();
      return otps.find(o => o.email.toLowerCase().trim() === normalized && o.type === type) || null;
    }
  },

  async saveOtp(email, code, expiresAt, cooldownUntil, type) {
    if (!email) return null;
    const normalized = email.toLowerCase().trim();
    const newOtp = {
      email: normalized,
      code,
      expiresAt: expiresAt.toISOString(),
      cooldownUntil: cooldownUntil.toISOString(),
      type
    };

    if (process.env.MONGODB_URI) {
      const database = await getDb();
      // Remove existing OTP of this type
      await database.collection('otps').deleteMany({ email: normalized, type });
      await database.collection('otps').insertOne(newOtp);
      return newOtp;
    } else {
      const dbData = await readDb();
      // Remove existing OTP of this type
      dbData.otps = dbData.otps.filter(o => !(o.email.toLowerCase().trim() === normalized && o.type === type));
      dbData.otps.push(newOtp);
      await writeDb(dbData);
      return newOtp;
    }
  },

  async deleteOtp(email, type) {
    if (!email) return;
    const normalized = email.toLowerCase().trim();

    if (process.env.MONGODB_URI) {
      const database = await getDb();
      await database.collection('otps').deleteMany({ email: normalized, type });
    } else {
      const dbData = await readDb();
      dbData.otps = dbData.otps.filter(o => !(o.email.toLowerCase().trim() === normalized && o.type === type));
      await writeDb(dbData);
    }
  }
};

module.exports = dbService;
