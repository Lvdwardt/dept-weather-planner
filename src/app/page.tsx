import Image from "next/image";
import Dept from "../../public/dept_logo.svg";
import { Activities, Activity, Weather } from "@/types";
import ActivityCard from "@/components/ActivityCard";

export default async function Home() {
  // fetch the weather data
  const weather = await fetch(
    "https://dtnl-frontend-internship-case.vercel.app/api/get-weather"
  );
  // parse the weather data
  const { temperature, weatherInfo } = (await weather.json()) as Weather;

  // find the weather that matches the current temperature
  const currentWeather = weatherInfo.find((weather) => {
    if (weather.minTemp && weather.maxTemp) {
      return (
        temperature.temp >= weather.minTemp &&
        temperature.temp <= weather.maxTemp
      );
    } else if (weather.minTemp) {
      return temperature.temp >= weather.minTemp;
    } else if (weather.maxTemp) {
      return temperature.temp <= weather.maxTemp;
    }
  });

  const temp = temperature.temp;

  // if no weather is found, throw an error
  if (!currentWeather) {
    throw new Error("No weather found");
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
        revalidate: 60 * 60 * 24,
      },
    }
  );

  // parse the activities data
  // const activities = (await activityData.json()) as Activity[];
  const activities = (await activityData.json()) as Activities;
  console.log(activities.activities.length);

  // lists of activities that can be done and that can't be done
  let could = [] as Activity[];
  let shouldNot = [] as Activity[];

  // loop over activities and put them in the right list
  activities.activities.forEach((activity) => {
    if (!activity.minTemp && !activity.maxTemp) {
      could.push(activity);
    } else if (activity.minTemp && activity.maxTemp) {
      if (temp >= activity.minTemp && temp <= activity.maxTemp) {
        could.push(activity);
      } else {
        shouldNot.push(activity);
      }
    } else if (activity.minTemp) {
      if (temp >= activity.minTemp) {
        could.push(activity);
      } else {
        shouldNot.push(activity);
      }
    } else if (activity.maxTemp) {
      if (temp <= activity.maxTemp) {
        could.push(activity);
      } else {
        shouldNot.push(activity);
      }
    }
  });

  return (
    <div className="flex flex-col lg:flex-row">
      <div className="h-screen w-full text-white">
        <div className="flex h-4/5 flex-col bg-primary p-4 lg:pl-24 lg:pr-12 lg:pt-6">
          <div className="fill-white">
            <Dept fill="white" />
          </div>
          <div className="mt-16 h-full w-full bg-dept-900">content</div>
        </div>

        <div className="mt-auto flex h-1/5 w-full bg-dept-50 p-4 text-black lg:pl-24">
          newsletter placeholder
        </div>
      </div>
      <div className="h-screen w-full text-black">
        <div className="flex h-full flex-col bg-white p-4 lg:pl-12 lg:pr-24 lg:pt-6">
          <div className="flex flex-col gap-4 bg-secondary p-8 lg:flex-row">
            <div className="flex items-center text-[5rem] lg:w-1/4 lg:justify-center">
              {temp}°
            </div>
            <div className="flex flex-col lg:w-3/4">
              <h3 className="text-2xl">{weatherTitle}</h3>
              <p className="mt-4">{currentWeather.description}</p>
            </div>
          </div>
          <div className="flex flex-col pb-12">
            <h3 className="mt-12 text-xl">Some things you could do:</h3>
            {/* map over could */}
            {could.map((activity) => (
              <ActivityCard activity={activity} />
            ))}
            <h3 className="mt-12 text-xl">Some things you should not do:</h3>
            {/* map over shouldNot */}
            {shouldNot.map((activity) => (
              <ActivityCard activity={activity} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
