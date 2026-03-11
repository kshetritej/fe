import CTA from "@/components/cta";
import { siteConfig } from "@/lib/siteConfig";

export default function About() {
  return (
    <main className="min-h-screen bg-white">
      <section className="bg-linear-to-b from-slate-900 to-slate-800 text-white py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-4">About {siteConfig.name}</h1>
          <p className="text-xl text-slate-300">{siteConfig.description}</p>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">
            Our Mission
          </h2>
          <p className="text-lg text-slate-700 leading-relaxed mb-6">
            At {siteConfig.name}, we believe travel is more than just visiting
            places—it&apos;s about connecting with cultures, communities, and
            yourself. Our mission is to create seamless, personalized journeys
            that inspire, challenge, and transform. We handpick every
            destination, every guide, and every experience to ensure your
            adventure is nothing short of extraordinary.
          </p>
        </div>
      </section>

      <section className="bg-slate-50 py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-12">
            Our Values
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Authenticity
              </h3>
              <p className="text-slate-600">
                Real connections with local communities, not tourist traps.
                Every experience is genuine and meaningful.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Sustainability
              </h3>
              <p className="text-slate-600">
                Protecting the destinations we love. We travel responsibly and
                give back to local ecosystems.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Excellence
              </h3>
              <p className="text-slate-600">
                Attention to every detail. From logistics to meals to guides, we
                never compromise on quality.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Who We Are</h2>
          <p className="text-lg text-slate-700 leading-relaxed mb-6">
            {siteConfig.name} was founded by a team of passionate adventurers,
            mountaineers, and travel enthusiasts who wanted to share their love
            for exploration with the world. Our team brings together decades of
            experience in adventure travel, local partnerships across five
            continents, and an unwavering commitment to making travel
            accessible, safe, and transformative for everyone.
          </p>
          <p className="text-lg text-slate-700 leading-relaxed">
            Today, we&apos;ve guided over 5,000 travelers to some of the
            world&apos;s most breathtaking destinations, and we&apos;re just
            getting started. Every trek, every journey, and every memory created
            is a testament to our dedication to excellence.
          </p>
        </div>
      </section>
    </main>
  );
}
