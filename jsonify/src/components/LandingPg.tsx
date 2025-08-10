/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "sonner"
import { AppHeader } from "@/components/app-header"
import { JsonCreator } from "@/components/json-creator"
import { JsonCompleter } from "@/components/json-completer"
import { JsonFormatter } from "@/components/json-formatter"
import { generateDummyData, generateFromStructure } from "@/lib/json-generator"
import { validateJson } from "@/lib/json-validator"
import { completeJsonWithSchema } from "@/lib/json-completer"
import type { SchemaType } from "@/lib/json-schemas"

export default function LandingPg() {
  const [jsonInput, setJsonInput] = useState("")
  const [jsonOutput, setJsonOutput] = useState("")
  const [isValid, setIsValid] = useState<boolean | null>(null)
  const [activeTab, setActiveTab] = useState("create")
  const [selectedSchema, setSelectedSchema] = useState<SchemaType>("user")
  const [validationErrors, setValidationErrors] = useState<unknown[]>([])

  const handleJsonChange = (value: string) => {
    setJsonInput(value)
    if (value.trim()) {
      // For Create JSON tab, only validate JSON syntax, not schema
      const schemaToUse = activeTab === "complete" ? selectedSchema : undefined
      const validation = validateJson(value, schemaToUse)
      setIsValid(validation.valid)
      setValidationErrors(validation.errors)
    } else {
      setIsValid(null)
      setValidationErrors([])
    }
  }

  const formatJson = () => {
    console.log("formatJson called with input:", jsonInput)
    try {
      const parsed = JSON.parse(jsonInput)
      const formatted = JSON.stringify(parsed, null, 2)
      setJsonOutput(formatted)
      console.log("JSON formatted successfully")
      toast.success("JSON Formatted", {
        description: "Your JSON has been formatted successfully.",
      })
    } catch (error) {
      console.log("JSON format error:", error)
      toast.error("Invalid JSON", {
        description: "Please check your JSON syntax and try again.",
      })
    }
  }

  const completeJson = () => {
    try {
      const validation = validateJson(jsonInput, selectedSchema)
      if (!validation.parsed) {
        toast.error("Invalid JSON", {
          description: "Please provide valid JSON to complete.",
        })
        return
      }

      const completed = completeJsonWithSchema(validation.parsed, selectedSchema)
      setJsonOutput(JSON.stringify(completed, null, 2))
      toast.success("JSON Completed", {
        description: "Missing required fields have been added with realistic data.",
      })
    } catch (error) {
      toast.error("Error", {
        description: "Failed to complete JSON. Please check your input.",
      })
    }
  }

  const generateFromUserStructure = () => {
    try {
      const parsed = JSON.parse(jsonInput)
      const generated = generateFromStructure(parsed)
      setJsonOutput(JSON.stringify(generated, null, 2))
      toast.success("JSON Generated", {
        description: "Random data generated based on your structure.",
      })
    } catch (error) {
      toast.error("Invalid JSON Structure", {
        description: "Please provide a valid JSON structure to generate from.",
      })
    }
  }

  const generateMultiple = (count: number) => {
    try {
      const parsed = JSON.parse(jsonInput)
      const items = Array.from({ length: count }, () => generateFromStructure(parsed))
      setJsonOutput(JSON.stringify(items, null, 2))
      toast.success("Multiple Items Generated", {
        description: `Generated ${count} items based on your structure.`,
      })
    } catch (error) {
      toast.error("Invalid JSON Structure", {
        description: "Please provide a valid JSON structure to generate from.",
      })
    }
  }

  const loadTemplate = (template: string) => {
    if (activeTab === "create") {
      // Load structure template for creation
      const templates = {
        user: '{\n  "name": "",\n  "email": "user@example.com",\n  "age": 0,\n  "phone": "",\n  "address": {\n    "street": "",\n    "city": "",\n    "country": ""\n  }\n}',
        product:
          '{\n  "name": "",\n  "description": "",\n  "price": 0,\n  "category": "",\n  "inStock": true,\n  "tags": [""]\n}',
        api: '{\n  "status": "success",\n  "data": [\n    {\n      "id": "",\n      "value": ""\n    }\n  ],\n  "message": ""\n}',
      }
      setJsonInput(templates[template as keyof typeof templates] || templates.user)
    } else {
      // Load complete data for completion/formatting
      const dummyData = generateDummyData(template as SchemaType)
      const templateJson = JSON.stringify(dummyData, null, 2)
      setJsonInput(templateJson)
    }

    // Re-validate with current tab context
    const schemaToUse = activeTab === "complete" ? selectedSchema : undefined
    const validation = validateJson(jsonInput, schemaToUse)
    setIsValid(validation.valid)
    setValidationErrors(validation.errors)
  }

  const copyToClipboard = (text: string) => {
    console.log("copyToClipboard called with:", text)
    navigator.clipboard.writeText(text)
    console.log("Clipboard write completed")
    toast.success("Copied!", {
      description: "JSON copied to clipboard.",
    })
  }

  const downloadJson = (content: string, filename: string) => {
    const blob = new Blob([content], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  // Re-validate when tab changes
  const handleTabChange = (newTab: string) => {
    setActiveTab(newTab)
    if (jsonInput.trim()) {
      const schemaToUse = newTab === "complete" ? selectedSchema : undefined
      const validation = validateJson(jsonInput, schemaToUse)
      setIsValid(validation.valid)
      setValidationErrors(validation.errors)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">JSON Creator & Enhancer</h2>
            <p className="text-muted-foreground">Create, complete, and format JSON data with ease</p>
                      </div>

          <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="create">Create from Template</TabsTrigger>
              <TabsTrigger value="complete">Complete Existing</TabsTrigger>
              <TabsTrigger value="format">Format JSON</TabsTrigger>
            </TabsList>

            <TabsContent value="create" className="space-y-6">
              <JsonCreator
                jsonInput={jsonInput}
                jsonOutput={jsonOutput}
                isValid={isValid}
                validationErrors={validationErrors}
                onJsonChange={handleJsonChange}
                onGenerateFromStructure={generateFromUserStructure}
                onGenerateMultiple={generateMultiple}
                onFormatJson={formatJson}
                onLoadTemplate={loadTemplate}
                onCopy={copyToClipboard}
                onDownload={downloadJson}
              />
            </TabsContent>

            <TabsContent value="complete" className="space-y-6">
              <JsonCompleter
                jsonInput={jsonInput}
                jsonOutput={jsonOutput}
                isValid={isValid}
                validationErrors={validationErrors}
                selectedSchema={selectedSchema}
                onJsonChange={handleJsonChange}
                onSchemaChange={(schema) => {
                  setSelectedSchema(schema as SchemaType)
                  // Re-validate with new schema
                  if (jsonInput.trim()) {
                    const validation = validateJson(jsonInput, schema as SchemaType)
                    setIsValid(validation.valid)
                    setValidationErrors(validation.errors)
                  }
                }}
                onCompleteJson={completeJson}
                onCopy={copyToClipboard}
              />
            </TabsContent>

            <TabsContent value="format" className="space-y-6">
              <JsonFormatter
                jsonInput={jsonInput}
                jsonOutput={jsonOutput}
                isValid={isValid}
                validationErrors={validationErrors}
                onJsonChange={handleJsonChange}
                onFormatJson={formatJson}
                onCopy={copyToClipboard}
              />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
