import { digitsEnToFa } from "@persian-tools/persian-tools";
import { vehicles } from "src/const/vehicles";
import { transactionTypes } from "src/const/transactionTypes";
const DAY = 24 * 60 * 60 * 1000;

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

const findVehicle = (vehicle) =>
  vehicles.find((v) => v.key === vehicle?.toLowerCase());

export const getVehicleName = (vehicle) =>
  findVehicle(vehicle)?.label ?? vehicle;

const getTransactionTypeName = (type) =>
  transactionTypes.find((t) => t.key === type?.toLowerCase())?.label ?? type;

export const getVehicleIcon = (vehicle) => findVehicle(vehicle)?.icon;

const toApiDate = (value) => new Date(value).toLocaleDateString("en-CA");
const formatDate = (date) =>
  new Date(date).toLocaleDateString("fa-IR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });

const weekdayFormatter = new Intl.DateTimeFormat("fa-IR", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

const formatDateWithWeekday = (date) =>
  weekdayFormatter.format(new Date(date)).replace("،", "");

const isTourFinished = (endDate) =>
  endDate ? new Date(endDate).getTime() < Date.now() : false;

const formatDateTime = (value) => {
  const date = new Date(value);
  const day = date.toLocaleDateString("fa-IR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const time = date.toLocaleTimeString("fa-IR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  return `${time} - ${day}`;
};
export {
  getTourDays,
  getTourMonth,
  truncate,
  formatPrice,
  formatDate,
  toApiDate,
  formatDateTime,
  formatDateWithWeekday,
  isTourFinished,
  getTransactionTypeName,
};
