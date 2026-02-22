"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { COURSE_BOARDS } from "@/lib/courses";
import BoardCourseCard from "@/components/BoardCourseCard";

export default function CoursesPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-6">

        {/* PAGE HEADER */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold text-violet-800 mb-4">
            Our Courses
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Choose your board and start your learning journey with expert-led instruction
          </p>
        </motion.div>

        {/* ===== POPULAR COURSES ===== */}
        <motion.section 
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 flex items-center gap-2">
            <span className="text-3xl"></span> Top Enrolled Courses
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {[
              "NEET",
              "NEET FOUNDATION",
              "CBSE",
              "1-1 SESSION",
            ].map((course, idx) => (
              <motion.div
                key={course}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="bg-gradient-to-br from-purple-600 to-purple-800 text-white
                           text-center font-bold py-4 px-4 rounded-xl
                           hover:shadow-lg shadow-md transition-all duration-300 
                           hover:scale-105 cursor-pointer"
                whileHover={{ scale: 1.05 }}
              >
                {course}
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ===== BOARD SECTIONS ===== */}
        <div className="space-y-24">
          {COURSE_BOARDS.map((board, boardIdx) => (
            <motion.section 
              key={board.board}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >

              {/* BOARD HEADER */}
              <motion.div 
                className="flex justify-center mb-12"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 px-10 py-5 rounded-full text-center shadow-lg hover:shadow-xl transition-all">
                  <h2 className="text-2xl md:text-3xl font-bold text-black">
                    {board.board}
                  </h2>
                  <p className="text-sm md:text-base text-black/75 mt-2 font-medium">
                    {board.description}
                  </p>
                </div>
              </motion.div>

              {/* COURSES GRID */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {board.courses.map((course, idx) => (
                  <motion.div
                    key={course.slug}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: idx * 0.08 }}
                  >
                    <BoardCourseCard
                      title={course.title}
                      slug={course.slug}
                      subjects={course.subjects}
                      price={course.price}
                    />
                  </motion.div>
                ))}
              </div>

            </motion.section>
          ))}
        </div>

      </div>
    </main>
  );
}
