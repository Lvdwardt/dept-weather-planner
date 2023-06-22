import { Activity } from "@/types";
import Image from "next/image";

export default function ActivityCard({ activity }: { activity: Activity }) {
  const validateImageUrl = (imageUrl: string) => {
    // imageurl is a number, use unknown.png
    if (!isNaN(parseInt(imageUrl))) {
      return `/unknown.png`;
    }
    // imageurl is not a number, use check if url starts with https
    else if (imageUrl.startsWith("https")) {
      return imageUrl;
    } else {
      return `/unknown.png`;
    }
  };

  return (
    <div className="mt-6 flex flex-col gap-4 md:flex-row">
      <div className=" relative h-32 w-full overflow-hidden lg:h-full lg:w-1/6">
        <Image
          alt={`${activity.title}`}
          // check if imageUrl is a number, if so, use unknown.png
          src={validateImageUrl(activity.imageUrl)}
          height={250}
          width={250}
          className="absolute h-full w-full overflow-hidden object-cover"
        />
      </div>
      <div className="w-full border-b border-dept-100 lg:w-5/6">
        <h4 className="text-2xl">{activity.title}</h4>
        <p>{activity.description}</p>
      </div>
    </div>
  );
}
