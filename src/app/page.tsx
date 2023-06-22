import Dept from "../../public/dept_logo.svg";
import { type Activities, type Activity, type Weather } from "@/types";
import ActivityCard from "@/components/ActivityCard";
import Content from "@/components/Content";
import Newsletter from "@/components/Newsletter";
import clsx from "clsx";

export default async function Home() {
  // fetch the weather data
  const weather = await fetch(
    "https://dtnl-frontend-internship-case.vercel.app/api/get-weather"
  );
  // parse the weather data
  const { temperature, weatherInfo } = (await weather.json()) as Weather;

  // find the weather that matches the current temperature
  let currentWeather = weatherInfo.find((weather) => {
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
        revalidate: 60 * 60 * 24,
      },
    }
  );

  // parse the activities data
  // const activities = (await activityData.json()) as Activity[];
  const activities = (await activityData.json()) as Activities;
  console.log(activities.activities.length);

  // lists of activities that can be done and that can't be done
  const could = [] as Activity[];
  const shouldNot = [] as Activity[];

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
    <div className="flex max-w-[3000px] flex-col lg:flex-row">
      <div className=" min-h-full w-full text-white lg:min-h-screen">
        <div className="flex flex-col bg-primary p-4 lg:pl-24 lg:pr-12 lg:pt-6 xl:pl-36 2xl:pl-48">
          <div className="fill-white">
            <Dept fill="white" />
          </div>
          <Content />
        </div>

        <div className="mt-auto w-full bg-dept-50 px-4 py-6 text-black lg:pl-24 xl:pl-36 2xl:pl-48">
          <h2 className="text-xl">Want to get a daily forecast?</h2>
          <Newsletter />
        </div>
      </div>
      <div className="h-screen w-full text-black">
        <div className="flex h-full flex-col bg-white p-4 lg:pl-12 lg:pr-24 lg:pt-6 xl:pr-36 2xl:pr-48">
          <div className="flex flex-col gap-4 bg-secondary p-8 lg:flex-row">
            <div className="flex min-w-min items-center text-[5rem] lg:w-1/4 lg:justify-center">
              {temp}°
            </div>
            <div className="flex flex-col lg:w-3/4">
              <h3 className="text-2xl">{weatherTitle}</h3>
              <p className="mt-4">{currentWeather.description}</p>
            </div>
          </div>
          <div className="flex flex-col pb-12">
            <h3
              className={clsx("mt-12 text-2xl", could.length === 0 && "hidden")}
            >
              Some things you could do:
            </h3>
            {/* map over could */}
            {could.map((activity) => (
              <ActivityCard key={activity.title} activity={activity} />
            ))}
            <h3
              className={clsx(
                "mt-12 text-2xl",
                shouldNot.length === 0 && "hidden"
              )}
            >
              Some things you should not do:
            </h3>
            {/* map over shouldNot */}
            {shouldNot.map((activity) => (
              <ActivityCard key={activity.title} activity={activity} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
