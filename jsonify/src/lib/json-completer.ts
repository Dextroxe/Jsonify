import { faker } from "@faker-js/faker"
import { schemas, type SchemaType} from "./json-schemas"
// import { schemas, type SchemaType } from "./json-schemas"

export const generateFieldValue = (fieldName: string, fieldSchema: any) => {
  if (fieldSchema.pattern) {
    // Handle UUID pattern
    if (fieldSchema.pattern.includes("0-9a-f") && fieldSchema.pattern.includes("8-4-4-4-12")) {
      return faker.string.uuid()
    }
    // Handle email pattern
    if (fieldSchema.pattern.includes("@")) {
      return faker.internet.email()
    }
    // Handle date-time pattern
    if (fieldSchema.pattern.includes("\\d{4}-\\d{2}-\\d{2}T")) {
      return new Date().toISOString()
    }
  }

  if (fieldSchema.type === "string") {
    if (fieldName.includes("name")) return faker.person.fullName()
    if (fieldName.includes("phone")) return faker.phone.number()
    if (fieldName.includes("address")) return faker.location.streetAddress()
    return faker.lorem.words(2)
  }
  if (fieldSchema.type === "integer" || fieldSchema.type === "number") {
    return faker.number.int({ min: fieldSchema.minimum || 0, max: fieldSchema.maximum || 100 })
  }
  if (fieldSchema.type === "boolean") return faker.datatype.boolean()
  if (fieldSchema.type === "array") return []
  return null
}

export const completeJsonWithSchema = (jsonData: any, schemaType: SchemaType) => {
  const schema = schemas[schemaType]
  const completed = { ...jsonData }

  // Auto-complete missing required fields
  if (schema.required) {
    schema.required.forEach((field: string) => {
      if (!(field in completed)) {
        // Generate appropriate dummy data based on field name and schema
        const fieldSchema = schema.properties[field]
        if (fieldSchema) {
          completed[field] = generateFieldValue(field, fieldSchema)
        }
      }
    })
  }

  // Add common fields if missing
  if (!completed.id && schema.properties.id) {
    completed.id = faker.string.uuid()
  }
  if (!completed.createdAt && schema.properties.createdAt) {
    completed.createdAt = new Date().toISOString()
  }

  return completed
}
