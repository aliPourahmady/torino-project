import { digitsEnToFa } from "@persian-tools/persian-tools";

import { getLocationName } from "@/utils/cities";
import { formatDate, getVehicleName } from "@/utils/formater";

const perks = [
  { label: "تورلیدر از مبدا", icon: "/images/user-tick.svg" },
  { label: "برنامه سفر", icon: "/images/map.svg" },
  { label: "تضمین کیفیت", icon: "/images/medal-star.svg" },
];

const info = [
  {
    label: "مبدا",
    icon: "/images/routing-2.svg",
    desktopOnly: true,
    getValue: (tour) => getLocationName(tour.origin),
  },
  {
    label: "تاریخ رفت",
    icon: "/images/calendar (3).svg",
    desktopOnly: true,
    getValue: (tour) => formatDate(tour.startDate),
  },
  {
    label: "تاریخ برگشت",
    icon: "/images/calendar-2.svg",
    desktopOnly: true,
    getValue: (tour) => formatDate(tour.endDate),
  },
  {
    label: "حمل و نقل",
    icon: "/images/bus.svg",
    getValue: (tour) => getVehicleName(tour.fleetVehicle),
  },
  {
    label: "ظرفیت",
    icon: "/images/profile-2user.svg",
    getValue: (tour) => `حداکثر ${digitsEnToFa(String(tour.capacity))} نفر`,
  },
  {
    label: "بیمه",
    icon: "/images/security.svg",
    getValue: (tour) => (tour.insurance ? "بیمه ۵۰ هزار دیناری" : "ندارد"),
  },
];

export { perks, info };
