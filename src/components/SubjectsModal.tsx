"use client";

import React from "react";
import { motion } from "framer-motion";

interface SubjectsModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subjects: string[];
  courseSlug: string;
  price?: number;
}

export default function SubjectsModal({
  isOpen,
  onClose,
  title,
  subjects,
  courseSlug,
  price,
}: SubjectsModalProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
        onClick={onClose}
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto border border-gray-100"
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
        >
          {/* Header */}
          <div className="sticky top-0 bg-gradient-to-r from-violet-50 to-purple-50 border-b border-gray-200 p-6 md:p-8 flex justify-between items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{title}</h2>
              {price && (
                <p className="text-violet-600 font-semibold text-lg mt-2">
                  ₹{price.toLocaleString('en-IN')}
                </p>
              )}
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full p-2 transition-all"
              aria-label="Close"
            >
              ✕
            </button>
          </div>

          {/* Content */}
          <div className="p-6 md:p-8 space-y-6">
            
            {/* Syllabus Section */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-2 h-2 bg-violet-600 rounded-full"></span>
                Subjects Included
              </h3>

              {subjects.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {subjects.map((subject) => (
                    <motion.div
                      key={subject}
                      className="flex items-center p-3 bg-gradient-to-r from-violet-50 to-purple-50 rounded-lg border border-violet-200 hover:border-violet-400 transition-all"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    >
                      <span className="text-violet-600 font-bold mr-3">✓</span>
                      <span className="text-gray-700 font-medium">{subject}</span>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-4">
                  Syllabus coming soon
                </p>
              )}
            </motion.div>

            {/* Course Features */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                Course Features
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  "📚 Comprehensive syllabus coverage",
                  "👥 Expert instructor guidance",
                  "🔄 Live interactive sessions",
                  "✏️ Regular assignments & tests",
                  "📊 Performance tracking",
                  "💬 Doubt clearing support",
                ].map((feature) => (
                  <motion.div
                    key={feature}
                    className="flex items-center p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200 hover:border-yellow-400 transition-all"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <span className="text-gray-700">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Price Section */}
            {price && (
              <motion.div
                className="bg-gradient-to-r from-violet-700 to-purple-700 text-white rounded-lg p-6 text-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                <p className="text-sm font-semibold text-violet-100 mb-2">Course Price</p>
                <p className="text-4xl font-bold">₹{price.toLocaleString('en-IN')}</p>
                <p className="text-sm text-violet-100 mt-2">One-time investment for lifetime access</p>
              </motion.div>
            )}

          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 p-6 md:p-8 flex gap-3 bg-gradient-to-r from-gray-50 to-white rounded-b-2xl">
            <motion.button
              onClick={onClose}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-900 px-4 py-3 rounded-lg font-semibold transition-all shadow-sm"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Close
            </motion.button>
            <motion.a
              href={`/courses/${courseSlug}`}
              className="flex-1 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white px-4 py-3 rounded-lg font-semibold transition-all shadow-md text-center"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Learn More →
            </motion.a>
          </div>
        </motion.div>
      </div>
    </>
  );
}
