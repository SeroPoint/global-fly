import { useState } from "react";
import { MapPin, Clock, Gauge, ChevronDown, Facebook, Instagram, Youtube } from "lucide-react";
import heroData from "@/content/hero.json";
import aboutData from "@/content/about.json";
import routeData from "@/content/route.json";
import sponsorsData from "@/content/sponsors.json";
import socialData from "@/content/social.json";
import storiesData from "@/content/stories.json";
import ctaData from "@/content/cta.json";
import linepayData from "@/content/linepay.json";
import footerData from "@/content/footer.json";
import navData from "@/content/nav.json";

/**
 * Home Page - N688TW Global Aviation Mission
 * Content is driven by JSON files in client/src/content/ (editable via /admin Decap CMS).
 */

export default function Home() {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const imagePath = (path: string) => {
    const clean = path.startsWith("/") ? path.slice(1) : path;
    return `${import.meta.env.BASE_URL}${clean}`;
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-cyan-500/20">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-cyan-400">{navData.brand}</div>
          <div className="flex gap-6 text-sm">
            {navData.links.map((link) => (
              <a key={link.anchor} href={link.anchor} className="hover:text-cyan-400 transition">{link.label}</a>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 text-center relative overflow-hidden min-h-screen flex items-center justify-center" style={{
        backgroundImage: `url(${imagePath(heroData.backgroundImage)})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/60"></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
            {heroData.title}
          </h1>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{heroData.subtitle}</h2>
          <p className="text-xl text-gray-300 mb-8">{heroData.taglineZh}</p>
          <p className="text-lg text-cyan-300 mb-12">{heroData.taglineEn}</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {heroData.stats.map((stat, i) => (
              <div key={i} className="bg-black p-4 rounded-lg border border-cyan-500/30">
                <div className="text-2xl font-bold text-cyan-400">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Roger Lin */}
      <section className="py-20 px-4 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">{aboutData.heading}</h2>

          <div className="grid md:grid-cols-2 gap-12 mb-12">
            <div>
              <h3 className="text-2xl font-bold text-cyan-400 mb-6">{aboutData.identity.title}</h3>
              <ul className="space-y-3 text-gray-300">
                {aboutData.identity.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-cyan-400 mt-1">▸</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-cyan-400 mb-6">{aboutData.education.title}</h3>
              <ul className="space-y-3 text-gray-300 mb-8">
                {aboutData.education.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-cyan-400 mt-1">▸</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <h3 className="text-2xl font-bold text-cyan-400 mb-6">{aboutData.qualification.title}</h3>
              <p className="text-gray-300 text-sm">{aboutData.qualification.text}</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 p-8 rounded-lg border border-cyan-500/30">
            <p className="text-lg text-gray-200 leading-relaxed">"{aboutData.quote}"</p>
          </div>
        </div>
      </section>

      {/* Flight Route Map Section */}
      <section id="route" className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">{routeData.heading}</h2>

          <div className="bg-gradient-to-br from-gray-900 to-black rounded-lg border border-cyan-500/30 overflow-hidden mb-12">
            <img src={imagePath(routeData.mapImage)} alt="Flight Route Map" className="w-full h-auto" />
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 p-6 rounded-lg border border-cyan-500/30">
              <div className="flex items-center gap-3 mb-4">
                <Gauge className="w-6 h-6 text-cyan-400" />
                <h3 className="font-bold">{routeData.aircraft.title}</h3>
              </div>
              <ul className="space-y-2 text-sm text-gray-300">
                {routeData.aircraft.items.map((item, i) => (
                  <li key={i}><span className="text-cyan-400">{item.label}:</span> {item.value}</li>
                ))}
              </ul>
            </div>

            <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 p-6 rounded-lg border border-cyan-500/30">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="w-6 h-6 text-cyan-400" />
                <h3 className="font-bold">{routeData.stats.title}</h3>
              </div>
              <ul className="space-y-2 text-sm text-gray-300">
                {routeData.stats.items.map((item, i) => (
                  <li key={i}><span className="text-cyan-400">{item.label}:</span> {item.value}</li>
                ))}
              </ul>
            </div>

            <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 p-6 rounded-lg border border-cyan-500/30">
              <div className="flex items-center gap-3 mb-4">
                <MapPin className="w-6 h-6 text-cyan-400" />
                <h3 className="font-bold">{routeData.waypoints.title}</h3>
              </div>
              <ul className="space-y-1 text-xs text-gray-300">
                {routeData.waypoints.lines.map((line, i) => (
                  <li key={i}>{line}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-6 text-center">{routeData.liveTracking.title}</h3>
            <div dangerouslySetInnerHTML={{
              __html: `<iframe frameborder="0" scrolling="no" marginheight="0" marginwidth="0" width="100%" height="600" src="${routeData.liveTracking.iframeSrc}"></iframe>`
            }} />
          </div>
        </div>
      </section>

      {/* Sponsors & Contributors Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">{sponsorsData.heading}</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {sponsorsData.items.map((sponsor, i) => (
              <div key={i} className={`${sponsor.whiteBg ? "bg-white" : "bg-black"} p-6 rounded-lg border border-cyan-500/30 flex items-center justify-center min-h-32`}>
                <img src={imagePath(sponsor.image)} alt={sponsor.alt} className="max-w-full max-h-24 object-contain" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Facebook Live Feed */}
      <section className="py-20 px-4 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">{socialData.heading}</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Facebook Card */}
            <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-lg border border-cyan-500/30 p-8 hover:border-cyan-500/50 transition">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center">
                  <Facebook className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="font-bold text-lg">{socialData.facebook.title}</div>
                  <div className="text-xs text-cyan-400">{socialData.facebook.subtitle}</div>
                </div>
              </div>

              <p className="text-sm leading-relaxed mb-6 text-gray-300">{socialData.facebook.description}</p>

              <div className="space-y-3 mb-6">
                {socialData.facebook.bullets.map((b, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="text-cyan-400 text-lg flex-shrink-0">{b.icon}</span>
                    <div>
                      <div className="font-semibold text-sm">{b.title}</div>
                      <div className="text-xs text-gray-400">{b.text}</div>
                    </div>
                  </div>
                ))}
              </div>

              <a
                href={socialData.facebook.buttonUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block w-full text-center px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/50"
              >
                {socialData.facebook.buttonText}
              </a>
            </div>

            {/* Threads/Instagram Card */}
            <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-lg border border-cyan-500/30 p-8 hover:border-cyan-500/50 transition">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">@</span>
                </div>
                <div>
                  <div className="font-bold text-lg">{socialData.threads.title}</div>
                  <div className="text-xs text-cyan-400">{socialData.threads.subtitle}</div>
                </div>
              </div>

              <p className="text-sm leading-relaxed mb-6 text-gray-300">{socialData.threads.description}</p>

              <div className="space-y-3 mb-6">
                {socialData.threads.bullets.map((b, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="text-pink-400 text-lg flex-shrink-0">{b.icon}</span>
                    <div>
                      <div className="font-semibold text-sm">{b.title}</div>
                      <div className="text-xs text-gray-400">{b.text}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-3">
                <a
                  href={socialData.threads.threadsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-500 hover:to-pink-400 text-white font-bold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/50"
                >
                  Threads →
                </a>
                <a
                  href={socialData.threads.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center px-4 py-3 bg-gradient-to-r from-pink-600 to-orange-500 hover:from-pink-500 hover:to-orange-400 text-white font-bold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/50"
                >
                  Instagram →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section id="story" className="py-20 px-4 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">{storiesData.heading}</h2>

          <div className="space-y-4">
            {storiesData.items.map((story) => {
              const isExpanded = expandedSection === story.id;
              return (
                <div key={story.id} className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-lg border border-cyan-500/30 overflow-hidden">
                  <button
                    onClick={() => setExpandedSection(isExpanded ? null : story.id)}
                    className="w-full p-6 flex items-center justify-between hover:bg-cyan-500/5 transition"
                  >
                    <div className="text-left">
                      <h3 className="text-2xl font-bold text-cyan-400">{story.title}</h3>
                      <p className="text-gray-400 mt-2">{story.subtitle}</p>
                    </div>
                    <ChevronDown className={`w-6 h-6 text-cyan-400 transition ${isExpanded ? "rotate-180" : ""}`} />
                  </button>

                  {isExpanded && (
                    <div className="px-6 pb-6 border-t border-cyan-500/20 text-gray-300 space-y-4">
                      {story.intro && (
                        <div>
                          <h4 className="text-lg font-bold text-cyan-400 mb-3">{story.intro.heading}</h4>
                          <p>{story.intro.text}</p>
                        </div>
                      )}
                      {story.requirements && (
                        <div>
                          <h4 className="text-lg font-bold text-cyan-400 mb-3">{story.requirementsHeading}</h4>
                          <div className="space-y-4">
                            {story.requirements.map((r, i) => (
                              <div key={i} className="bg-black/30 p-4 rounded-lg">
                                <h5 className="font-bold text-cyan-300 mb-2">{r.number} {r.title}</h5>
                                <p className="text-sm">{r.text}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      {story.paragraphs && story.paragraphs.map((p, i) => (
                        <p key={i}>{p}</p>
                      ))}
                      {story.highlight && (
                        <p className="text-lg font-bold text-cyan-300 mt-6">{story.highlight}</p>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section id="support" className="py-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">{ctaData.heading}</h2>
          <p className="text-xl text-gray-300 mb-12">{ctaData.subheading}</p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-black font-bold rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition">
              {ctaData.primaryButton}
            </button>
            <button className="px-8 py-3 border border-cyan-500 text-cyan-400 font-bold rounded-lg hover:bg-cyan-500/10 transition">
              {ctaData.secondaryButton}
            </button>
          </div>

          <div className="flex justify-center gap-6">
            {ctaData.social.facebook && (
              <a href={ctaData.social.facebook} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyan-400 transition">
                <Facebook className="w-8 h-8" />
              </a>
            )}
            {ctaData.social.instagram && (
              <a href={ctaData.social.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyan-400 transition">
                <Instagram className="w-8 h-8" />
              </a>
            )}
            {ctaData.social.youtube && (
              <a href={ctaData.social.youtube} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyan-400 transition">
                <Youtube className="w-8 h-8" />
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Sponsorship Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">{linepayData.heading}</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col items-center">
              <div className="bg-white p-6 rounded-lg mb-6 shadow-lg">
                <img
                  src={imagePath(linepayData.qrImage)}
                  alt="Line Pay QR Code"
                  className="w-64 h-64 object-contain"
                />
              </div>
              <p className="text-center text-sm text-gray-300 mb-4">{linepayData.qrCaption}</p>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-cyan-400 mb-4">{linepayData.title}</h3>
                <p className="text-lg font-semibold mb-2">{linepayData.subtitle}</p>
                <p className="text-sm text-gray-400 mb-4">{linepayData.note}</p>
              </div>

              <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-lg border border-cyan-500/30 p-6">
                <h4 className="font-bold text-cyan-400 mb-4">{linepayData.stepsHeading}</h4>
                <div className="space-y-3">
                  {linepayData.steps.map((step, i) => (
                    <div key={i} className="flex gap-3">
                      <span className="text-cyan-400 font-bold flex-shrink-0">{step.icon}</span>
                      <span className="text-sm text-gray-300">{step.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <a
                  href={linepayData.formButton.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block w-full text-center px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-black font-bold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/50"
                >
                  {linepayData.formButton.text}
                </a>
                <a
                  href={linepayData.emailButton.url}
                  className="inline-block w-full text-center px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/50"
                >
                  {linepayData.emailButton.text}
                </a>
              </div>

              <p className="text-xs text-gray-400 border-t border-cyan-500/20 pt-4">
                {linepayData.disclaimer}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-cyan-500/20 bg-gradient-to-b from-transparent to-blue-500/5">
        <div className="max-w-4xl mx-auto text-center text-gray-400">
          <p className="mb-4">{footerData.copyright}</p>
          <p className="text-sm">
            {footerData.prefix}
            {footerData.links.map((link, i) => (
              <span key={i}>
                {" | "}
                <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 mx-2">{link.label}</a>
              </span>
            ))}
          </p>
        </div>
      </footer>
    </div>
  );
}
