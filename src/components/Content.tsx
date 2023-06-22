"use client";

import clsx from "clsx";
import { useState } from "react";

export default function Content() {
  const [open, setOpen] = useState(false);
  return (
    <div className="mb-4 mt-16 h-full w-full font-light ">
      <h1 className="pb-6 text-4xl font-normal lg:text-7xl">
        DEPT® weather planner
      </h1>
      <span className="text-base/loose">
        Picture this: an application that doesn't just tell you the weather, but
        also helps you plan your activities around it. Imagine knowing exactly
        the perfect day to plan that hike, or when to avoid the outdoor concert
        due to an unexpected shower. That's exactly what the Dept Weather
        Planner offers you.
      </span>
      <br />
      <br />
      <button
        className={clsx("underline", open ? "hidden" : "visible")}
        onClick={() => setOpen(!open)}
      >
        Read more
      </button>
      <span
        className={clsx(
          "mt-4 text-base/loose font-light",
          open ? "visible" : "hidden"
        )}
      >
        Built with cutting-edge technologies, our weather planner brings you
        accurate, real-time weather data with a slick and user-friendly
        interface. But it's not just a weather app; it's an intuitive daily
        planner that syncs with the weather. With a range of activities to
        choose from, it suggests the best options based on current and
        forecasted weather conditions. Read lessPicture this: an application
        that doesn't just tell you the weather, but also helps you plan your
        activities around it. Imagine knowing exactly the perfect day to plan
        that hike, or when to avoid the outdoor concert due to an unexpected
        shower. That's exactly what the Dept Weather Planner offers you. Built
        with cutting-edge technologies, our weather planner brings you accurate,
        real-time weather data with a slick and user-friendly interface. But
        it's not just a weather app; it's an intuitive daily planner that syncs
        with the weather. With a range of activities to choose from, it suggests
        the best options based on current and forecasted weather conditions.
      </span>
      <br />
      <button
        className={clsx("pt-4 underline", open ? "visible" : "hidden")}
        onClick={() => setOpen(!open)}
      >
        Read less
      </button>
    </div>
  );
}
