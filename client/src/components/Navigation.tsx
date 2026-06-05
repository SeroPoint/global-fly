import { Link } from "wouter";
import { Plane } from "lucide-react";

export default function Navigation() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/">
            <a className="flex items-center gap-2 group cursor-pointer">
              <div className="p-2 rounded-lg bg-accent/10 group-hover:bg-accent/20 transition-colors">
                <Plane className="w-6 h-6 text-accent" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg font-tech text-accent tracking-widest">N688TW</h1>
                <p className="text-xs text-muted-foreground">GLOBAL MISSION</p>
              </div>
            </a>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-1 sm:gap-2">
            <Link href="/">
              <a className="px-3 sm:px-4 py-2 text-sm font-medium rounded-lg hover:bg-accent/10 transition-colors text-foreground hover:text-accent">
                首頁
              </a>
            </Link>
            <Link href="/sponsors">
              <a className="px-3 sm:px-4 py-2 text-sm font-medium rounded-lg hover:bg-accent/10 transition-colors text-foreground hover:text-accent">
                贊助商
              </a>
            </Link>
            <Link href="/livestream">
              <a className="px-3 sm:px-4 py-2 text-sm font-medium rounded-lg hover:bg-accent/10 transition-colors text-foreground hover:text-accent">
                直播
              </a>
            </Link>
            <Link href="/story">
              <a className="px-3 sm:px-4 py-2 text-sm font-medium rounded-lg hover:bg-accent/10 transition-colors text-foreground hover:text-accent">
                故事
              </a>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
