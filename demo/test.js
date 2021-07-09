const http = require('http');

http.get('http://localhost:8001/', (res) => {
  console.log(`statusCode: ${res.statusCode}`);
  res.on('data', d => {
    process.stdout.write(d)
  });
}).on("error", (err) => {
  console.log(err.message);
});
