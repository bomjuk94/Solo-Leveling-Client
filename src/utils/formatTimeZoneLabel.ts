import type { TimeZone } from "@/types";

export function formatTimeZoneLabel(tz: TimeZone) {
  const offset = tz.currentTimeOffsetInMinutes;
  const hours = Math.floor(Math.abs(offset) / 60);
  const minutes = Math.abs(offset) % 60;
  const sign = offset >= 0 ? "+" : "-";
  const offsetStr = `GMT${sign}${String(hours).padStart(2, "0")}:${String(
    minutes
  ).padStart(2, "0")}`;

  const city = tz.mainCities?.[0] || tz.name.split("/")[1] || tz.name;

  return `(${offsetStr}) ${tz.alternativeName} – ${city}`;
}
