export const routeGraph = {
  Mysuru: ["Bengaluru", "Chennai", "Hyderabad"],
  Bengaluru: ["Mysuru", "Chennai", "Mumbai", "Delhi", "Hyderabad"],
  Chennai: ["Mysuru", "Bengaluru", "Delhi", "Mumbai"],
  Hyderabad: ["Mysuru", "Bengaluru", "Mumbai"],
  Mumbai: ["Bengaluru", "Chennai", "Delhi", "Hyderabad"],
  Delhi: ["Bengaluru", "Chennai", "Mumbai"]
};
