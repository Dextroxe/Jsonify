import Ajv from "ajv"
import { schemas, type SchemaType } from "./json-schemas"

const ajv = new Ajv({
  allErrors: true,
  removeAdditional: true,
  formats: {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    uuid: /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
    "date-time": /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z?$/,
  },
})

export const validateJson = (jsonString: string, schemaType?: SchemaType) => {
  try {
    const parsed = JSON.parse(jsonString)
    if (schemaType && schemas[schemaType]) {
      const validate = ajv.compile(schemas[schemaType])
      const valid = validate(parsed)
      return { valid, errors: validate.errors || [], parsed }
    }
    return { valid: true, errors: [], parsed }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return { valid: false, errors: [{ message: "Invalid JSON syntax" }], parsed: null }
  }
}
