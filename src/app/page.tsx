"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { bookDemo } from "@/lib/bookingClient";
import Image from "next/image";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";


export default function Home() {
  const { user } = useAuth();
  const router = useRouter();

  async function handleDemoSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    if (!user) {
      alert("Please login to book a demo");
      router.push("/login");
      return;
    }

    try {
      await bookDemo(
        user.uid,
        formData.get("name") as string,
        formData.get("email") as string,
        formData.get("course") as string
      );
      alert("✅ Demo booked successfully!");
      form.reset();
    } catch {
      alert("❌ Failed to book demo");
    }
  }

  return (
    <div className="min-h-screen bg-[#F7F5FF]">

      {/* ================= HERO ================= */}
      <section className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-14 items-center">
        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl font-bold text-violet-800 leading-tight">
            India’s Most Loved <br /> Online Learning Platform
          </h1>

          <p className="mt-6 text-lg text-gray-600 max-w-xl">
            Live interactive classes for CBSE, ICSE, Matric, JEE & NEET.
          </p>

          <div className="mt-8 flex gap-4">
            <Link
              href="/courses"
              className="bg-violet-700 text-white px-6 py-3 rounded-lg font-semibold"
            >
              Get Started
            </Link>
            <Link
              href="/courses"
              className="border-2 border-violet-700 text-violet-700 px-6 py-3 rounded-lg font-semibold"
            >
              View Courses
            </Link>
          </div>
        </motion.div>

       {/* Right Demo Card */} 
       <motion.div id="demo" 
       initial={{ opacity: 0, scale: 0.95 }} 
       animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }} 
        className="bg-white rounded-2xl shadow-xl p-8" > 
        <h3 className="text-xl font-bold text-gray-900 mb-6"> 
          Book a Free Live Demo
           </h3> 
           <form className="space-y-4" onSubmit={handleDemoSubmit}>
           <input name="name" 
           type="text" 
           placeholder="Student Name" 
           required className="w-full border rounded-lg px-4 py-3 text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500" /> 
          <input name="email" 
          type="email"
          placeholder="Email Address"
         required className="w-full border rounded-lg px-4 py-3 text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500" />
          <select name="course" 
          required defaultValue=""
         className="w-full border rounded-lg px-4 py-3 text-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500" 
         onChange={(e) => e.currentTarget.classList.remove("text-gray-500") } > 
         <option value="" disabled> Select Course </option> 
         <option value="class-9">Class 9</option> 
         <option value="class-10">Class 10</option> 
         <option value="class-11">Class 11</option> 
         <option value="class-12">Class 12</option>
          <option value="jee">JEE</option>
           <option value="neet">NEET</option>
           </select> <button type="submit" className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 rounded-lg" > 
            Book Demo Class
             </button> 
             </form> 
             </motion.div>
              </section>

      {/* ================= HELP BANNER (FULL WIDTH) ================= */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="rounded-3xl bg-purple-700 text-white shadow-xl">
          <div className="grid md:grid-cols-2 gap-10 items-center p-12">

            {/* LEFT */}
            <div>
              <h2 className="text-4xl font-extrabold mb-4">
                Happy to help you!
              </h2>

              <p className="text-purple-100 text-lg mb-8 max-w-xl">
                Need more details? Our expert academic counsellors will patiently
                explain everything you want to know.
              </p>

              <Link href="/expert-appointment">
  <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-8 py-4 rounded-xl">
    Speak to an expert
  </button>
</Link>

            </div>

            {/* RIGHT IMAGE */}
            <div className="flex justify-center md:justify-end">
             <div className="flex justify-center md:justify-end">
  <Image
    src="/group.png"
    alt="Expert Academic Counsellor"
    width={320}
    height={320}
    className="rounded-2xl object-cover shadow-lg"
    priority
  />
</div>

            </div>

          </div>
        </div>
      </section>
    <section className="bg-[#F6F3FF] py-20">
  <div className="max-w-7xl mx-auto px-6">

    {/* HEADER */}
    <div className="text-center mb-14">
      <h2 className="text-4xl font-extrabold text-violet-800 mb-4">
        Our Expert Teachers
      </h2>
      <p className="text-gray-600 max-w-2xl mx-auto">
        Highly qualified educators dedicated to student success.
      </p>
    </div>

    {/* TEACHERS GRID */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

      {[
        {
          name: "Ms. Kanimozhi",
          degree: "M.Sc., Mathematics",
          role: "Maths Expert",
          img: "/kanimozhi.png",
        },
        {
          name: "Ms. Dharshini",
          degree: "M.Sc., Ph.D – Physics",
          role: "Physics Expert",
          img: "/dharshini.png",
        },
        {
          name: "Ms. Ilakiya",
          degree: "M.Sc., Biochemistry",
          role: "Chemistry Expert",
          img: "/ilakiya.png",
        },
        {
          name: "Ms. Banu Priya",
          degree: "M.Sc., Biology",
          role: "Biology Expert",
          img: "/founder.png",
        },
      ].map((t) => (
        <div
          key={t.name}
          className="bg-white rounded-2xl shadow-md
                     h-[420px] flex flex-col items-center
                     justify-between p-6 text-center
                     hover:shadow-xl transition"
        >
          {/* IMAGE */}
          <div className="flex justify-center">
            <img
              src={t.img}
              alt={t.name}
              className="w-36 h-36 rounded-full object-cover"
            />
          </div>

          {/* NAME */}
          <h3 className="text-lg font-bold text-gray-900 mt-4">
            {t.name}
          </h3>

          {/* DEGREE */}
          <p className="text-gray-700 text-sm">
            {t.degree}
          </p>

          {/* ROLE */}
          <span className="bg-yellow-400 text-black font-semibold
                           px-5 py-2 rounded-full mt-4">
            {t.role}
          </span>
        </div>
      ))}
    </div>
  </div>
</section>


      {/* ================= STATS ================= */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8 text-center">
          <Stat number="10,000+" label="Happy Students" />
          <Stat number="500+" label="Expert Teachers" />
          <Stat number="95%" label="Success Rate" />
        </div>
      </section>

    </div>
  );
}

function Stat({ number, label }: { number: string; label: string }) {
  return (
    <div className="rounded-xl border p-8">
      <p className="text-4xl font-bold text-violet-700">{number}</p>
      <p className="mt-2 text-gray-600 font-medium">{label}</p>
    </div>
  );
}
