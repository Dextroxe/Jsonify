"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Wand2, Copy, CheckCircle2 } from "lucide-react"
import { JsonValidationIndicator } from "./json-validation-indicator"

interface JsonCompleterProps {
  jsonInput: string
  jsonOutput: string
  isValid: boolean | null
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  validationErrors: any[]
  selectedSchema: string
  onJsonChange: (value: string) => void
  onSchemaChange: (schema: string) => void
  onCompleteJson: () => void
  onCopy: (content: string) => void
}

export function JsonCompleter({
  jsonInput,
  jsonOutput,
  isValid,
  validationErrors,
  selectedSchema,
  onJsonChange,
  onSchemaChange,
  onCompleteJson,
  onCopy,
}: JsonCompleterProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5" />
          Complete Existing JSON
        </CardTitle>
        <CardDescription>Add missing required fields to existing JSON objects based on common schemas</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
          <h4 className="text-sm font-medium mb-2 text-blue-900 dark:text-blue-100">How This Works:</h4>
          <ul className="text-xs text-blue-800 dark:text-blue-200 space-y-1">
            <li>• Paste your incomplete JSON object</li>
            <li>• Choose a schema that matches your data type</li>
            <li>• Missing required fields will be automatically added</li>
            <li>• Existing fields remain unchanged</li>
          </ul>
        </div>

        <div className="mb-4">
          <label className="text-sm font-medium mb-2 block">Schema Type</label>
          <select
            value={selectedSchema}
            onChange={(e) => onSchemaChange(e.target.value)}
            className="w-full p-2 border rounded-md bg-background"
          >
            <option value="user">User Profile (requires: id, name, email)</option>
            <option value="product">Product (requires: id, name, price)</option>
            <option value="api">API Response (requires: status, timestamp)</option>
          </select>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium">Incomplete JSON Object</label>
              <JsonValidationIndicator isValid={isValid} validationErrors={validationErrors} />
            </div>
            <Textarea
              placeholder={`Paste your incomplete JSON here...\n\nExample for User schema:\n{\n  "name": "John Doe",\n  "email": "john@example.com"\n  // Missing: id, other fields\n}`}
              value={jsonInput}
              onChange={(e) => onJsonChange(e.target.value)}
              className="min-h-[300px] font-mono text-sm"
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Completed JSON</label>
            <Textarea
              placeholder="Completed JSON with all required fields will appear here..."
              value={jsonOutput}
              readOnly
              className="min-h-[300px] font-mono text-sm bg-muted"
            />
          </div>
        </div>
        <div className="flex gap-2">
          <Button onClick={onCompleteJson} disabled={!jsonInput.trim()}>
            <Wand2 className="h-4 w-4 mr-2" />
            Complete Missing Fields
          </Button>
          <Button variant="outline" onClick={() => onCopy(jsonOutput)} disabled={!jsonOutput}>
            <Copy className="h-4 w-4 mr-2" />
            Copy Result
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
