import { Play, Radio } from "lucide-react";

/**
 * Livestream Page - N688TW Real-time Mission Updates
 * 
 * Design Philosophy: Minimalist Aerospace Futurism
 * - YouTube livestream integration
 * - Real-time mission status
 * - Interactive engagement
 */

export default function Livestream() {
  const youtubeChannelUrl = "https://www.youtube.com/@N688TW"; // 等待用戶提供實際 URL

  return (
    <div className="min-h-screen bg-background pt-16">
      {/* Header */}
      <section className="py-12 sm:py-16 border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
            <span className="text-sm font-tech text-red-500">LIVE</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-tech text-accent mb-4">
            直播追蹤
          </h1>
          <p className="text-lg text-foreground/80 max-w-2xl">
            實時觀看 N688TW 環球飛行任務的最新進展。
          </p>
        </div>
      </section>

      {/* Livestream Container */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Livestream */}
            <div className="lg:col-span-2 space-y-6">
              <div className="relative rounded-lg overflow-hidden bg-card border border-border/50">
                <div className="aspect-video bg-muted/20 flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <Play className="w-16 h-16 text-accent/50 mx-auto" />
                    <div>
                      <p className="text-foreground mb-2">YouTube 直播嵌入</p>
                      <p className="text-sm text-muted-foreground">
                        等待 YouTube 直播 URL...
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Livestream Info */}
              <div className="space-y-4">
                <h2 className="text-2xl font-tech text-foreground">實時任務狀態</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-card border border-border/50">
                    <p className="text-xs text-muted-foreground font-display mb-2">當前位置</p>
                    <p className="text-lg font-tech text-accent">待更新</p>
                  </div>
                  <div className="p-4 rounded-lg bg-card border border-border/50">
                    <p className="text-xs text-muted-foreground font-display mb-2">飛行高度</p>
                    <p className="text-lg font-tech text-accent">-</p>
                  </div>
                  <div className="p-4 rounded-lg bg-card border border-border/50">
                    <p className="text-xs text-muted-foreground font-display mb-2">飛行速度</p>
                    <p className="text-lg font-tech text-accent">-</p>
                  </div>
                  <div className="p-4 rounded-lg bg-card border border-border/50">
                    <p className="text-xs text-muted-foreground font-display mb-2">已飛行距離</p>
                    <p className="text-lg font-tech text-accent">-</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Channel Info */}
              <div className="p-6 rounded-lg bg-card border border-border/50 space-y-4">
                <div className="flex items-center gap-2">
                  <Radio className="w-5 h-5 text-accent animate-pulse" />
                  <h3 className="font-tech text-accent">頻道信息</h3>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-muted-foreground font-display mb-1">頻道名稱</p>
                    <p className="text-sm text-foreground">N688TW Global Mission</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-display mb-1">直播狀態</p>
                    <p className="text-sm text-foreground">
                      <span className="inline-block w-2 h-2 rounded-full bg-red-500 mr-2" />
                      即將開始
                    </p>
                  </div>
                </div>
                <a
                  href={youtubeChannelUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full px-4 py-2 rounded-lg bg-accent text-accent-foreground font-tech text-sm hover:shadow-lg hover:shadow-accent/30 transition-all text-center"
                >
                  訂閱頻道
                </a>
              </div>

              {/* Chat / Comments */}
              <div className="p-6 rounded-lg bg-card border border-border/50 space-y-4">
                <h3 className="font-tech text-accent">實時評論</h3>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  <div className="p-3 rounded bg-muted/20 border border-border/30">
                    <p className="text-xs text-muted-foreground mb-1">等待評論...</p>
                  </div>
                </div>
              </div>

              {/* Upcoming Events */}
              <div className="p-6 rounded-lg bg-card border border-border/50 space-y-4">
                <h3 className="font-tech text-accent">即將進行</h3>
                <div className="space-y-3">
                  <div className="p-3 rounded bg-accent/10 border border-accent/30">
                    <p className="text-sm font-tech text-accent mb-1">飛行出發</p>
                    <p className="text-xs text-foreground/60">2026 年 5 月</p>
                  </div>
                  <div className="p-3 rounded bg-muted/20 border border-border/30">
                    <p className="text-sm font-tech text-foreground mb-1">第一航點</p>
                    <p className="text-xs text-foreground/60">PADK - 阿拉斯加</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-16 sm:py-24 border-t border-border/50 bg-card/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl font-tech text-accent">與我們一起見證歷史</h2>
          <p className="text-lg text-foreground/80">
            訂閱我們的 YouTube 頻道，不要錯過 N688TW 環球飛行任務的每一個精彩時刻。
          </p>
        </div>
      </section>
    </div>
  );
}
