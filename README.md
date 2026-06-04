# Math-MCP

A Model Context Protocol (MCP) server that provides **105 mathematical functions** to Large Language Models (LLMs). Covers arithmetic, statistics, trigonometry, algebra, number theory, linear algebra, hyperbolic trig, geometry, finance, and general utilities.

<a href="https://glama.ai/mcp/servers/exa5lt8dgd">
  <img width="380" height="200" src="https://glama.ai/mcp/servers/exa5lt8dgd/badge" alt="Math-MCP MCP server" />
</a>

## Installation

> **Note:** Ensure you have [Node.js](https://nodejs.org/en/download) installed on your computer.

Clone the repo, install dependencies, and build:

```sh
git clone https://github.com/YOUR_USER/math-mcp.git
cd math-mcp
npm install
npm run build
```

Then add the server to your MCP configuration:

```json
"math": {
  "command": "node",
  "args": ["PATH/TO/math-mcp/build/index.js"]
}
```

For OpenCode:

```json
{
  "mcp": {
    "math-mcp": {
      "type": "local",
      "command": ["node", "PATH/TO/math-mcp/build/index.js"]
    }
  }
}
```

Replace `PATH/TO` with the actual path to the cloned repo.

## Available Functions

<details>
<summary><strong>Arithmetic</strong> (15 functions)</summary>

| Function | Description |
|----------|-------------|
| `add` | Adds two numbers |
| `subtract` | Subtracts second number from first |
| `multiply` | Multiplies two numbers |
| `division` | Divides numerator by denominator |
| `sum` | Sums an array of numbers |
| `modulo` | Returns remainder of division |
| `power` | Raises base to exponent |
| `sqrt` | Square root |
| `cbrt` | Cube root |
| `root` | nth root |
| `abs` | Absolute value |
| `factorial` | Factorial of a non-negative integer |
| `floor` | Rounds down to nearest integer |
| `ceiling` | Rounds up to nearest integer |
| `round` | Rounds to nearest integer |

</details>

<details>
<summary><strong>Statistics</strong> (23 functions)</summary>

| Function | Description |
|----------|-------------|
| `mean` | Arithmetic mean |
| `median` | Median |
| `mode` | Most common value |
| `min` | Minimum value |
| `max` | Maximum value |
| `varianceSample` | Sample variance (divides by n-1) |
| `variancePopulation` | Population variance (divides by n) |
| `standardDeviationSample` | Sample standard deviation |
| `standardDeviationPopulation` | Population standard deviation |
| `quartiles` | Q1, Q2, Q3 |
| `percentile` | Value at a given percentile |
| `range` | Max - min |
| `interquartileRange` | Q3 - Q1 |
| `geometricMean` | Geometric mean |
| `harmonicMean` | Harmonic mean |
| `covariance` | Sample covariance |
| `correlation` | Pearson correlation coefficient |
| `skewness` | Skewness |
| `kurtosis` | Excess kurtosis |
| `weightedMean` | Weighted mean |
| `zScore` | Z-score |
| `movingAverage` | Simple moving average |
| `standardError` | Standard error of the mean |

</details>

<details>
<summary><strong>Trigonometric</strong> (16 functions)</summary>

| Function | Description |
|----------|-------------|
| `sin` | Sine (radians) |
| `cos` | Cosine (radians) |
| `tan` | Tangent (radians) |
| `csc` | Cosecant (radians) |
| `sec` | Secant (radians) |
| `cot` | Cotangent (radians) |
| `arcsin` | Arcsine (radians) |
| `arccos` | Arccosine (radians) |
| `arctan` | Arctangent (radians) |
| `arctan2` | Arctangent of y/x |
| `radiansToDegrees` | Radians → degrees |
| `degreesToRadians` | Degrees → radians |
| `hypot` | Hypotenuse (sqrt(a² + b²)) |
| `lawOfCosines` | Third side via law of cosines |
| `polarToCartesian` | Polar → Cartesian |
| `cartesianToPolar` | Cartesian → Polar |

</details>

<details>
<summary><strong>Hyperbolic Trig</strong> (6 functions)</summary>

| Function | Description |
|----------|-------------|
| `sinh` | Hyperbolic sine |
| `cosh` | Hyperbolic cosine |
| `tanh` | Hyperbolic tangent |
| `asinh` | Inverse hyperbolic sine |
| `acosh` | Inverse hyperbolic cosine |
| `atanh` | Inverse hyperbolic tangent |

</details>

<details>
<summary><strong>Algebra</strong> (7 functions)</summary>

| Function | Description |
|----------|-------------|
| `log` | Logarithm with custom base |
| `ln` | Natural logarithm |
| `log2` | Base-2 logarithm |
| `log10` | Base-10 logarithm |
| `exp` | e raised to a power |
| `permutations` | P(n, r) = n!/(n-r)! |
| `combinations` | C(n, r) = n!/(r!(n-r)!) |

</details>

<details>
<summary><strong>Number Theory</strong> (14 functions)</summary>

| Function | Description |
|----------|-------------|
| `gcd` | Greatest common divisor |
| `lcm` | Least common multiple |
| `isPrime` | Primality test |
| `primeFactors` | Prime factorization |
| `fibonacci` | nth Fibonacci number |
| `isEven` | Even check |
| `isOdd` | Odd check |
| `modPow` | Modular exponentiation |
| `extendedGcd` | Extended GCD (ax + by = gcd) |
| `modInverse` | Modular multiplicative inverse |
| `totient` | Euler's totient φ(n) |
| `isPerfectSquare` | Perfect square check |
| `digitalRoot` | Repeated digit sum |
| `collatz` | Collatz sequence |

</details>

<details>
<summary><strong>Linear Algebra</strong> (7 functions)</summary>

| Function | Description |
|----------|-------------|
| `matrixMultiply` | Matrix multiplication |
| `determinant` | Determinant of square matrix |
| `transpose` | Matrix transpose |
| `dotProduct` | Dot product of two vectors |
| `crossProduct` | Cross product of 3D vectors |
| `vectorMagnitude` | Vector length |
| `vectorNormalize` | Normalize to unit vector |

</details>

<details>
<summary><strong>Geometry</strong> (4 functions)</summary>

| Function | Description |
|----------|-------------|
| `haversine` | Great-circle distance (Earth) |
| `heronArea` | Triangle area via Heron's formula |
| `circleArea` | Circle area |
| `sphereVolume` | Sphere volume |

</details>

<details>
<summary><strong>Finance</strong> (2 functions)</summary>

| Function | Description |
|----------|-------------|
| `compoundInterest` | A = P(1 + r/n)^(nt) |
| `presentValue` | PV = FV/(1 + r/n)^(nt) |

</details>

<details>
<summary><strong>Utilities</strong> (11 functions)</summary>

| Function | Description |
|----------|-------------|
| `clamp` | Constrain within range |
| `lerp` | Linear interpolation |
| `mapRange` | Map value between ranges |
| `percentageOf` | Part / whole × 100 |
| `percentageChange` | (New - old) / old × 100 |
| `randomInt` | Random integer inclusive |
| `randomFloat` | Random float between bounds |
| `sign` | Sign of a number |
| `isBetween` | Check if in range (inclusive) |
| `baseConvert` | Convert between bases 2–36 |
| `fractionSimplify` | Reduce fraction to lowest terms |

</details>

## Summary

| Category | Count |
|----------|-------|
| Arithmetic | 15 |
| Statistics | 23 |
| Trigonometric | 16 |
| Hyperbolic Trig | 6 |
| Algebra | 7 |
| Number Theory | 14 |
| Linear Algebra | 7 |
| Geometry | 4 |
| Finance | 2 |
| Utilities | 11 |
| **Total** | **105** |
