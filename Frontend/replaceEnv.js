import fs from 'fs';
import path from 'path';

const searchStr = "'http://localhost:5000/api";
const replaceStr = "`${import.meta.env.VITE_API_URL}/api";
const searchStr2 = "`http://localhost:5000/api";
const replaceStr2 = "`${import.meta.env.VITE_API_URL}/api";

const imgSearchStr = "`http://localhost:5000/${";
const imgReplaceStr = "`${import.meta.env.VITE_API_URL}/${";

const filesToUpdate = [
  'src/Components/FeaturedItems.jsx',
  'src/Components/GlassModal.jsx',
  'src/Contexts/AuthContext.jsx',
  'src/Pages/Dashboard.jsx',
  'src/Pages/MyExchanges.jsx',
  'src/Pages/MyPoints.jsx',
  'src/Pages/MyUploads.jsx'
];

filesToUpdate.forEach(file => {
  const filePath = path.join(process.cwd(), file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace API endpoints wrapped in quotes: 'http://localhost:5000/api/...' -> `${import.meta.env.VITE_API_URL}/api/...`
    content = content.replace(/'http:\/\/localhost:5000\/api(.*?)\'/g, '`${import.meta.env.VITE_API_URL}/api$1`');
    
    // Replace API endpoints already in template literals: `http://localhost:5000/api/...` -> `${import.meta.env.VITE_API_URL}/api/...`
    content = content.replace(/`http:\/\/localhost:5000\/api(.*?)`/g, '`${import.meta.env.VITE_API_URL}/api$1`');

    // Replace Image URLs wrapped in template literals: `http://localhost:5000/${item.image...}` -> `${import.meta.env.VITE_API_URL}/${item.image...}`
    content = content.replace(/`http:\/\/localhost:5000\/\$\{/g, '`${import.meta.env.VITE_API_URL}/${');

    fs.writeFileSync(filePath, content);
    console.log(`Updated ${file}`);
  } else {
    console.log(`File not found: ${file}`);
  }
});
