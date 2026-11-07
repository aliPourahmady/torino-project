import locations from "../data/locations.json";

export const getCities = () => locations;

const namesById = Object.fromEntries(locations.map((l) => [l.id, l.name]));

export const getLocationName = (location) => namesById[location.id];
