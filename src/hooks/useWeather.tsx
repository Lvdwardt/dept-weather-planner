import type { Weather, Activities, Activity } from "@/types";

export default async function useWeather() {
  // fetch the weather data
  const weather = await fetch(
    "https://dtnl-frontend-internship-case.vercel.app/api/get-weather",
    {
      cache: "no-store",
    }
  );
  // parse the weather data
  const { temperature, weatherInfo } = (await weather.json()) as Weather;

  // convert the temperature to celcius if needed
  const temp =
    temperature.metric === "FAHRENHEIT"
      ? Math.round(((temperature.temp - 32) * 5) / 9)
      : temperature.temp;

  // find the weather info that matches the current temperature
  function findWeatherInfo(temp: number, weatherInfo: Weather["weatherInfo"]) {
    return weatherInfo.find((info) => {
      if (info.minTemp !== null && temp < info.minTemp) {
        return false;
      }
      if (info.maxTemp !== null && temp > info.maxTemp) {
        return false;
      }
      return true;
    });
  }

  // get the current weather info
  let currentWeather = findWeatherInfo(temp, weatherInfo);

  // if no weather is found, throw an error
  if (!currentWeather) {
    currentWeather = {
      title: "Something went wrong",
      description: "Please try refreshing the page.",
      minTemp: 0,
      maxTemp: 0,
    };
  }

  // replace the {{ CELCIUS }} placeholder with the current temperature
  const weatherTitle = currentWeather.title.replace(
    "{{ CELCIUS }}",
    temp.toString()
  );

  // fetch the activities data
  const activityData = await fetch(
    "https://dtnl-frontend-internship-case.vercel.app/api/get-activities",
    {
      next: {
        // only fetch this data once every 24 hours
        // revalidate: 60 * 60 * 24,
      },
      cache: "no-store",
    }
  );

  // parse the activities data
  const activities = (await activityData.json()) as Activities;

  // lists of activities that can be done and that can't be done
  const could = [] as Activity[];
  const shouldNot = [] as Activity[];

  // loop over activities and put them in the right list
  activities.activities.forEach((activity) => {
    const { minTemp, maxTemp } = activity;

    if ((!minTemp || temp >= minTemp) && (!maxTemp || temp <= maxTemp)) {
      could.push(activity);
    } else {
      shouldNot.push(activity);
    }
  });

  return { temp, weatherTitle, currentWeather, could, shouldNot };
}
