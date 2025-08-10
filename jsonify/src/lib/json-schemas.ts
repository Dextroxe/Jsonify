export const schemas = {
  user: {
    type: "object",
    properties: {
      id: { type: "string", pattern: "^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$" },
      name: { type: "string", minLength: 1 },
      email: { type: "string", pattern: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$" },
      age: { type: "integer", minimum: 0, maximum: 150 },
      phone: { type: "string" },
      address: {
        type: "object",
        properties: {
          street: { type: "string" },
          city: { type: "string" },
          country: { type: "string" },
          zipCode: { type: "string" },
        },
        required: ["street", "city", "country"],
      },
      createdAt: { type: "string", pattern: "^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(\\.\\d{3})?Z?$" },
    },
    required: ["id", "name", "email"],
    additionalProperties: false,
  },
  product: {
    type: "object",
    properties: {
      id: { type: "string", pattern: "^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$" },
      name: { type: "string", minLength: 1 },
      description: { type: "string" },
      price: { type: "number", minimum: 0 },
      category: { type: "string" },
      inStock: { type: "boolean" },
      tags: { type: "array", items: { type: "string" } },
      sku: { type: "string" },
      createdAt: { type: "string", pattern: "^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(\\.\\d{3})?Z?$" },
    },
    required: ["id", "name", "price"],
    additionalProperties: false,
  },
  api: {
    type: "object",
    properties: {
      status: { type: "string", enum: ["success", "error", "pending"] },
      data: { type: "array" },
      message: { type: "string" },
      timestamp: { type: "string", pattern: "^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(\\.\\d{3})?Z?$" },
      requestId: {
        type: "string",
        pattern: "^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$",
      },
      pagination: {
        type: "object",
        properties: {
          page: { type: "integer", minimum: 1 },
          limit: { type: "integer", minimum: 1 },
          total: { type: "integer", minimum: 0 },
        },
      },
    },
    required: ["status", "timestamp"],
    additionalProperties: false,
  },
} as const

export type SchemaType = keyof typeof schemas
