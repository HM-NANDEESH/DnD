const fs = require('fs');
const path = require('path');

const filesToCopy = [
  'index.html',
  'app-v2.js',
  'app-v2.css',
  'db.js',
  'sw.js',
  'manifest.json',
  'audio.js',
  'demo.js',
  'icon.png',
  'icon_192.png'
];

const destDir = path.join(__dirname, 'www');

// Create www directory if it doesn't exist
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir);
}

// Copy list of files
filesToCopy.forEach(file => {
  const src = path.join(__dirname, file);
  const dest = path.join(destDir, file);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    console.log(`Copied ${file} to www/`);
  }
});

// Copy all .png and .webp files in root directory
fs.readdirSync(__dirname).forEach(file => {
  const ext = path.extname(file).toLowerCase();
  if ((ext === '.png' || ext === '.webp') && file !== 'icon.png' && file !== 'icon_192.png') {
    const src = path.join(__dirname, file);
    const dest = path.join(destDir, file);
    fs.copyFileSync(src, dest);
    console.log(`Copied asset ${file} to www/`);
  }
});

console.log('Build completed! Web assets successfully prepped in www/ directory.');
