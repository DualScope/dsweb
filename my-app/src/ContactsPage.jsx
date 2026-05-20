import SiteLogo from './SiteLogo';
import { SITE } from './siteConfig';

const ContactsPage = () => (
  <div
    className="antialiased text-gray-50 min-h-screen"
    style={{ backgroundColor: '#181818', fontFamily: "'Goldman', sans-serif" }}
  >
    <SiteLogo />
    <main className="px-4 sm:px-6 lg:px-8 py-32 sm:py-40">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-6xl sm:text-8xl lg:text-9xl font-extrabold tracking-tighter leading-none mb-12">
          LET&apos;S
          <br />
          COLLABORATE
        </h1>
        <p className="text-gray-300 font-light text-lg sm:text-xl mb-10 leading-relaxed">
          Ready to bring your story to life? Reach out and let&apos;s create something meaningful together.
        </p>
        <div className="space-y-4 text-gray-200 mb-12">
          <p>{SITE.location}</p>
          <p>
            <a
              href={`mailto:${SITE.contact.email}`}
              className="hover:underline transition-all duration-300"
            >
              {SITE.contact.email}
            </a>
          </p>
          <p>
            <a
              href={SITE.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline transition-all duration-300 uppercase text-sm tracking-widest"
            >
              Instagram
            </a>
          </p>
        </div>
        <a
          href={`mailto:${SITE.contact.email}`}
          className="inline-block px-10 py-4 border border-gray-50 text-gray-50 uppercase tracking-widest text-sm font-semibold hover:bg-gray-50 hover:text-[#181818] transition-colors duration-300"
        >
          Get in touch
        </a>
      </div>
    </main>
  </div>
);

export default ContactsPage;
