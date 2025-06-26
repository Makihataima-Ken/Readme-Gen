import dotenv from 'dotenv';
dotenv.config();
import http from 'http';
import fs from 'fs';
import path from 'path';
import axios from 'axios';


const PORT = process.env.PORT;
const HF_API_URL = "https://api-inference.huggingface.co/models/OpenAssistant/oasst-sft-4-pythia-12b-epoch-3.5";
const HF_API_KEY = process.env.HF_API_KEY;

const server =http.createServer(async (req,res)=>{
    console.log(req.url);
    console.log(req.method);

    // Serve static files
    if (req.method === 'GET') {
        if (req.url === '/') {
        serveStaticFile(res, 'public/index.html', 'text/html');
        } else if (req.url === '/style.css') {
        serveStaticFile(res, 'public/style.css', 'text/css');
        } else if (req.url === '/script.js') {
        serveStaticFile(res, 'public/script.js', 'text/javascript');
        }
    }
    else if (req.method === 'POST' && req.url === '/generate') {
        let body = '';
        req.on('data', chunk => body += chunk.toString());
        req.on('end', async () => {
        try {
            const data = JSON.parse(body);
            const prompt = formatPrompt(data);
            
            const response = await axios.post(
            HF_API_URL,
            { inputs: prompt },
            { headers: { 'Authorization': `Bearer ${HF_API_KEY}` } }
            );

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ content: response.data[0].generated_text }));
        } catch (error) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: error.message }));
        }
        });
    }
});


function serveStaticFile(res, filePath, contentType) {
  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404);
      res.end('File not found');
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    }
  });
}

function formatPrompt(data) {
  return `Generate a professional README.md with:
  - Project Name: ${data.name}
  - Description: ${data.description}
  - Installation: ${data.installation || 'npm install'}
  - Usage: ${data.usage}
  - License: ${data.license || 'MIT'}
  - GitHub: ${data.githubUsername}
  - Email: ${data.email}`;
}

server.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
    console.log(`Access the app at http://localhost:${PORT}`);
});