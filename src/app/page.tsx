import Image from "next/image";
import Dept from "../../public/dept_logo.svg";
import { Weather } from "@/types";

export default async function Home() {
  const response = await fetch(
    "https://dtnl-frontend-internship-case.vercel.app/api/get-weather"
  );
  const { temperature, weatherInfo } = (await response.json()) as Weather;

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

  // if no weather is found, throw an error
  if (!currentWeather) {
    throw new Error("No weather found");
  }

  // replace the {{ CELCIUS }} placeholder with the current temperature
  const weatherTitle = currentWeather.title.replace(
    "{{ CELCIUS }}",
    temperature.temp.toString()
  );

  return (
    <div className="flex flex-col lg:flex-row">
      <div className="h-screen w-full text-white">
        <div className="flex h-4/5 flex-col bg-primary p-4 lg:pl-24 lg:pr-12">
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
        <div className="flex h-full flex-col bg-white p-4 lg:pl-12 lg:pr-24">
          <div className="flex flex-col gap-4 bg-secondary p-8 lg:flex-row">
            <div className="flex items-center text-[5rem] lg:w-1/4 lg:justify-center">
              {temperature.temp}°
            </div>
            <div className="flex flex-col lg:w-3/4">
              <h3 className="text-2xl">{weatherTitle}</h3>
              <p className="mt-4">{currentWeather.description}</p>
            </div>
          </div>
          <h3 className="mt-12 text-xl">Some things you could do:</h3>
          {/* map 5 times over this component */}
          {Array.from(Array(3).keys()).map((i) => (
            <div className="mt-4 flex flex-col bg-teal-100 pt-4 lg:flex-row">
              <div className="h-16 w-full lg:w-1/6">image</div>
              <div className="w-full border-b border-red-500 lg:w-5/6">
                <h4 className="text-2xl">title</h4>
                <p>description</p>
              </div>
            </div>
          ))}
          <h3 className="mt-12 text-xl">Some things you should not do:</h3>
          {/* map 5 times over this component */}
          {Array.from(Array(3).keys()).map((i) => (
            <div className="mt-4 flex flex-col bg-teal-100 pt-4 lg:flex-row">
              <div className="h-16 w-full lg:w-1/6">image</div>
              <div className="w-full border-b border-red-500 lg:w-5/6">
                <h4 className="text-2xl">title</h4>
                <p>description</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
