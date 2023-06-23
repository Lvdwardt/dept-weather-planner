"use client";

import clsx from "clsx";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function Newsletter() {
  const [email, setEmail] = useState("");

  const [status, setStatus] = useState<"success" | "error" | "">("");

  const [loading, setLoading] = useState(false);

  const emailRegex = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,63}$/g);

  // check the email address
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if (emailRegex.test(email)) {
      setStatus("success");
      // do something with the email address
      // ...
      setEmail("");
      toast.success("Successfully subscribed to the daily forecast", {
        id: "newsletter",
      });
    } else {
      setStatus("error");
      toast.error("Please enter a valid e-mail address", { id: "newsletter" });
    }
    setLoading(false);
  };

  return (
    <>
      <form
        className="mt-4 flex flex-col gap-4 lg:max-w-[350px] lg:flex-row"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          className={clsx(
            "w-full min-w-fit rounded-full border-2 border-black p-4 text-center placeholder:text-black lg:w-2/3",
            status == "" && "border-black",
            !loading && status == "success" && " border-green-500",
            !loading && status == "error" && " border-red-500"
          )}
          placeholder="Enter your e-mailadress"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          className={clsx(
            "w-full rounded-full border bg-black p-2 py-4 text-center text-white lg:w-1/3",
            loading && "opacity-50"
          )}
        >
          Submit
        </button>
      </form>
      <Toaster />
    </>
  );
}
