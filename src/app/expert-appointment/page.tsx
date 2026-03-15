"use client";

import { useState } from "react";
import { bookExpertAppointment } from "@/lib/expertAppointmentClient";
import { CalendarDays, Clock, User, Mail } from "lucide-react";

const TIME_SLOTS = [
  "10:00 AM – 10:30 AM",
  "11:00 AM – 11:30 AM",
  "4:00 PM – 4:30 PM",
  "6:00 PM – 6:30 PM",
];

export default function ExpertAppointmentPage() {
  const [selectedTime, setSelectedTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!selectedTime) {
      setError("Please select a time slot");
      return;
    }

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      setLoading(true);
      await bookExpertAppointment(
        data.get("name") as string,
        data.get("email") as string,
        data.get("date") as string,
        selectedTime
      );

      setSuccess("🎉 Appointment booked successfully!");
      form.reset();
      setSelectedTime("");
    } catch {
      setError("❌ Failed to book appointment. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-700 to-purple-900 flex items-center justify-center px-4 py-16">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl p-10">

        {/* HEADER */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-purple-800 mb-3">
            Speak to an Expert
          </h1>
          <p className="text-gray-600">
            Schedule a personal session with our academic counsellors
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-7">

          {/* NAME */}
          <InputField
            label="Your Name"
            name="name"
            placeholder="Enter your name"
            icon={<User />}
          />

          {/* EMAIL */}
          <InputField
            label="Email Address"
            name="email"
            type="email"
            placeholder="Enter your email"
            icon={<Mail />}
          />

          {/* DATE */}
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-2 block">
              Select Date
            </label>
            <div className="flex items-center border rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-purple-500">
              <CalendarDays className="text-gray-400 mr-3" />
              <input
                name="date"
                type="date"
                min={new Date().toISOString().split("T")[0]}
                required
                className="w-full outline-none"
              />
            </div>
          </div>

          {/* TIME SLOTS */}
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-3 block">
              Select Time Slot
            </label>

            <div className="grid grid-cols-2 gap-4">
              {TIME_SLOTS.map((slot) => (
                <button
                  type="button"
                  key={slot}
                  onClick={() => setSelectedTime(slot)}
                  className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl border font-semibold transition-all
                    ${
                      selectedTime === slot
                        ? "bg-purple-700 text-white border-purple-700 scale-[1.02]"
                        : "bg-gray-50 text-gray-800 hover:bg-purple-50 hover:border-purple-400"
                    }`}
                >
                  <Clock size={16} />
                  {slot}
                </button>
              ))}
            </div>
          </div>

          {/* FEEDBACK */}
          {error && (
            <p className="text-red-600 font-semibold text-sm text-center">
              {error}
            </p>
          )}

          {success && (
            <p className="text-green-600 font-semibold text-sm text-center">
              {success}
            </p>
          )}

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-extrabold py-4 rounded-xl text-lg transition disabled:opacity-60"
          >
            {loading ? "Booking..." : "📅 Book Appointment"}
          </button>
        </form>
      </div>
    </main>
  );
}

/* ---------------- INPUT COMPONENT ---------------- */

function InputField({
  label,
  icon,
  ...props
}: any) {
  return (
    <div>
      <label className="text-sm font-semibold text-gray-700 mb-2 block">
        {label}
      </label>
      <div className="flex items-center border rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-purple-500">
        <span className="text-gray-400 mr-3">{icon}</span>
        <input
          required
          className="w-full outline-none"
          {...props}
        />
      </div>
    </div>
  );
}
