export type TimeZone = {
  name: string;
  alternativeName: string;
  group: string[];
  continentCode: string;
  continentName: string;
  countryName: string;
  countryCode: string;
  mainCities: string[];
  rawOffsetInMinutes: number;
  abbreviation: string;
  rawFormat: string;
  currentTimeOffsetInMinutes: number;
  currentTimeFormat: string;
};
