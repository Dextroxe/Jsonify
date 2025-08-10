import { FileJson } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { ModeToggle } from "@/components/mode-toggle"

export function AppHeader() {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileJson className="h-8 w-8 text-primary" />
          <h1 className="text-2xl font-bold">Jsonify</h1>
          <Badge variant="secondary">v1.0</Badge>
        </div>
        <ModeToggle />
      </div>
    </header>
  )
}
