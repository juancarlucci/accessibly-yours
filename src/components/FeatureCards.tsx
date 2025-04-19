const features = [
  {
    icon: "🎨",
    title: "Contrast Checker",
    description:
      "Find low contrast text and get WCAG-compliant color suggestions.",
  },
  {
    icon: "⌨️",
    title: "Keyboard Navigation",
    description:
      "Simulate tabbing and identify focus traps or missing skip links.",
  },
  {
    icon: "🗣️",
    title: "Screen Reader Preview",
    description: "Preview how screen readers interpret your UI with clarity.",
  },
];

export default function FeatureCards() {
  return (
    <section className="bg-white text-gray-800 py-16 px-4">
      <div className="max-w-6xl mx-auto grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, i) => (
          <div
            key={i}
            className="bg-gray-100 rounded-xl p-6 shadow hover:shadow-lg transition"
          >
            <div className="text-4xl mb-4">{feature.icon}</div>
            <h3 className="text-xl font-bold mb-2 text-purple-600">
              {feature.title}
            </h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
