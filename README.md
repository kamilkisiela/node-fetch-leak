# Native fetch leaks memory on Node v19+

1. [Install Docker](https://docs.docker.com/engine/install)
1. [Install Node v20+](https://nodejs.org/en/download/current) and run `npm install`
1. [Install K6](https://k6.io/docs/get-started/installation/) (or use any other load testing tool)
1. Spin up `httpbin`: `docker run --rm -p "58080:8080" mccutchen/go-httpbin`
1. Run a simple http server in debug mode: `npm run debug:native` (or `npm run debug:undici`)
1. Warm up the server: `k6 run k6.js --vus 5 --duration 10s`
1. Run first set of requests: `k6 run k6.js --vus 5 --duration 360s` and make the heap snapshot
1. Run second set of requests: `k6 run k6.js --vus 5 --duration 360s` and make the heap snapshot

# Summary

| Requests made | v20.2 + fetch | v20.2 + undici v5.22.1 | v18.16 + fetch | v18.16 + undici v5.22.1 |
| ------------- | ------------- | ---------------------- | -------------- | ----------------------- |
| ~300k         | 16MB          | 19MB                   | 9MB            | 11MB                    |
| ~600k         | 23MB          | 26MB                   | 9MB            | 11MB                    |

# Node v20.2

## native fetch

| Requests made | Memory | Step number | Heap snapshot                         |
| ------------- | ------ | ----------- | ------------------------------------- |
| 295k          | 16MB   | 7           | `node-20.2-5vus360s (1).heapsnapshot` |
| 575k          | 23MB   | 8           | `node-20.2-5vus360s (2).heapsnapshot` |

## undici

| Requests made | Memory | Step number | Heap snapshot                                |
| ------------- | ------ | ----------- | -------------------------------------------- |
| 356k          | 19MB   | 7           | `node-20.2-5vus360s_undici (1).heapsnapshot` |
| 650k          | 26MB   | 8           | `node-20.2-5vus360s_undici (2).heapsnapshot` |

# Node v18.16

## native fetch

| Requests made | Memory | Step number | Heap snapshot                          |
| ------------- | ------ | ----------- | -------------------------------------- |
| 360k          | 9MB    | 7           | `node-18.16-5vus360s (1).heapsnapshot` |
| 680k          | 9MB    | 8           | `node-18.16-5vus360s (2).heapsnapshot` |

## undici

| Requests made | Memory | Step number | Heap snapshot                                 |
| ------------- | ------ | ----------- | --------------------------------------------- |
| 366k          | 11MB   | 7           | `node-18.16-5vus360s_undici (1).heapsnapshot` |
| 678k          | 11MB   | 8           | `node-18.16-5vus360s_undici (2).heapsnapshot` |
