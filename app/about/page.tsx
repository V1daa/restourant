import Image from "next/image";

export default function About() {
  return (
    <section className="w-full h-[80vh] flex items-center justify-center gap-20 animate-pulse">
      <div className="">
        <Image src="/apple-logo.svg" alt="" width={300} height={300} />
      </div>
      <div className="flex items-center justify-center flex-col gap-5">
        <h1 className=" text-2xl">Your company name</h1>
        <p>About section of your company</p>
      </div>
    </section>
  );
}
