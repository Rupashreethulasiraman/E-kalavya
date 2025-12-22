// FILE: scripts/seed/seedCourse.js
import admin from "firebase-admin";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


/* ===============================
   LOAD SERVICE ACCOUNT KEY
   =============================== */
const serviceAccountPath = path.join(__dirname, "serviceAccountKey.json");

if (!fs.existsSync(serviceAccountPath)) {
  console.error("❌ serviceAccountKey.json not found at:", serviceAccountPath);
  console.error(
    "➡️ Place your Firebase service account key at scripts/seed/serviceAccountKey.json"
  );
  process.exit(1);
}

let serviceAccount;
try {
  const raw = fs.readFileSync(serviceAccountPath, "utf8");
  serviceAccount = JSON.parse(raw);
} catch (err) {
  console.error("❌ serviceAccountKey.json is invalid JSON");
  console.error(err.message);
  process.exit(1);
}

/* ===============================
   INITIALIZE FIREBASE ADMIN
   =============================== */
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const db = admin.firestore();

/* ===============================
   COURSE DATA
   =============================== */
const courses = [
  {
    slug: "9th-12th",
    title: "9th–12th Standard",
    short: "Complete curriculum for grades 9-12",
    long:
      "Comprehensive course covering all subjects for 9th to 12th standard students with expert instructors.",
    price: 4999,
    duration: "12 months",
    syllabus: [
      "Mathematics",
      "Physics",
      "Chemistry",
      "Biology",
      "English",
      "History",
      "Geography",
    ],
    instructor: "Expert Faculty",
    difficulty: "Intermediate",
    category: "School",
    thumbnail: "https://via.placeholder.com/400x300?text=9th-12th",
    tags: ["school", "comprehensive", "full-curriculum"],
  },
  {
    slug: "jee",
    title: "JEE Preparation",
    short: "Complete JEE Main & Advanced preparation",
    long:
      "Intensive course designed to prepare students for JEE Main and Advanced examinations.",
    price: 7999,
    duration: "18 months",
    syllabus: ["Physics", "Chemistry", "Mathematics"],
    instructor: "IIT Alumni",
    difficulty: "Advanced",
    category: "Competitive",
    thumbnail: "https://via.placeholder.com/400x300?text=JEE",
    tags: ["jee", "competitive", "engineering"],
  },
  {
    slug: "neet",
    title: "NEET Preparation",
    short: "Complete NEET exam preparation course",
    long:
      "Comprehensive NEET preparation with detailed coverage of Biology, Chemistry, and Physics.",
    price: 6999,
    duration: "18 months",
    syllabus: ["Biology", "Chemistry", "Physics"],
    instructor: "Medical Experts",
    difficulty: "Advanced",
    category: "Competitive",
    thumbnail: "https://via.placeholder.com/400x300?text=NEET",
    tags: ["neet", "medical", "competitive"],
  },
  {
    slug: "foundation",
    title: "Foundation Course",
    short: "Build strong fundamentals for competitive exams",
    long:
      "Foundation course designed for students preparing for future competitive exams with a strong conceptual base.",
    price: 3999,
    duration: "12 months",
    syllabus: [
      "Mathematics",
      "Physics",
      "Chemistry",
      "Biology Fundamentals",
    ],
    instructor: "Foundation Experts",
    difficulty: "Beginner",
    category: "Foundation",
    thumbnail: "https://via.placeholder.com/400x300?text=Foundation",
    tags: ["foundation", "basics", "fundamentals"],
  },
  {
    slug: "matric",
    title: "Matric Board Preparation",
    short: "Complete Matric board exam preparation",
    long:
      "Comprehensive course covering all subjects for Matric board examinations with board-level questions.",
    price: 3499,
    duration: "10 months",
    syllabus: [
      "Mathematics",
      "Science",
      "English",
      "Urdu",
      "Social Studies",
    ],
    instructor: "Board Expert Faculty",
    difficulty: "Intermediate",
    category: "Board",
    thumbnail: "https://via.placeholder.com/400x300?text=Matric",
    tags: ["matric", "board", "exam"],
  },
  {
    slug: "cbse",
    title: "CBSE Curriculum",
    short: "Complete CBSE board curriculum coverage",
    long:
      "Detailed CBSE curriculum course covering all subjects and chapters with NCERT alignment.",
    price: 4499,
    duration: "12 months",
    syllabus: [
      "Mathematics",
      "Science",
      "English",
      "Social Science",
      "Languages",
    ],
    instructor: "CBSE Expert Teachers",
    difficulty: "Intermediate",
    category: "Board",
    thumbnail: "https://via.placeholder.com/400x300?text=CBSE",
    tags: ["cbse", "board", "ncert"],
  },
  {
    slug: "icse",
    title: "ICSE Curriculum",
    short: "Complete ICSE board curriculum",
    long:
      "Comprehensive ICSE board course with detailed explanations and practice questions for all subjects.",
    price: 4799,
    duration: "12 months",
    syllabus: [
      "Mathematics",
      "Physics",
      "Chemistry",
      "Biology",
      "English",
      "History",
      "Geography",
      "Civics",
    ],
    instructor: "ICSE Board Experts",
    difficulty: "Intermediate",
    category: "Board",
    thumbnail: "https://via.placeholder.com/400x300?text=ICSE",
    tags: ["icse", "board", "comprehensive"],
  },
];

/* ===============================
   SEED FUNCTION
   =============================== */
async function seedCourses() {
  try {
    console.log("📚 Starting course seed...");

    const batch = db.batch();
    const coursesRef = db.collection("courses");

    courses.forEach((course) => {
      const docRef = coursesRef.doc(course.slug);
      batch.set(docRef, {
        ...course,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });
    });

    await batch.commit();
    console.log(`✅ Successfully seeded ${courses.length} courses!`);
  } catch (err) {
    console.error("❌ Error seeding courses:", err);
  } finally {
    await admin.app().delete();
    process.exit(0);
  }
}

seedCourses();
