export default function fetcher(info: RequestInfo, init?: RequestInit) {
  return fetch(info, init).then((res) => res.json());
}
