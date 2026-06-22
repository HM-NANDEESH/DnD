const fs = require('fs');
const path = require('path');

const DB_DIR = path.join(__dirname, '..', 'data');
const DB_FILE = path.join(DB_DIR, 'db.json');

function ensureDbExists() {
  if (!fs.existsSync(DB_DIR)) {
    fs.mkdirSync(DB_DIR, { recursive: true });
  }
  if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify({ users: [], otps: [] }, null, 2));
  }
}

function readDb() {
  ensureDbExists();
  try {
    const data = fs.readFileSync(DB_FILE, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading JSON DB, resetting:', err);
    const empty = { users: [], otps: [] };
    fs.writeFileSync(DB_FILE, JSON.stringify(empty, null, 2));
    return empty;
  }
}

function writeDb(data) {
  ensureDbExists();
  // Atomic write to avoid corruption
  const tempFile = `${DB_FILE}.tmp`;
  fs.writeFileSync(tempFile, JSON.stringify(data, null, 2));
  fs.renameSync(tempFile, DB_FILE);
}

const dbService = {
  getUsers() {
    return readDb().users;
  },

  getUserByEmail(email) {
    if (!email) return null;
    const normalized = email.toLowerCase().trim();
    return this.getUsers().find(u => u.email.toLowerCase().trim() === normalized) || null;
  },

  createUser(user) {
    const db = readDb();
    const normalizedEmail = user.email.toLowerCase().trim();
    
    // Check duplication
    const exists = db.users.some(u => u.email.toLowerCase().trim() === normalizedEmail);
    if (exists) {
      throw new Error('User already exists');
    }

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

    db.users.push(newUser);
    writeDb(db);
    return newUser;
  },

  updateUser(email, updates) {
    const db = readDb();
    const normalized = email.toLowerCase().trim();
    const index = db.users.findIndex(u => u.email.toLowerCase().trim() === normalized);
    if (index === -1) return null;

    db.users[index] = { ...db.users[index], ...updates };
    writeDb(db);
    return db.users[index];
  },

  getOtps() {
    return readDb().otps;
  },

  getOtp(email, type) {
    const normalized = email.toLowerCase().trim();
    return this.getOtps().find(o => o.email.toLowerCase().trim() === normalized && o.type === type) || null;
  },

  saveOtp(email, code, expiresAt, cooldownUntil, type) {
    const db = readDb();
    const normalized = email.toLowerCase().trim();
    
    // Remove existing OTP of this type
    db.otps = db.otps.filter(o => !(o.email.toLowerCase().trim() === normalized && o.type === type));

    const newOtp = {
      email: normalized,
      code,
      expiresAt: expiresAt.toISOString(),
      cooldownUntil: cooldownUntil.toISOString(),
      type
    };

    db.otps.push(newOtp);
    writeDb(db);
    return newOtp;
  },

  deleteOtp(email, type) {
    const db = readDb();
    const normalized = email.toLowerCase().trim();
    db.otps = db.otps.filter(o => !(o.email.toLowerCase().trim() === normalized && o.type === type));
    writeDb(db);
  }
};

module.exports = dbService;
