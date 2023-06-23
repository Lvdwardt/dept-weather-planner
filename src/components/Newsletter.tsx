"use client";

export default function Newsletter() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submit");
  };

  return (
    <form
      className="mt-4 flex flex-col gap-4 lg:max-w-[350px] lg:flex-row"
      onSubmit={handleSubmit}
    >
      <input
        type="email"
        className="w-full rounded-full border border-black p-2 py-4 text-center placeholder:text-black lg:w-2/3"
        placeholder="Enter your e-mailadres"
      />
      <button className="w-full rounded-full border border-black bg-black p-2 py-4 text-center text-white lg:w-1/3">
        Submit
      </button>
    </form>
  );
}
