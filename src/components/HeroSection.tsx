export default function HeroSection() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center bg-gradient-to-br from-purple-600 to-orange-400 text-white px-4">
      <h1 className="text-5xl font-bold mb-4">Accessibly Yours</h1>
      <p className="text-xl max-w-xl mb-8">
        Make accessibility effortless and empowering. Run an audit, get instant
        insights, and start fixing with joy.
      </p>
      <button className="bg-white text-purple-600 font-semibold text-lg px-8 py-3 rounded-full shadow-md hover:bg-gray-100 transition">
        Audit My Site
      </button>
    </section>
  );
}
