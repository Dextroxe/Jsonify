"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { FileJson, Wand2, Copy } from "lucide-react"
import { JsonValidationIndicator } from "./json-validation-indicator"

interface JsonFormatterProps {
  jsonInput: string
  jsonOutput: string
  isValid: boolean | null
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  validationErrors: any[]
  onJsonChange: (value: string) => void
  onFormatJson: () => void
  onCopy: (content: string) => void
}

export function JsonFormatter({
  jsonInput,
  jsonOutput,
  isValid,
  validationErrors,
  onJsonChange,
  onFormatJson,
  onCopy,
}: JsonFormatterProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileJson className="h-5 w-5" />
          Format JSON
        </CardTitle>
        <CardDescription>Clean up and format your JSON with proper indentation</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium">Raw JSON</label>
              <JsonValidationIndicator isValid={isValid} validationErrors={validationErrors} />
            </div>
            <Textarea
              placeholder="Paste unformatted JSON here..."
              value={jsonInput}
              onChange={(e) => onJsonChange(e.target.value)}
              className="min-h-[300px] font-mono text-sm"
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Formatted JSON</label>
            <Textarea
              placeholder="Formatted JSON will appear here..."
              value={jsonOutput}
              readOnly
              className="min-h-[300px] font-mono text-sm bg-muted"
            />
          </div>
        </div>
        <div className="flex gap-2">
          <Button onClick={onFormatJson} disabled={!isValid}>
            <Wand2 className="h-4 w-4 mr-2" />
            Format JSON
          </Button>
          <Button variant="outline" onClick={() => onCopy(jsonOutput)} disabled={!jsonOutput}>
            <Copy className="h-4 w-4 mr-2" />
            Copy Formatted
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
