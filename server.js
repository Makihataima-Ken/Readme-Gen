import http from 'http';

const PORT = process.env.PORT;

const server =http.createServer((req,res)=>{
    console.log(req.url);
    console.log(req.method);
    res.writeHead(200,{'Content-Type':'text/html'});
    res.end('<h1> hello world! </h1>');
});

server.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
    console.log(`Access the app at http://localhost:${PORT}`);
});