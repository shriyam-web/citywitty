const fs = require('fs');
const path = require('path');

try {
  fs.unlinkSync(path.join(__dirname, 'app', 'page.tsx'));
  console.log('Deleted app/page.tsx');
} catch(e) {
  console.error('Error deleting page.tsx:', e.message);
}

try {
  fs.rmSync(path.join(__dirname, 'app', '[username]'), { recursive: true, force: true });
  console.log('Deleted app/[username]');
} catch(e) {
  console.error('Error deleting [username]:', e.message);
}
