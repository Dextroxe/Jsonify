"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Plus, Wand2, Shuffle } from "lucide-react"
import { JsonValidationIndicator } from "./json-validation-indicator"
import { JsonActions } from "./json-actions"

interface JsonCreatorProps {
  jsonInput: string
  jsonOutput: string
  isValid: boolean | null
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  validationErrors: any[]
  onJsonChange: (value: string) => void
  onGenerateFromStructure: () => void
  onGenerateMultiple: (count: number) => void
  onFormatJson: () => void
  onLoadTemplate: (template: string) => void
  onCopy: (content: string) => void
  onDownload: (content: string, filename: string) => void
}

export function JsonCreator({
  jsonInput,
  jsonOutput,
  isValid,
  validationErrors,
  onJsonChange,
  onGenerateFromStructure,
  onGenerateMultiple,
  onFormatJson,
  onLoadTemplate,
  onCopy,
  onDownload,
}: JsonCreatorProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="h-5 w-5" />
          Create JSON from Structure
        </CardTitle>
        <CardDescription>Provide a JSON structure with placeholders and generate realistic random data</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="text-sm font-medium mb-2">Quick Templates</h4>
          <div className="flex gap-2 flex-wrap">
            <Button variant="outline" size="sm" onClick={() => onLoadTemplate("user")}>
              User Profile
            </Button>
            <Button variant="outline" size="sm" onClick={() => onLoadTemplate("product")}>
              Product
            </Button>
            <Button variant="outline" size="sm" onClick={() => onLoadTemplate("api")}>
              API Response
            </Button>
          </div>
        </div>

        <Separator />

        <div>
          <h4 className="text-sm font-medium mb-2">How to Create Structures</h4>
          <div className="text-xs text-muted-foreground mb-2 space-y-1">
            <p>{'• Empty strings generate random text: "name": ""'}</p>
            <p>{'• Placeholders get replaced: "title": "{{name}}"'}</p>
            <p>{'• Examples guide generation: "email": "user@example.com"'}</p>
            <p>{'• Arrays create multiple items: "items": [{"name": "", "price": 0}]'}</p>
            <p>{'• Numbers generate ranges: "price": 0 becomes random prices'}</p>
          </div>
          <div className="flex gap-2 flex-wrap">
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                onJsonChange('{\n  "name": "",\n  "email": "user@example.com",\n  "age": 0,\n  "isActive": true\n}')
              }
            >
              Simple User
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                onJsonChange(
                  '{\n  "users": [\n    {\n      "name": "",\n      "email": "",\n      "age": 0\n    }\n  ]\n}',
                )
              }
            >
              User Array
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                onJsonChange(
                  '{\n  "product": {\n    "name": "",\n    "price": 0,\n    "category": "",\n    "tags": [""]\n  }\n}',
                )
              }
            >
              Nested Object
            </Button>
          </div>
        </div>

        <Separator />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium">JSON Structure Template</label>
              <JsonValidationIndicator isValid={isValid} validationErrors={validationErrors} />
            </div>
            <Textarea
              placeholder={`Enter your JSON structure template here...\n\nExample:\n{\n  "name": "",\n  "email": "user@example.com",\n  "age": 0,\n  "address": {\n    "city": "",\n    "country": ""\n  }\n}`}
              value={jsonInput}
              onChange={(e) => onJsonChange(e.target.value)}
              className="min-h-[300px] font-mono text-sm"
            />
            <JsonActions content={jsonInput} onCopy={onCopy} onDownload={onDownload} filename="template.json" />
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Generated Data</label>
            <Textarea
              placeholder="Generated JSON with realistic data will appear here..."
              value={jsonOutput}
              readOnly
              className="min-h-[300px] font-mono text-sm bg-muted"
            />
            <JsonActions content={jsonOutput} onCopy={onCopy} onDownload={onDownload} filename="generated-data.json" />
          </div>
        </div>

        <div className="flex gap-2 flex-wrap">
          <Button onClick={onGenerateFromStructure} disabled={!isValid}>
            <Wand2 className="h-4 w-4 mr-2" />
            Generate Single Item
          </Button>
          <Button onClick={() => onGenerateMultiple(5)} disabled={!isValid} variant="outline">
            <Shuffle className="h-4 w-4 mr-2" />
            Generate 5 Items
          </Button>
          <Button onClick={() => onGenerateMultiple(10)} disabled={!isValid} variant="outline">
            <Shuffle className="h-4 w-4 mr-2" />
            Generate 10 Items
          </Button>
          <Button variant="outline" onClick={onFormatJson} disabled={!isValid}>
            Format Only
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
