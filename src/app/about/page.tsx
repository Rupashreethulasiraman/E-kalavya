"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function AboutFounder() {
  return (
    <section className="bg-gradient-to-br from-violet-50 to-white py-20">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

        {/* LEFT CONTENT */}
        <div>
          <h2 className="text-5xl font-extrabold mb-6">
            <span className="text-gray-900">About </span>
            <span className="text-violet-700">the Founder</span>
          </h2>

          <p className="text-lg text-gray-700 mb-4">
            Hi, I’m{" "}
            <span className="font-semibold text-violet-700">
              Banupriya Sathishkumar
            </span>
            , the founder of{" "}
            <span className="font-semibold text-violet-700">E-Kalavya</span>.
          </p>

          <p className="text-gray-700 leading-relaxed mb-4">
            My journey began not in a boardroom, but in a small classroom filled
            with curious minds and endless questions. Over the years, I’ve seen
            many students lose confidence not because they lacked talent, but
            because they didn’t receive the right guidance at the right time.
          </p>

          <p className="italic text-violet-700 font-medium mb-4">
            “Education isn’t about finishing the syllabus; it’s about unlocking
            potential.”
          </p>

          <p className="text-gray-700 leading-relaxed mb-6">
            At E-Kalavya, we build a learning space that listens — where
            questions are encouraged, mistakes are part of growth, and every
            child feels confident and capable of excellence.
          </p>

          <p className="font-semibold text-gray-900">
            — Banupriya Sathishkumar, M.Sc., B.Ed., CMT, CFD
          </p>
          <p className="text-sm text-gray-600">
            Founder & Chief Mentor, E-Kalavya
          </p>
        </div>

        {/* RIGHT IMAGE */}
        <motion.div
          initial={{ y: 0 }}
          animate={{ y: [-8, 8, -8] }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="flex justify-center"
        >
          <Image
            src="/BP.png"
            alt="Founder of E-Kalavya"
            width={420}
            height={520}
            className="drop-shadow-2xl"
            priority
          />
        </motion.div>
      </div>
    </section>
  );
}
