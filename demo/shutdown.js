const http = require('http');

http.get('http://localhost:8001/shutdown', () => {
}).on("error", (err) => {
  console.log(err.message);
});
