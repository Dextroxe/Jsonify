# Jsonify
[![Ask DeepWiki](https://devin.ai/assets/askdeepwiki.png)](https://deepwiki.com/Dextroxe/Jsonify)

Jsonify is a web-based utility designed to streamline working with JSON. It provides a suite of tools to create, complete, format, and validate JSON data, making it an essential companion for developers and anyone working with JSON.

## Features

*   **JSON Creator**: Generate realistic single or multiple JSON objects from a structural template. It intelligently uses placeholders, example values, and field names to produce relevant data with Faker.js.
*   **JSON Completer**: Automatically add missing required fields to your existing JSON objects based on predefined schemas (e.g., User, Product, API Response).
*   **JSON Formatter**: Clean up and pretty-print your raw JSON data with proper indentation for improved readability.
*   **Real-time Validation**: Instantly validate your JSON for both syntax correctness and schema compliance using Ajv.
*   **Utility Actions**: Easily copy generated/formatted JSON to your clipboard or download it as a `.json` file.
*   **Theming**: Switch between light, dark, and system themes for your comfort.

## Core Functionality

Jsonify is organized into three main tabs, each catering to a specific task.

### 1. Create from Structure

This feature allows you to generate mock data by providing a template.

*   **Use Quick Templates**: Start with predefined templates for common data structures like User Profiles, Products, or API Responses.
*   **Define Custom Structures**:
    *   Use empty strings (`"name": ""`) to generate random text based on the key.
    *   Use placeholders (`"title": "{{productName}}"`) for specific data types.
    *   Provide example values (`"email": "user@example.com"`) to guide the data generation.
    *   Numbers (`"price": 0`) will be replaced with random numbers.
*   **Generate Data**: Create a single item or generate an array of multiple items with a single click.

### 2. Complete Existing JSON

Paste an incomplete JSON object, choose a relevant schema (User, Product, or API), and Jsonify will automatically populate the missing required fields with realistic data while preserving your existing fields.

### 3. Format JSON

Simply paste any raw, minified, or messy JSON into the input area, and the tool will instantly provide a clean, well-indented, and readable version.

## Tech Stack

*   **Framework**: Next.js (with Turbopack)
*   **Language**: TypeScript
*   **Styling**: Tailwind CSS
*   **UI Components**: shadcn/ui, Radix UI
*   **State Management**: Zustand
*   **Data Generation**: Faker.js
*   **Validation**: Ajv
*   **Notifications**: Sonner

## Local Development

To run Jsonify locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/dextroxe/jsonify.git
    cd jsonify
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```

The application will be available at `http://localhost:3000`.