import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col lg:flex-row">
      <div className="h-screen w-full text-white">
        <div className="flex h-4/5 flex-col bg-primary p-4 lg:pl-24 lg:pr-12">
          <div className="">logo</div>
          <div className="mt-16 h-full w-full bg-dept-900">content</div>
        </div>

        <div className="mt-auto flex h-1/5 w-full bg-dept-50 p-4 text-black lg:pl-24">
          newsletter placeholder
        </div>
      </div>
      <div className="h-screen w-full text-black">
        <div className="flex h-full flex-col bg-white p-4 lg:pr-24">
          <div className="">weather box</div>

          <div className="mt-16 h-full bg-blue-100">list with activities</div>
        </div>
      </div>
    </div>
  );
}
