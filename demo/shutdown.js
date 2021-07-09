const http = require('http');

http.get('http://localhost:8001/shutdown', (resp) => {
}).on("error", (err) => {
  console.log(err.message);
});
