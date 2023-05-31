# Native fetch leaks memory on Node v19+

1. [Install Docker](https://docs.docker.com/engine/install)
1. [Install Node v20+](https://nodejs.org/en/download/current)
1. [Install K6](https://k6.io/docs/get-started/installation/) (or use any other load testing tool)
1. Spin up `httpbin`: `docker run --rm -p "58080:8080" mccutchen/go-httpbin`
1. Run a simple http server in debug mode: `npm run debug`
1. Warm up the server: `k6 run k6.js --vus 5 --duration 10s`
1. Run first set of requests: `k6 run k6.js --vus 5 --duration 360s` and make the heap snapshot
1. Run second set of requests: `k6 run k6.js --vus 5 --duration 360s` and make the heap snapshot

# Node v20.2

| Requests made | Memory | Step number | Heap snapshot                         |
| ------------- | ------ | ----------- | ------------------------------------- |
| 295k          | 16MB   | 7           | `node-20.2-5vus360s (1).heapsnapshot` |
| 575k          | 23MB   | 8           | `node-20.2-5vus360s (2).heapsnapshot` |

# Node v18.16

| Requests made | Memory | Step number | Heap snapshot                          |
| ------------- | ------ | ----------- | -------------------------------------- |
| 360k          | 9MB    | 7           | `node-18.16-5vus360s (1).heapsnapshot` |
| 680k          | 9MB    | 8           | `node-18.16-5vus360s (2).heapsnapshot` |
