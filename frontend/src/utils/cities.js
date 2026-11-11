import locations from "../data/locations.json";

const getCities = () => locations;

const namesById = Object.fromEntries(locations.map((l) => [l.id, l.name]));

const getLocationName = (location) => namesById[location.id];

export { getCities, getLocationName };
