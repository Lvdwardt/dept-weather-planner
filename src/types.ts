export type Weather = {
  temperature: {
    temp: number;
    metric: string;
  };
  weatherInfo: {
    title: string;
    description: string;
    minTemp: number | null;
    maxTemp: number | null;
  }[];
};

export type Activity = {
  title: string;
  description: string;
  imageUrl: string;
  url: string;
  minTemp: number | null;
  maxTemp: number | null;
};

export type Activities = {
  [key: string]: Activity[];
};
