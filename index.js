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

server.listen(3000, (error, address) => {
  if (error) {
    console.error(error);
    process.exit(1);
  }
  // eslint-disable-next-line no-console
  console.log(`Server is running... Ready for K6! - ${address}`);
});
