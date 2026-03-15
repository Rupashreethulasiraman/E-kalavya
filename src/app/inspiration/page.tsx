import Image from "next/image";

export default function InspirationPage() {
  return (
    <section className="bg-white py-20">
      <div className="max-w-6xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-3">
            <span className="text-violet-700">My Inspiration</span>
          </h1>
          <p className="text-gray-600 text-lg">
            About My Inspiration{" "}
            <span className="text-violet-700 font-medium">
              (Founder’s Note)
            </span>
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

          {/* Image Section */}
          <div className="flex justify-center">
            <Image
              src="/grandfather.jpeg"
              alt="My Grandfather – My Inspiration"
              width={380}
              height={480}
              className="rounded-2xl shadow-2xl object-cover"
              priority
            />
          </div>

          {/* Text Section */}
          <div className="flex justify-center">
            <div className="max-w-xl">

              <p className="text-gray-700 text-[17px] leading-8 mb-6">
                My journey as an educator is deeply inspired by my late grandfather, a{" "}
                <span className="font-semibold text-gray-900">
                  Government Teacher and Tamil Pandit
                </span>.
              </p>

              <p className="text-gray-700 text-[17px] leading-8 mb-6">
                He was a man of discipline, humility, and strong values, who believed
                that education builds character and that a teacher must always be a
                role model. Though he is no longer with us, his principles continue
                to guide my approach to teaching.
              </p>

              <p className="text-gray-700 text-[17px] leading-8 mb-8">
                As the founder of{" "}
                <span className="font-semibold text-violet-700">
                  E-Kalavya 
                </span>
                , I strive to carry forward his legacy by nurturing students not only
                academically, but also morally and ethically.
              </p>

              {/* Memorial Note */}
              <div className="border-l-4 border-violet-600 pl-5">
                <p className="font-semibold text-gray-900 mb-1">
                  In loving memory of my grandfather,
                </p>
                <p className="italic text-violet-700">
                  whose values continue to shape my vision as an educator.
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
