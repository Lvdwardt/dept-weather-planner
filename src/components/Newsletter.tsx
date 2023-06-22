"use client";

export default function Newsletter() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submit");
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <input
        type="email"
        className="mt-4 w-full rounded-full border border-black p-2 py-4 text-center placeholder:text-black"
        placeholder="Enter your e-mailadres"
      />
      <button className="w-full rounded-full border border-black bg-black p-2 py-4 text-center text-white">
        Submit
      </button>
    </form>
  );
}
