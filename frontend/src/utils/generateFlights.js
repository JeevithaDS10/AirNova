const airlines = ["IndiGo", "Air India", "Vistara", "Akasa Air"];

export function generateFlights(routes) {
  return routes.map((path, index) => {
    const stops = path.length - 2;
    const basePrice = 3000 + stops * 1200;

    return {
      id: index,
      airline: airlines[index % airlines.length],
      path,
      stops,
      duration: `${2 + stops * 1}h ${15 + stops * 10}m`,
      price: basePrice + Math.floor(Math.random() * 800),
      departure: "06:00",
      arrival: "09:30"
    };
  });
}
