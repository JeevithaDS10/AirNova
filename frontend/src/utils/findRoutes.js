import { routeGraph } from "../data/routeGraph";

export function findRoutes(from, to) {
  const results = [];

  // 1️⃣ Direct flight
  if (routeGraph[from]?.includes(to)) {
    results.push([from, to]);
  }

  // 2️⃣ One-stop flights
  routeGraph[from]?.forEach((via) => {
    if (routeGraph[via]?.includes(to)) {
      results.push([from, via, to]);
    }
  });

  // 3️⃣ Two-stop flights (optional but realistic)
  routeGraph[from]?.forEach((via1) => {
    routeGraph[via1]?.forEach((via2) => {
      if (
        via2 !== from &&
        routeGraph[via2]?.includes(to)
      ) {
        results.push([from, via1, via2, to]);
      }
    });
  });

  return results;
}
