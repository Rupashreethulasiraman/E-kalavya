export default function RefundPolicy() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-16 space-y-6 bg-white">

      <h1 className="text-3xl font-bold text-gray-900">
        Refund & Cancellation Policy
      </h1>

      <p className="text-gray-700 leading-relaxed">
        Refund requests must be made within{" "}
        <span className="font-semibold text-gray-900">7 days</span> of purchase,
        provided the course has not been accessed.
      </p>

      <p className="text-gray-700 leading-relaxed">
        Once course access has been granted,{" "}
        <span className="font-semibold text-gray-900">
          no refunds will be issued
        </span>.
      </p>

      <p className="text-gray-700 leading-relaxed">
        Approved refunds will be processed within{" "}
        <span className="font-semibold text-gray-900">
          7–10 working days
        </span>{" "}
        to the original payment method.
      </p>

    </main>
  );
}
