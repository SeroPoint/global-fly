import { ChevronDown } from "lucide-react";
import { useState } from "react";

/**
 * Story Page - N688TW Mission Pilot's Journey
 * 
 * Design Philosophy: Minimalist Aerospace Futurism
 * - Narrative-driven design with smooth scrolling
 * - Visual storytelling with typography and spacing
 * - Emotional connection to the mission
 */

interface StoryChapter {
  id: string;
  title: string;
  subtitle: string;
  content: string[];
  icon?: string;
}

const STORY_CHAPTERS: StoryChapter[] = [
  {
    id: "dream-beginning",
    title: "夢想啟點：1990年代的種子",
    subtitle: "五歲的悸動",
    content: [
      "童年的悸動：五歲那年，睿哲第一次對飛行產生興趣——不是在機場，而是在遊樂場的搖搖飛機上。坐上去的那一刻，感覺自己彷彿真的飛了起來，心中的悸動從此種下。",
      "熱情的探索者：國小時，林睿哲不只是喜歡看飛機，還想要深入了解它們。每當發現報章雜誌中的航空新聞，他總會迫不及待地向家人、老師與同學介紹飛機型號與巡航速度。當其他孩子沉迷於卡通或電動時，他則專注地閱讀飛行相關書籍。",
      "駕駛艙的啟發：國小起，睿哲常獨自搭機，他總選擇靠窗座位觀察機翼運作。某次落地後，他在機長的邀請下參觀了駕駛艙，那一刻他閃過一個念頭：「原來飛行員也是普通人，那麼，也許有一天，我也能成為他們的一員。」",
    ],
  },
  {
    id: "setback-resilience",
    title: "挫折與轉身：夢想的另一種守護",
    subtitle: "從文字到天空",
    content: [
      "現實的碰撞：國中畢業後，睿哲懷著滿腔熱血想報名空軍官校，然而現實卻澆熄了希望——視力未達裸視 1.0 的標準，且不接受雷射手術，讓他無法成為軍機飛行員。",
      "從文字到天空：大學畢業後，他創辦了《Wingtips 飛行夢想誌》，透過文字記錄航空故事。但命運不願讓他只停留在此，一次偶然的體驗飛行再次點燃心中的悸動。他鼓起勇氣隻身飛往美國，在語言與環境陌生的挑戰下，考取了人生第一張飛行執照。",
      "這一刻，他明白了——夢想沒有只有一條路。當一扇門關閉時，另一扇門會為你打開。",
    ],
  },
  {
    id: "preparation",
    title: "萬事俱備：專業與破釜沉舟",
    subtitle: "行動的必要條件",
    content: [
      "經過多年努力，睿哲逐一克服了自駕飛機環球的必要條件：",
      "自有飛機：在貴人相助下，購買了一架 Sling 4 TSi (N688TW)。",
      "專業資格：取得 FAA 飛行證照 (PPL) 與相關檢定 (IR)。",
      "生理與技能：通過飛行員體檢，具備航空無線電通訊技能與流利外語能力。",
      "實踐規劃：累積了充足的環球飛行預備時間與財務規劃。",
      "每一個條件都是一個里程碑，每一個里程碑都是對夢想的承諾。",
    ],
  },
  {
    id: "ultimate-mission",
    title: "終極使命：2026 挑戰環球",
    subtitle: "讓世界看見台灣",
    content: [
      "這不只是林睿哲的個人夢想，更是一次讓世界看見台灣的機會。",
      "駕駛單引擎飛機挑戰環球飛行，成就屬於台灣的自駕傳奇。",
      "從美國出發，經過阿拉斯加、日本、台灣、東南亞、中東、歐洲，最後返回美國。",
      "這不僅是一場飛行冒險，更是一個關於堅持、勇氣和夢想的故事。",
      "N688TW，準備好了嗎？世界，看好了嗎？",
    ],
  },
];

export default function Story() {
  const [expandedChapter, setExpandedChapter] = useState<string | null>(
    STORY_CHAPTERS[0].id
  );

  return (
    <div className="min-h-screen bg-background pt-16">
      {/* Header */}
      <section className="py-16 sm:py-24 border-b border-border/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <h1 className="text-4xl sm:text-5xl font-tech text-accent">
            林睿哲的故事
          </h1>
          <p className="text-lg text-foreground/80">
            一個關於夢想、堅持與勇氣的真實故事
          </p>
        </div>
      </section>

      {/* Story Timeline */}
      <section className="py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {STORY_CHAPTERS.map((chapter, idx) => (
              <div
                key={chapter.id}
                className="relative"
              >
                {/* Timeline Connector */}
                {idx < STORY_CHAPTERS.length - 1 && (
                  <div className="absolute left-6 top-20 w-0.5 h-24 bg-gradient-to-b from-accent to-transparent" />
                )}

                {/* Chapter Card */}
                <div
                  className="p-6 sm:p-8 rounded-lg bg-card border border-border/50 hover:border-accent/50 transition-all cursor-pointer group"
                  onClick={() =>
                    setExpandedChapter(
                      expandedChapter === chapter.id ? null : chapter.id
                    )
                  }
                >
                  <div className="flex items-start gap-4">
                    {/* Timeline Dot */}
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-12 h-12 rounded-full bg-accent/20 border-2 border-accent flex items-center justify-center group-hover:bg-accent/30 transition-colors">
                        <span className="text-sm font-tech text-accent">
                          {(idx + 1).toString().padStart(2, "0")}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h2 className="text-2xl font-tech text-accent mb-2">
                        {chapter.title}
                      </h2>
                      <p className="text-sm text-muted-foreground font-display mb-4">
                        {chapter.subtitle}
                      </p>

                      {/* Expanded Content */}
                      {expandedChapter === chapter.id && (
                        <div className="mt-6 space-y-4 pt-6 border-t border-border/50">
                          {chapter.content.map((paragraph, pidx) => (
                            <p
                              key={pidx}
                              className="text-foreground/80 leading-relaxed"
                            >
                              {paragraph}
                            </p>
                          ))}
                        </div>
                      )}

                      {/* Expand Indicator */}
                      <div className="mt-4 flex items-center gap-2 text-accent">
                        <span className="text-xs font-display">
                          {expandedChapter === chapter.id ? "收起" : "展開"}
                        </span>
                        <ChevronDown
                          className={`w-4 h-4 transition-transform ${
                            expandedChapter === chapter.id ? "rotate-180" : ""
                          }`}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pilot Profile */}
      <section className="py-16 sm:py-24 border-t border-border/50 bg-card/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-tech text-accent mb-12 text-center">
            核心團隊
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {/* Pilot */}
            <div className="p-8 rounded-lg bg-card border border-border/50 space-y-4">
              <div className="w-16 h-16 rounded-full bg-accent/20 border-2 border-accent flex items-center justify-center">
                <span className="text-2xl font-tech text-accent">✈</span>
              </div>
              <div>
                <h3 className="text-xl font-tech text-foreground mb-2">
                  機長 (Pilot)
                </h3>
                <p className="text-2xl font-tech text-accent mb-4">Roger Lin</p>
                <p className="text-sm text-foreground/70">
                  FAA 認證飛行員，擁有豐富的國際飛行經驗。夢想家、探險家、台灣航空的推廣者。
                </p>
              </div>
            </div>

            {/* Flight Engineer */}
            <div className="p-8 rounded-lg bg-card border border-border/50 space-y-4">
              <div className="w-16 h-16 rounded-full bg-accent/20 border-2 border-accent flex items-center justify-center">
                <span className="text-2xl font-tech text-accent">⚙</span>
              </div>
              <div>
                <h3 className="text-xl font-tech text-foreground mb-2">
                  飛行工程師 (Flight Engineer)
                </h3>
                <p className="text-2xl font-tech text-accent mb-4">Filipe Rosa</p>
                <p className="text-sm text-foreground/70">
                  專業飛行工程師，負責飛行器的技術維護與系統管理。確保每一次飛行的安全與可靠。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 sm:py-24 border-t border-border/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl font-tech text-accent">加入我們的旅程</h2>
          <p className="text-lg text-foreground/80">
            見證一個關於夢想、堅持與勇氣的真實故事。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <a
              href="/livestream"
              className="px-8 py-3 rounded-lg bg-accent text-accent-foreground font-tech hover:shadow-lg hover:shadow-accent/30 transition-all"
            >
              觀看直播
            </a>
            <a
              href="/sponsors"
              className="px-8 py-3 rounded-lg border border-accent text-accent font-tech hover:bg-accent/10 transition-colors"
            >
              成為贊助商
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
