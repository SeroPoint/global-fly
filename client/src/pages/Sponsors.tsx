import { Heart } from "lucide-react";

/**
 * Sponsors Page - N688TW Mission Partners
 * 
 * Design Philosophy: Minimalist Aerospace Futurism
 * - Showcase sponsor logos in a modern grid layout
 * - Emphasize partnership and support
 * - Professional and elegant presentation
 */

interface Sponsor {
  name: string;
  logo?: string;
  tier: "platinum" | "gold" | "silver";
  description?: string;
}

const SPONSORS: Sponsor[] = [
  {
    name: "JC Wings",
    tier: "platinum",
    description: "主要贊助商",
  },
  // 更多贊助商將在用戶上傳後添加
];

export default function Sponsors() {
  return (
    <div className="min-h-screen bg-background pt-16">
      {/* Header */}
      <section className="py-16 sm:py-24 border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <h1 className="text-4xl sm:text-5xl font-tech text-accent">
            我們的贊助商
          </h1>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
            感謝所有支持 N688TW 環球飛行任務的合作夥伴。您們的支持讓我們的夢想得以實現。
          </p>
        </div>
      </section>

      {/* Sponsors Grid */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Platinum Tier */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-1 h-8 bg-secondary rounded-full" />
              <h2 className="text-2xl font-tech text-secondary">白金級贊助商</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {SPONSORS.filter((s) => s.tier === "platinum").map((sponsor) => (
                <div
                  key={sponsor.name}
                  className="p-8 rounded-lg bg-card border border-border/50 hover:border-secondary/50 transition-all group"
                >
                  <div className="aspect-video bg-muted/20 rounded-lg mb-4 flex items-center justify-center border border-border/30">
                    {sponsor.logo ? (
                      <img
                        src={sponsor.logo}
                        alt={sponsor.name}
                        className="max-w-full max-h-full object-contain"
                      />
                    ) : (
                      <div className="text-center">
                        <Heart className="w-8 h-8 text-secondary mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground">Logo 待上傳</p>
                      </div>
                    )}
                  </div>
                  <h3 className="text-xl font-tech text-foreground mb-2">{sponsor.name}</h3>
                  {sponsor.description && (
                    <p className="text-sm text-foreground/60">{sponsor.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Placeholder for other tiers */}
          <div className="p-12 rounded-lg bg-card/50 border border-border/30 text-center">
            <p className="text-muted-foreground">
              更多贊助商信息即將推出。如果您有興趣成為 N688TW 任務的贊助商，
              <br />
              請聯繫我們了解合作機會。
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 sm:py-24 border-t border-border/50 bg-card/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl font-tech text-accent">成為我們的贊助商</h2>
          <p className="text-lg text-foreground/80">
            加入 N688TW 環球飛行任務，成為這個歷史性冒險的一部分。
          </p>
          <button className="px-8 py-3 rounded-lg bg-accent text-accent-foreground font-tech hover:shadow-lg hover:shadow-accent/30 transition-all">
            聯繫我們
          </button>
        </div>
      </section>
    </div>
  );
}
