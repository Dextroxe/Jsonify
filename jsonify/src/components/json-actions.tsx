"use client"

import { Button } from "@/components/ui/button"
import { Copy, Download } from "lucide-react"

interface JsonActionsProps {
  content: string
  onCopy: (content: string) => void
  onDownload: (content: string, filename: string) => void
  filename?: string
  disabled?: boolean
}

export function JsonActions({
  content,
  onCopy,
  onDownload,
  filename = "data.json",
  disabled = false,
}: JsonActionsProps) {
  return (
    <div className="flex gap-2 mt-2">
      <Button variant="outline" size="sm" onClick={() => onCopy(content)} disabled={disabled || !content}>
        <Copy className="h-4 w-4 mr-1" />
        Copy
      </Button>
      <Button variant="outline" size="sm" onClick={() => onDownload(content, filename)} disabled={disabled || !content}>
        <Download className="h-4 w-4 mr-1" />
        Download
      </Button>
    </div>
  )
}
