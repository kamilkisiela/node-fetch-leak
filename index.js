import http from "node:http";

console.log(`Node version: ${process.version} (native fetch)`);

const server = http.createServer(function (_, res) {
  fetch("http://localhost:58080/status/200", {
    headers: {
      "User-Agent": `node@${process.version}`,
    },
  }).finally(() => {
    res.writeHead(200);
    res.end("Hello, World!");
  });
});

server.listen(3000);
