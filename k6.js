import http from "k6/http";

const endpoint = `http://${__ENV.ENDPOINT_HOSTNAME || "localhost"}:3000`;

export default function () {
  http.get(endpoint);
}
