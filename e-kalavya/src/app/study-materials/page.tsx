"use client";

const STUDY_MATERIALS = [
  {
    class: "Class 9",
    subjects: [
      {
        name: "Mathematics",
        materials: [
          "Algebra – Practice Problems",
          "Linear Equations – Notes",
          "Polynomials – Worksheet",
        ],
      },
      {
        name: "Physics",
        materials: [
          "Motion – Key Concepts",
          "Force & Laws – Question Bank",
        ],
      },
    ],
  },
  {
    class: "Class 10",
    subjects: [
      {
        name: "Chemistry",
        materials: [
          "Chemical Reactions – Notes",
          "Acids & Bases – Practice Set",
        ],
      },
    ],
  },
];

export default function StudyMaterialsPage() {
  return (
    <main className="min-h-screen bg-[#F7F5FF] py-16">
      <div className="max-w-7xl mx-auto px-6">

        {/* HEADER */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-violet-800 mb-4">
            Study Materials
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Curated study materials prepared by our expert teachers.
          </p>
        </div>

        {/* MATERIALS */}
        <div className="space-y-14">
          {STUDY_MATERIALS.map((group) => (
            <div
              key={group.class}
              className="bg-white rounded-2xl shadow-md p-8"
            >
              {/* CLASS TITLE */}
              <h2 className="text-2xl font-bold text-violet-700 mb-8">
                {group.class}
              </h2>

              {/* SUBJECTS */}
              <div className="space-y-10">
                {group.subjects.map((subject) => (
                  <div key={subject.name}>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      {subject.name}
                    </h3>

                    <ul className="grid md:grid-cols-2 gap-4">
                      {subject.materials.map((material) => (
                        <li
                          key={material}
                          className="bg-gray-50 rounded-lg px-4 py-3 text-gray-800"
                        >
                          📘 {material}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* INFO NOTE */}
              <div className="mt-10 bg-yellow-50 border border-yellow-200 rounded-xl p-5 text-center">
                <p className="font-medium text-gray-800">
                  📌 Study materials are not downloadable.
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  Please contact us to receive these materials directly from our team.
                </p>
              </div>

              {/* CONTACT CTA */}
              <div className="mt-6 flex flex-wrap justify-center gap-4">
                <a
                  href="tel:+917550101893"
                  className="bg-violet-700 hover:bg-violet-800
                             text-white px-6 py-3 rounded-lg font-semibold"
                >
                  📞 Call Us
                </a>

                <a
                  href="https://wa.me/917550101893?text=Hello%20I%20am%20interested%20in%20study%20materials"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-yellow-400 hover:bg-yellow-500
                             text-black px-6 py-3 rounded-lg font-semibold"
                >
                  💬 WhatsApp Us
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </main>
  );
}
