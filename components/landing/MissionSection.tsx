// src/components/landing/MissionSection.tsx

const missionItems = [
  {
    title: "Predictive Analytics",
    description:
      "Leveraging historical trends to anticipate migrant needs, resource requirements at shelters and labor market fluctuations.",
  },
  {
    title: "Unified Identification",
    description:
      "A single source of truth for migrant identities, ensuring access to vital health services and legal protections across all regions.",
  },
  {
    title: "Inter-Agency Cohesion",
    description:
      "Breaking down silos between Police, Labour and Social Services for a truly holistic response to national migration challenges.",
  },
];

export default function MissionSection() {
  return (
    <section className="bg-white py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.38em] text-[#202124]">
            Our Strategic Mission
          </p>

          <h2 className="mt-6 text-3xl font-bold leading-tight tracking-[-0.04em] text-[#202124] sm:text-4xl lg:text-5xl">
            Facilitating safe migration pathways through integrated
            technological leadership.
          </h2>
        </div>

        <div className="mt-16 grid gap-10 md:grid-cols-3 md:gap-8">
          {missionItems.map((item) => (
            <article
              key={item.title}
            >
              <h3 className="text-xl font-bold tracking-[-0.02em] text-[#202124] border-l-4 border-[#202124] pl-5">
                {item.title}
              </h3>

              <p className="mt-4 text-sm leading-7 text-[#667085]">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}