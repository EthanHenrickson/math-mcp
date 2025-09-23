# Math-MCP

[![smithery badge](https://smithery.ai/badge/@EthanHenrickson/math-mcp)](https://smithery.ai/server/@EthanHenrickson/math-mcp)

A Model Context Protocol (MCP) server that provides basic mathematical, statistical and trigonometric functions to Large Language Models (LLMs). This server enables LLMs to perform accurate numerical calculations through a simple API.

<a href="https://glama.ai/mcp/servers/exa5lt8dgd">
  <img width="380" height="200" src="https://glama.ai/mcp/servers/exa5lt8dgd/badge" alt="Math-MCP MCP server" />
</a>

## Features

- Basic arithmetic operations (addition, subtraction, multiplication, division)
- Statistical functions (sum, mean, median, mode, min, max)
- Rounding functions (floor, ceiling, round)
- Trigonometric functions (sin, cos, tan, and their inverses; degrees/radians conversions)

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

### Arithmetic Operations
| Function | Description | Parameters |
|----------|-------------|------------|
| `add` | Adds two numbers together | `firstNumber`: The first addend<br>`secondNumber`: The second addend |
| `subtract` | Subtracts the second number from the first number | `minuend`: The number to subtract from (minuend)<br>`subtrahend`: The number being subtracted (subtrahend) |
| `multiply` | Multiplies two numbers together | `firstNumber`: The first number<br>`SecondNumber`: The second number |
| `division` | Divides the first number by the second number | `numerator`: The number being divided (numerator)<br>`denominator`: The number to divide by (denominator) |
| `sum` | Adds any number of numbers together | `numbers`: Array of numbers to sum |
| `modulo` | Divides two numbers and returns the remainder | `numerator`: The number being divided (numerator)<br>`denominator`: The number to divide by (denominator) |
| `floor` | Rounds a number down to the nearest integer | `number`: The number to round down |
| `ceiling` | Rounds a number up to the nearest integer | `number`: The number to round up |
| `round` | Rounds a number to the nearest integer | `number`: The number to round |

### Statistical Operations
| Function | Description | Parameters |
|----------|-------------|------------|
| `mean` | Calculates the arithmetic mean of a list of numbers | `numbers`: Array of numbers to find the mean of |
| `median` | Calculates the median of a list of numbers | `numbers`: Array of numbers to find the median of |
| `mode` | Finds the most common number in a list of numbers | `numbers`: Array of numbers to find the mode of |
| `min` | Finds the minimum value from a list of numbers | `numbers`: Array of numbers to find the minimum of |
| `max` | Finds the maximum value from a list of numbers | `numbers`: Array of numbers to find the maximum of |

### Trigonometric Operations
| Function | Description | Parameters |
|----------|-------------|------------|
| `sin` | Calculates the sine of a number in radians | `number`: The number in radians to find the sine of |
| `arcsin` | Calculates the arcsine of a number in radians | `number`: The number to find the arcsine of |
| `cos` | Calculates the cosine of a number in radians | `number`: The number in radians to find the cosine of |
| `arccos` | Calculates the arccosine of a number in radians | `number`: The number to find the arccosine of |
| `tan` | Calculates the tangent of a number in radians | `number`: The number in radians to find the tangent of |
| `arctan` | Calculates the arctangent of a number in radians | `number`: The number to find the arctangent of |
| `radiansToDegrees` | Converts a radian value to its equivalent in degrees | `number`: The number in radians to convert to degrees |
| `degreesToRadians` | Converts a degree value to its equivalent in radians | `number`: The number in degrees to convert to radians |
