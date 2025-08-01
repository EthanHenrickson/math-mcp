# Math-MCP

[![smithery badge](https://smithery.ai/badge/@EthanHenrickson/math-mcp)](https://smithery.ai/server/@EthanHenrickson/math-mcp)

A Model Context Protocol (MCP) server that provides basic mathematical and statistical functions to Large Language Models (LLMs). This server enables LLMs to perform accurate numerical calculations through a simple API.

<a href="https://glama.ai/mcp/servers/exa5lt8dgd">
  <img width="380" height="200" src="https://glama.ai/mcp/servers/exa5lt8dgd/badge" alt="Math-MCP MCP server" />
</a>

## Features

- Basic arithmetic operations (addition, subtraction, multiplication, division)
- Statistical functions (sum, average, min, max)
- Rounding functions (floor, ceiling, round)

## Installation
### Installing via Smithery

To install Math-MCP for Claude Desktop automatically via [Smithery](https://smithery.ai/server/@EthanHenrickson/math-mcp):

```bash
npx -y @smithery/cli install @EthanHenrickson/math-mcp --client claude
```

### Installing Manually

Just clone this repository and save it locally somewhere on your computer.

Then add this server to your MCP configuration file:

```json
"math": {
  "command": "node",
  "args": ["PATH\\TO\\PROJECT\\math-mcp\\build\\index.js"]
}
```

Replace `PATH\\TO\\PROJECT` with the actual path to where you cloned the repository.

## Available Functions

The Math-MCP server provides the following mathematical operations:

| Function | Description | Parameters |
|----------|-------------|------------|
| `add` | Adds two numbers together | `firstNumber`: The first addend<br>`secondNumber`: The second addend |
| `subtract` | Subtracts the second number from the first number | `minuend`: The number to subtract from<br>`subtrahend`: The number being subtracted |
| `multiply` | Multiplies two numbers together | `firstNumber`: The first factor<br>`secondNumber`: The second factor |
| `division` | Divides the first number by the second number | `numerator`: The number being divided<br>`denominator`: The number to divide by |
| `sum` | Adds any number of numbers together | `numbers`: Array of numbers to sum |
| `average` | Calculates the arithmetic mean of a list of numbers | `numbers`: Array of numbers to find the average of |
| `min` | Finds the minimum value from a list of numbers | `numbers`: Array of numbers to find the minimum of |
| `max` | Finds the maximum value from a list of numbers | `numbers`: Array of numbers to find the maximum of |
| `floor` | Rounds a number down to the nearest integer | `number`: The number to round down |
| `ceiling` | Rounds a number up to the nearest integer | `number`: The number to round up |
| `round` | Rounds a number to the nearest integer | `number`: The number to round |
