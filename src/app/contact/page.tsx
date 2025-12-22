"use client";

import React from "react";

export default function ContactPage() {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const name = String(formData.get("name") || "");
    const email = String(formData.get("email") || "");
    const phone = String(formData.get("phone") || "");
    const subject = String(formData.get("subject") || "");
    const message = String(formData.get("message") || "");

    // ✅ WhatsApp number (NO +, NO spaces)
    const whatsappNumber = "917550101893";

    const whatsappMessage = `📩 New Contact Message – E-Kalavya

Name: ${name}
Email: ${email}
Phone: ${phone}
Subject: ${subject}

Message:
${message}`;

    const whatsappURL =
      "https://wa.me/" +
      whatsappNumber +
      "?text=" +
      encodeURIComponent(whatsappMessage);

    window.open(whatsappURL, "_blank");
    e.currentTarget.reset();
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-violet-50 to-white py-16">
      <div className="max-w-6xl mx-auto px-6">

        {/* HEADER */}
        <div className="text-center mb-14">
          <h1 className="text-4xl md:text-5xl font-extrabold text-violet-700 mb-4">
            Get in Touch
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Have questions? We’d love to hear from you.
          </p>
        </div>

        {/* CONTACT OPTIONS */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
  <ContactCard
    title="Email"
    value={
      <a
        href="mailto:ekalavyavirtualclasses@gmail.com?subject=Course Enquiry"
        className="text-violet-700 hover:underline font-medium"
      >
        ekalavyavirtualclasses@gmail.com
      </a>
    }
    icon="📧"
  />

  <ContactCard
    title="Phone"
    value={
      <a
        href="tel:+917550101893"
        className="text-violet-700 hover:underline font-medium"
      >
        +91 75501 01893
      </a>
    }
    icon="📞"
  />

  <ContactCard
    title="Social Media"
    value={
      <div className="space-y-1">
        <a
          href="https://www.instagram.com/"
          target="_blank"
          className="block text-violet-700 hover:underline"
        >
          Instagram
        </a>
        <a
          href="https://www.linkedin.com/"
          target="_blank"
          className="block text-violet-700 hover:underline"
        >
          LinkedIn
        </a>
      </div>
    }
    icon="🌐"
  />
</div>


        {/* FORM */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-violet-700 mb-6 text-center">
            Send us a Message
          </h2>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <input name="name" required placeholder="Your name" className={input} />
            <input name="email" type="email" required placeholder="you@email.com" className={input} />
            <input name="phone" type="tel" required placeholder="+91 75501 01893" className={input} />
            <input name="subject" placeholder="How can we help?" className={input} />
            <textarea
              name="message"
              rows={4}
              required
              placeholder="Write your message here..."
              className={input}
            />

            <button
              type="submit"
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-3 rounded-lg shadow-md transition"
            >
              Send via WhatsApp
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}

/* CONTACT CARD */
function ContactCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: React.ReactNode;
  icon: string;
}) {
  return (
    <div className="bg-white rounded-xl shadow p-6 text-center hover:shadow-lg transition">
      <div className="text-3xl mb-3">{icon}</div>
      <h3 className="font-semibold text-lg text-violet-700 mb-1">{title}</h3>
      <p className="text-gray-600 text-sm">{value}</p>
    </div>
  );
}

/* INPUT STYLE */
const input =
  "w-full border rounded-lg px-4 py-3 text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500";
