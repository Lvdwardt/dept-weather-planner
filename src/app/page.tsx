import Dept from "../../public/dept_logo.svg";
import ActivityCard from "@/components/ActivityCard";
import Content from "@/components/Content";
import Newsletter from "@/components/Newsletter";
import clsx from "clsx";
import useWeather from "@/hooks/useWeather";

export default async function Home() {
  const { temp, weatherTitle, currentWeather, could, shouldNot } =
    await useWeather();
  return (
    <div className="flex flex-col lg:flex-row">
      <div className="min-h-full w-full text-white lg:min-h-screen lg:w-[50vw]">
        <div className=" bg-primary p-4 lg:pl-24 lg:pr-12 lg:pt-6 xl:min-h-[75vh] xl:pl-36 2xl:pl-48">
          <div className="lg:ml-auto lg:max-w-[800px]">
            <div className="fill-white">
              <Dept fill="white" />
            </div>
            <Content />
          </div>
        </div>
        <div className="mt-auto w-full bg-dept-50 px-4 py-6 text-black lg:pl-24 xl:h-[25vh] xl:pl-36 2xl:pl-48">
          <div className="lg:ml-auto lg:max-w-[800px]">
            <h2 className="text-xl">Want to get a daily forecast?</h2>
            <Newsletter />
          </div>
        </div>
      </div>
      <div className="h-screen w-full text-black lg:w-[50vw]">
        <div className="flex h-full flex-col bg-white p-4 lg:pl-12 lg:pr-24 lg:pt-6 xl:pr-36 2xl:pr-48">
          <div className="flex flex-col gap-4 bg-secondary p-8 lg:max-w-[800px] lg:flex-row">
            <div className="flex min-w-min items-center text-[5rem] lg:w-1/4 lg:justify-center">
              {temp}°
            </div>
            <div className="flex flex-col lg:w-3/4">
              <h3 className="text-2xl">{weatherTitle}</h3>
              <p className="mt-4">{currentWeather.description}</p>
            </div>
          </div>
          <div className="flex max-w-[800px] flex-col pb-12">
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
