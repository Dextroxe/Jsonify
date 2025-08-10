import { CheckCircle, AlertCircle } from "lucide-react"

interface JsonValidationIndicatorProps {
  isValid: boolean | null
  validationErrors: any[]
}

export function JsonValidationIndicator({ isValid, validationErrors }: JsonValidationIndicatorProps) {
  if (isValid === null) return null

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-1">
        {isValid ? (
          <CheckCircle className="h-4 w-4 text-green-500" />
        ) : (
          <AlertCircle className="h-4 w-4 text-red-500" />
        )}
        <span className={`text-xs ${isValid ? "text-green-500" : "text-red-500"}`}>
          {isValid ? "Valid JSON" : "Invalid JSON"}
        </span>
      </div>
      {!isValid && validationErrors.length > 0 && (
        <div className="text-xs text-red-500 space-y-1">
          {validationErrors.slice(0, 3).map((error, index) => (
            <div key={index}>
              {error.instancePath ? `${error.instancePath}: ` : ""}
              {error.message}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
