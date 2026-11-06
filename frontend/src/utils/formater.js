import { digitsEnToFa } from "@persian-tools/persian-tools";
const DAY = 24 * 60 * 60 * 1000;
const vehicleNames = {
  airplane: "پرواز",
  train: "قطار",
  bus: "اتوبوس",
  ship: "کشتی",
  suv: "ماشین",
};

const getTourDays = (startDate, endDate) =>
  Math.round((new Date(endDate) - new Date(startDate)) / DAY);

const monthFormatter = new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
  month: "long",
  timeZone: "UTC",
});

const getTourMonth = (date) => monthFormatter.format(new Date(date));

const truncate = (text, max = 30) =>
  text.length > max ? `${text.slice(0, max).trimEnd()}...` : text;

const formatPrice = (price) =>
  digitsEnToFa(Number(price).toLocaleString("en-US"));

export const getVehicleName = (vehicle) =>
  vehicleNames[vehicle?.toLowerCase()] ?? vehicle;
// "2026-11-07" in the user's own time zone
export const toApiDate = (value) => new Date(value).toLocaleDateString("en-CA");

export { getTourDays, getTourMonth, truncate, formatPrice };
