import { Heart, Github, Linkedin, } from "lucide-react"

export function AppFooter() {
  return (
    <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex flex-col items-center gap-2 md:items-start">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Made with</span>
              <Heart className="h-4 w-4 text-red-500 fill-current" />
              <span>by</span>
              <span className="font-semibold text-foreground">Dashmat Hembram</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>aka</span>
              <span className="font-mono font-bold text-primary">DExTROx</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-xs text-muted-foreground">© 2025 Jsonify. All rights reserved.</div>
            <div className="flex items-center gap-2">
              <a
                href="https://github.com/Dextroxe"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/dashmat-hembram/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Twitter"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t text-center">
          <p className="text-xs text-muted-foreground">Built with Next.js, TypeScript, Tailwind CSS, and shadcn/ui</p>
        </div>
      </div>
    </footer>
  )
}
