import SiteLogo from './SiteLogo';

const services = [
  {
    title: 'Documentary Filmmaking',
    description:
      'Authentic visual narratives rooted in precision and Portuguese cinematic language — stories that resonate beyond the screen.',
  },
  {
    title: 'Commercial & Brand Video',
    description:
      'Contemporary rhythms and innovative techniques for brands that need film with soul, clarity, and technical excellence.',
  },
  {
    title: 'Custom Filming Equipment',
    description:
      'Design and fabrication of specialized rigs and tools engineered to capture each production\'s unique artistic intent.',
  },
];

const ServicesPage = () => (
  <div
    className="antialiased text-gray-50 min-h-screen"
    style={{ backgroundColor: '#181818', fontFamily: "'Goldman', sans-serif" }}
  >
    <SiteLogo />
    <main className="px-4 sm:px-6 lg:px-8 py-32 sm:py-40">
      <div className="max-w-5xl mx-auto">
        <p className="text-sm uppercase text-gray-400 tracking-widest mb-6">DSFILMS</p>
        <h1 className="text-6xl sm:text-8xl font-extrabold tracking-tighter leading-none mb-16">
          WHAT WE DO
        </h1>
        <div className="grid gap-10 md:grid-cols-1">
          {services.map((service) => (
            <article
              key={service.title}
              className="border border-gray-700/60 p-8 sm:p-10 bg-[#1f1f1f]"
            >
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">{service.title}</h2>
              <p className="text-gray-300 font-light leading-relaxed text-base sm:text-lg">
                {service.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </main>
  </div>
);

export default ServicesPage;
