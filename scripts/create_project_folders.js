import fs from 'fs';
import path from 'path';

// Usage:
//  node scripts/create_project_folders.js         -> creates folders for demo projects found in src/data/demoData.ts
//  node scripts/create_project_folders.js id1 id2 -> creates folders for provided ids

const root = process.cwd();
const publicDir = path.join(root, 'public', 'projects');
if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });

const args = process.argv.slice(2);
let ids = args;

if (ids.length === 0) {
  // Try to read demoData.ts and extract ids from demoProjects
  const demoPath = path.join(root, 'src', 'data', 'demoData.ts');
  if (fs.existsSync(demoPath)) {
    const content = fs.readFileSync(demoPath, 'utf8');
    const matches = [...content.matchAll(/id:\s*'([0-9a-zA-Z_-]+)'/g)];
    ids = matches.map((m) => m[1]);
  }
}

if (ids.length === 0) {
  console.error('No project ids provided and none found in demoData.ts');
  process.exit(1);
}

ids.forEach((id) => {
  const dir = path.join(publicDir, id.toString());
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    // create a .gitkeep and a README
    fs.writeFileSync(path.join(dir, '.gitkeep'), '');
    fs.writeFileSync(path.join(dir, 'README.md'), `Place project images for project ${id} here.`);
    console.log('Created', dir);
  } else {
    console.log('Exists', dir);
  }
});

console.log('Done.');
