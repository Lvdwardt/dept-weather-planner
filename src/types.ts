export type Weather = {
  temperature: {
    temp: number;
    metric: string;
  };
  weatherInfo: {
    title: string;
    description: string;
    minTemp: number;
    maxTemp: number;
  }[];
};
