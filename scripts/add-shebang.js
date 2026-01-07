#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const SHEBANG = '#!/usr/bin/env node\n';

function addShebang(filePath) {
  if (!filePath) {
    console.error('Usage: add-shebang.js <file>');
    console.error("Prepends '#!/usr/bin/env node' to the specified file");
    process.exit(1);
  }

  const resolvedPath = path.resolve(filePath);

  if (!fs.existsSync(resolvedPath)) {
    console.error(`Error: File '${filePath}' not found`);
    process.exit(1);
  }

  const content = fs.readFileSync(resolvedPath, 'utf8');

  if (content.startsWith('#!')) {
    console.error(`Warning: File '${filePath}' already has a shebang line`);
    process.exit(1);
  }

  const newContent = SHEBANG + content;
  fs.writeFileSync(resolvedPath, newContent, 'utf8');

  console.log(`Added Node shebang to '${filePath}'`);
}

const filePath = process.argv[2];
addShebang(filePath);
