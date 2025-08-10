import { faker } from "@faker-js/faker"
import type { SchemaType } from "./json-schemas"

export const generateDummyData = (type: SchemaType) => {
  switch (type) {
    case "user":
      return {
        id: faker.string.uuid(),
        name: faker.person.fullName(),
        email: faker.internet.email(),
        age: faker.number.int({ min: 18, max: 80 }),
        phone: faker.phone.number(),
        address: {
          street: faker.location.streetAddress(),
          city: faker.location.city(),
          country: faker.location.country(),
          zipCode: faker.location.zipCode(),
        },
        createdAt: faker.date.recent().toISOString(),
      }
    case "product":
      return {
        id: faker.string.uuid(),
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: Number.parseFloat(faker.commerce.price()),
        category: faker.commerce.department(),
        inStock: faker.datatype.boolean(),
        tags: faker.helpers.arrayElements(["popular", "new", "sale", "featured", "limited"], { min: 1, max: 3 }),
        sku: faker.string.alphanumeric(8).toUpperCase(),
        createdAt: faker.date.recent().toISOString(),
      }
    case "api":
      return {
        status: faker.helpers.arrayElement(["success", "error", "pending"]),
        data: Array.from({ length: faker.number.int({ min: 0, max: 5 }) }, () => ({
          id: faker.string.uuid(),
          value: faker.lorem.words(3),
        })),
        message: faker.lorem.sentence(),
        timestamp: faker.date.recent().toISOString(),
        requestId: faker.string.uuid(),
        pagination: {
          page: faker.number.int({ min: 1, max: 10 }),
          limit: faker.number.int({ min: 10, max: 100 }),
          total: faker.number.int({ min: 0, max: 1000 }),
        },
      }
    default:
      return {}
  }
}

export const generateStringByKey = (fieldKey: string): string => {
  const lowerKey = fieldKey.toLowerCase()

  if (lowerKey.includes("name")) return faker.person.fullName()
  if (lowerKey.includes("email")) return faker.internet.email()
  if (lowerKey.includes("phone")) return faker.phone.number()
  if (lowerKey.includes("address")) return faker.location.streetAddress()
  if (lowerKey.includes("city")) return faker.location.city()
  if (lowerKey.includes("country")) return faker.location.country()
  if (lowerKey.includes("zip") || lowerKey.includes("postal")) return faker.location.zipCode()
  if (lowerKey.includes("company")) return faker.company.name()
  if (lowerKey.includes("job") || lowerKey.includes("title")) return faker.person.jobTitle()
  if (lowerKey.includes("description")) return faker.lorem.paragraph()
  if (lowerKey.includes("url") || lowerKey.includes("website")) return faker.internet.url()
  if (lowerKey.includes("username")) return faker.internet.userName()
  if (lowerKey.includes("password")) return faker.internet.password()
  if (lowerKey.includes("id")) return faker.string.uuid()
  if (lowerKey.includes("date") || lowerKey.includes("time")) return faker.date.recent().toISOString()
  if (lowerKey.includes("price") || lowerKey.includes("amount")) return faker.commerce.price()
  if (lowerKey.includes("product")) return faker.commerce.productName()
  if (lowerKey.includes("category")) return faker.commerce.department()
  if (lowerKey.includes("color")) return faker.color.human()
  if (lowerKey.includes("image") || lowerKey.includes("photo")) return faker.image.url()
  if (lowerKey.includes("avatar")) return faker.image.avatar()

  return faker.lorem.words(faker.number.int({ min: 1, max: 3 }))
}

export const generateFromStructure = (structure: any, currentKey?: string): any => {
  if (Array.isArray(structure)) {
    // If it's an array, generate 2-5 items based on the first element
    if (structure.length > 0) {
      const count = faker.number.int({ min: 2, max: 5 })
      return Array.from({ length: count }, () => generateFromStructure(structure[0]))
    }
    return []
  }

  if (structure && typeof structure === "object") {
    const result: any = {}
    for (const [fieldKey, value] of Object.entries(structure)) {
      result[fieldKey] = generateFromStructure(value, fieldKey)
    }
    return result
  }

  // Generate data based on the type and content of the value
  if (typeof structure === "string") {
    if (structure === "" || structure === "string") {
      return generateStringByKey(currentKey || "text")
    }
    // If it contains placeholder patterns, replace them
    if (structure.includes("{{") && structure.includes("}}")) {
      return structure.replace(/\{\{(\w+)\}\}/g, (match, placeholder) => {
        return generateStringByKey(placeholder)
      })
    }
    // If it looks like an example, generate similar data
    if (structure.includes("@")) return faker.internet.email()
    if (structure.match(/^\d{4}-\d{2}-\d{2}/)) return faker.date.recent().toISOString()
    if (structure.match(/^[0-9a-f-]{36}$/i)) return faker.string.uuid()
    if (structure.match(/^\+?\d+/)) return faker.phone.number()
    return generateStringByKey(currentKey || "text")
  }

  if (typeof structure === "number") {
    if (structure === 0) {
      return faker.number.int({ min: 1, max: 1000 })
    }
    // Generate number in similar range
    const magnitude = Math.floor(Math.log10(Math.abs(structure)))
    const min = Math.pow(10, magnitude)
    const max = Math.pow(10, magnitude + 1)
    return faker.number.int({ min, max })
  }

  if (typeof structure === "boolean") {
    return faker.datatype.boolean()
  }

  return structure
}
