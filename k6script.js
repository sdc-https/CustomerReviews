import http from "k6/http";
import { sleep } from "k6";
// GET
export let options = {
  scenarios: {
    constant_request_rate: {
      executor: "constant-arrival-rate",
      rate: 1000,
      timeUnit: "1s",
      duration: "30s",
      preAllocatedVUs: 100,
      maxVUs: 300,
    },
  },
};
export default function () {
  let rndId = Math.floor(Math.random() * (10000000 - 9000000) + 9000000);
  const BASE_URL = `http://localhost:3004/reviews/${rndId}`;
  http.get(`${BASE_URL}`);
}

// POST
// export let options = {
//   scenarios: {
//     constant_request_rate: {
//       executor: "constant-arrival-rate",
//       rate: 1000,
//       timeUnit: "1s",
//       duration: "30s",
//       preAllocatedVUs: 100,
//       maxVUs: 200,
//     },
//   },
// };
// export default function () {
//   const BASE_URL = 'http://localhost:3004/reviews';
//   let rndId = Math.floor(Math.random() * (10000000 - 9000000) + 9000000);
//     http.post(`${BASE_URL}`, JSON.stringify({rndId}), { headers: { 'Content-Type': 'application/json' } });
// }