import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { Arithmetic } from "./Classes/Arithmetic.js";
import { Statistics } from "./Classes/Statistics.js";
import { Trigonometric } from "./Classes/Trigonometric.js";
import { Algebra } from "./Classes/Algebra.js";
import { NumberTheory } from "./Classes/NumberTheory.js";
import { Utilities } from "./Classes/Utilities.js";
import { LinearAlgebra } from "./Classes/LinearAlgebra.js";
import { HyperbolicTrig } from "./Classes/HyperbolicTrig.js";
import { Geometry } from "./Classes/Geometry.js";
import { Finance } from "./Classes/Finance.js";

export default function createServer() {
    const mathServer = new McpServer({
        name: "math",
        version: "0.2.0"
    })

    mathServer.tool("add", "Adds two numbers together", {
        firstNumber: z.number().describe("The first addend"),
        secondNumber: z.number().describe("The second addend")
    }, async ({ firstNumber, secondNumber }) => {
        const value = Arithmetic.add(firstNumber, secondNumber)
        return {
            content: [{ type: "text", text: `${value}` }]
        }
    })

    mathServer.tool("subtract", "Subtracts the second number from the first number", {
        minuend: z.number().describe("The number to subtract from (minuend)"),
        subtrahend: z.number().describe("The number being subtracted (subtrahend)")
    }, async ({ minuend, subtrahend }) => {
        const value = Arithmetic.subtract(minuend, subtrahend)
        return {
            content: [{ type: "text", text: `${value}` }]
        }
    })

    mathServer.tool("multiply", "Multiplies two numbers together", {
        firstNumber: z.number().describe("The first number"),
        secondNumber: z.number().describe("The second number")
    }, async ({ firstNumber, secondNumber }) => {
        const value = Arithmetic.multiply(firstNumber, secondNumber)
        return {
            content: [{ type: "text", text: `${value}` }]
        }
    })

    mathServer.tool("division", "Divides the first number by the second number", {
        numerator: z.number().describe("The number being divided (numerator)"),
        denominator: z.number().describe("The number to divide by (denominator)")
    }, async ({ numerator, denominator }) => {
        const value = Arithmetic.division(numerator, denominator)
        return {
            content: [{ type: "text", text: `${value}` }]
        }
    })

    mathServer.tool("sum", "Adds any number of numbers together", {
        numbers: z.array(z.number()).min(1).describe("Array of numbers to sum")
    }, async ({ numbers }) => {
        const value = Arithmetic.sum(numbers)
        return {
            content: [{ type: "text", text: `${value}` }]
        }
    })

    mathServer.tool("modulo", "Divides two numbers and returns the remainder", {
        numerator: z.number().describe("The number being divided (numerator)"),
        denominator: z.number().describe("The number to divide by (denominator)")
    }, async ({ numerator, denominator }) => {
        const value = Arithmetic.modulo(numerator, denominator)
        return {
            content: [{ type: "text", text: `${value}` }]
        }
    })

    mathServer.tool("mean", "Calculates the arithmetic mean of a list of numbers", {
        numbers: z.array(z.number()).min(1).describe("Array of numbers to find the mean of")
    }, async ({ numbers }) => {
        const value = Statistics.mean(numbers)
        return {
            content: [{ type: "text", text: `${value}` }]
        }
    })

    mathServer.tool("median", "Calculates the median of a list of numbers", {
        numbers: z.array(z.number()).min(1).describe("Array of numbers to find the median of")
    }, async ({ numbers }) => {
        const value = Statistics.median(numbers)
        return {
            content: [{ type: "text", text: `${value}` }]
        }
    })

    mathServer.tool("mode", "Finds the most common number in a list of numbers", {
        numbers: z.array(z.number()).describe("Array of numbers to find the mode of")
    }, async ({ numbers }) => {
        const value = Statistics.mode(numbers)
        return {
            content: [{
                type: "text",
                text: `Entries (${value.modeResult.join(', ')}) appeared ${value.maxFrequency} times`
            }]
        }
    })

    mathServer.tool("min", "Finds the minimum value from a list of numbers", {
        numbers: z.array(z.number()).describe("Array of numbers to find the minimum of")
    }, async ({ numbers }) => {
        const value = Statistics.min(numbers)
        return {
            content: [{ type: "text", text: `${value}` }]
        }
    })

    mathServer.tool("max", "Finds the maximum value from a list of numbers", {
        numbers: z.array(z.number()).describe("Array of numbers to find the maximum of")
    }, async ({ numbers }) => {
        const value = Statistics.max(numbers)
        return {
            content: [{ type: "text", text: `${value}` }]
        }
    })

    mathServer.tool("floor", "Rounds a number down to the nearest integer", {
        number: z.number().describe("The number to round down"),
    }, async ({ number }) => {
        const value = Arithmetic.floor(number)
        return {
            content: [{ type: "text", text: `${value}` }]
        }
    })

    mathServer.tool("ceiling", "Rounds a number up to the nearest integer", {
        number: z.number().describe("The number to round up"),
    }, async ({ number }) => {
        const value = Arithmetic.ceil(number)
        return {
            content: [{ type: "text", text: `${value}` }]
        }
    })

    mathServer.tool("round", "Rounds a number to the nearest integer", {
        number: z.number().describe("The number to round"),
    }, async ({ number }) => {
        const value = Arithmetic.round(number)
        return {
            content: [{ type: "text", text: `${value}` }]
        }
    })

    mathServer.tool("sin", "Calculates the sine of a number in radians", {
        number: z.number().describe("The number in radians to find the sine of")
    }, async ({ number }) => {
        const value = Trigonometric.sin(number)
        return {
            content: [{ type: "text", text: `${value}` }]
        }
    })

    mathServer.tool("arcsin", "Calculates the arcsine (in radians) of a number", {
        number: z.number().describe("The number to find the arcsine of")
    }, async ({ number }) => {
        const value = Trigonometric.arcsin(number)
        return {
            content: [{ type: "text", text: `${value}` }]
        }
    })

    mathServer.tool("cos", "Calculates the cosine of a number in radians", {
        number: z.number().describe("The number in radians to find the cosine of")
    }, async ({ number }) => {
        const value = Trigonometric.cos(number)
        return {
            content: [{ type: "text", text: `${value}` }]
        }
    })

    mathServer.tool("arccos", "Calculates the arccosine (in radians) of a number", {
        number: z.number().describe("The number to find the arccosine of")
    }, async ({ number }) => {
        const value = Trigonometric.arccos(number)
        return {
            content: [{ type: "text", text: `${value}` }]
        }
    })

    mathServer.tool("tan", "Calculates the tangent of a number in radians", {
        number: z.number().describe("The number in radians to find the tangent of")
    }, async ({ number }) => {
        const value = Trigonometric.tan(number)
        return {
            content: [{ type: "text", text: `${value}` }]
        }
    })

    mathServer.tool("arctan", "Calculates the arctangent (in radians) of a number", {
        number: z.number().describe("The number to find the arctangent of")
    }, async ({ number }) => {
        const value = Trigonometric.arctan(number)
        return {
            content: [{ type: "text", text: `${value}` }]
        }
    })

    mathServer.tool("radiansToDegrees", "Converts a radian value to its equivalent in degrees", {
        number: z.number().describe("The number in radians to convert to degrees")
    }, async ({ number }) => {
        const value = Trigonometric.radiansToDegrees(number)
        return {
            content: [{ type: "text", text: `${value}` }]
        }
    })

    mathServer.tool("degreesToRadians", "Converts a degree value to its equivalent in radians", {
        number: z.number().describe("The number in degrees to convert to radians")
    }, async ({ number }) => {
        const value = Trigonometric.degreesToRadians(number)
        return {
            content: [{ type: "text", text: `${value}` }]
        }
    })

    mathServer.tool("power", "Raises a base number to an exponent", {
        base: z.number().describe("The base number"),
        exponent: z.number().describe("The exponent to raise the base to")
    }, async ({ base, exponent }) => {
        const value = Arithmetic.power(base, exponent)
        return {
            content: [{ type: "text", text: `${value}` }]
        }
    })

    mathServer.tool("sqrt", "Calculates the square root of a number", {
        number: z.number().describe("The number to find the square root of")
    }, async ({ number }) => {
        const value = Arithmetic.sqrt(number)
        return {
            content: [{ type: "text", text: `${value}` }]
        }
    })

    mathServer.tool("cbrt", "Calculates the cube root of a number", {
        number: z.number().describe("The number to find the cube root of")
    }, async ({ number }) => {
        const value = Arithmetic.cbrt(number)
        return {
            content: [{ type: "text", text: `${value}` }]
        }
    })

    mathServer.tool("root", "Calculates the nth root of a number", {
        number: z.number().describe("The number to find the root of"),
        n: z.number().describe("The degree of the root")
    }, async ({ number, n }) => {
        const value = Arithmetic.root(number, n)
        return {
            content: [{ type: "text", text: `${value}` }]
        }
    })

    mathServer.tool("abs", "Returns the absolute value of a number", {
        number: z.number().describe("The number to find the absolute value of")
    }, async ({ number }) => {
        const value = Arithmetic.abs(number)
        return {
            content: [{ type: "text", text: `${value}` }]
        }
    })

    mathServer.tool("factorial", "Calculates the factorial of a non-negative integer", {
        number: z.number().describe("The non-negative integer to calculate the factorial of")
    }, async ({ number }) => {
        const value = Arithmetic.factorial(number)
        return {
            content: [{ type: "text", text: `${value}` }]
        }
    })

    mathServer.tool("csc", "Calculates the cosecant of a number in radians", {
        number: z.number().describe("The number in radians to find the cosecant of")
    }, async ({ number }) => {
        const value = Trigonometric.csc(number)
        return {
            content: [{ type: "text", text: `${value}` }]
        }
    })

    mathServer.tool("sec", "Calculates the secant of a number in radians", {
        number: z.number().describe("The number in radians to find the secant of")
    }, async ({ number }) => {
        const value = Trigonometric.sec(number)
        return {
            content: [{ type: "text", text: `${value}` }]
        }
    })

    mathServer.tool("cot", "Calculates the cotangent of a number in radians", {
        number: z.number().describe("The number in radians to find the cotangent of")
    }, async ({ number }) => {
        const value = Trigonometric.cot(number)
        return {
            content: [{ type: "text", text: `${value}` }]
        }
    })

    mathServer.tool("arctan2", "Calculates the arctangent of y/x in radians, using the signs to determine the correct quadrant", {
        y: z.number().describe("The y-coordinate"),
        x: z.number().describe("The x-coordinate")
    }, async ({ y, x }) => {
        const value = Trigonometric.arctan2(y, x)
        return {
            content: [{ type: "text", text: `${value}` }]
        }
    })

    mathServer.tool("hypot", "Calculates the hypotenuse (sqrt(a² + b²))", {
        a: z.number().describe("First side length"),
        b: z.number().describe("Second side length")
    }, async ({ a, b }) => {
        const value = Trigonometric.hypot(a, b)
        return {
            content: [{ type: "text", text: `${value}` }]
        }
    })

    mathServer.tool("lawOfCosines", "Calculates the third side of a triangle using the law of cosines: c = sqrt(a² + b² - 2ab·cos(C))", {
        a: z.number().describe("First side length"),
        b: z.number().describe("Second side length"),
        angleC: z.number().describe("The angle between sides a and b in radians")
    }, async ({ a, b, angleC }) => {
        const value = Trigonometric.lawOfCosines(a, b, angleC)
        return {
            content: [{ type: "text", text: `${value}` }]
        }
    })

    mathServer.tool("polarToCartesian", "Converts polar coordinates (r, theta) to cartesian coordinates (x, y)", {
        r: z.number().describe("The radius (distance from origin)"),
        theta: z.number().describe("The angle in radians")
    }, async ({ r, theta }) => {
        const { x, y } = Trigonometric.polarToCartesian(r, theta)
        return {
            content: [{ type: "text", text: `x: ${x}, y: ${y}` }]
        }
    })

    mathServer.tool("cartesianToPolar", "Converts cartesian coordinates (x, y) to polar coordinates (r, theta)", {
        x: z.number().describe("The x-coordinate"),
        y: z.number().describe("The y-coordinate")
    }, async ({ x, y }) => {
        const { r, theta } = Trigonometric.cartesianToPolar(x, y)
        return {
            content: [{ type: "text", text: `r: ${r}, theta: ${theta}` }]
        }
    })

    mathServer.tool("varianceSample", "Calculates the sample variance of an array of numbers (divides by n-1)", {
        numbers: z.array(z.number()).describe("Array of numbers to find the sample variance of")
    }, async ({ numbers }) => {
        const value = Statistics.varianceSample(numbers)
        return {
            content: [{ type: "text", text: `${value}` }]
        }
    })

    mathServer.tool("variancePopulation", "Calculates the population variance of an array of numbers (divides by n)", {
        numbers: z.array(z.number()).describe("Array of numbers to find the population variance of")
    }, async ({ numbers }) => {
        const value = Statistics.variancePopulation(numbers)
        return {
            content: [{ type: "text", text: `${value}` }]
        }
    })

    mathServer.tool("standardDeviationSample", "Calculates the sample standard deviation of an array of numbers", {
        numbers: z.array(z.number()).describe("Array of numbers to find the sample standard deviation of")
    }, async ({ numbers }) => {
        const value = Statistics.standardDeviationSample(numbers)
        return {
            content: [{ type: "text", text: `${value}` }]
        }
    })

    mathServer.tool("standardDeviationPopulation", "Calculates the population standard deviation of an array of numbers", {
        numbers: z.array(z.number()).describe("Array of numbers to find the population standard deviation of")
    }, async ({ numbers }) => {
        const value = Statistics.standardDeviationPopulation(numbers)
        return {
            content: [{ type: "text", text: `${value}` }]
        }
    })

    mathServer.tool("quartiles", "Calculates the first, second (median), and third quartiles of a dataset", {
        numbers: z.array(z.number()).describe("Array of numbers to find the quartiles of")
    }, async ({ numbers }) => {
        const { q1, q2, q3 } = Statistics.quartiles(numbers)
        return {
            content: [{ type: "text", text: `Q1: ${q1}, Q2: ${q2}, Q3: ${q3}` }]
        }
    })

    mathServer.tool("percentile", "Calculates the value at a given percentile of a dataset using linear interpolation", {
        numbers: z.array(z.number()).describe("Array of numbers"),
        percentile: z.number().min(0).max(100).describe("The percentile to calculate (0-100)")
    }, async ({ numbers, percentile }) => {
        const value = Statistics.percentile(numbers, percentile)
        return {
            content: [{ type: "text", text: `${value}` }]
        }
    })

    mathServer.tool("range", "Calculates the range (max - min) of an array of numbers", {
        numbers: z.array(z.number()).describe("Array of numbers to find the range of")
    }, async ({ numbers }) => {
        const value = Statistics.range(numbers)
        return {
            content: [{ type: "text", text: `${value}` }]
        }
    })

    mathServer.tool("interquartileRange", "Calculates the interquartile range (Q3 - Q1) of a dataset", {
        numbers: z.array(z.number()).describe("Array of numbers to find the interquartile range of")
    }, async ({ numbers }) => {
        const value = Statistics.interquartileRange(numbers)
        return {
            content: [{ type: "text", text: `${value}` }]
        }
    })

    mathServer.tool("geometricMean", "Calculates the geometric mean of an array of positive numbers", {
        numbers: z.array(z.number()).describe("Array of positive numbers to find the geometric mean of")
    }, async ({ numbers }) => {
        const value = Statistics.geometricMean(numbers)
        return {
            content: [{ type: "text", text: `${value}` }]
        }
    })

    mathServer.tool("harmonicMean", "Calculates the harmonic mean of an array of non-zero numbers", {
        numbers: z.array(z.number()).describe("Array of non-zero numbers to find the harmonic mean of")
    }, async ({ numbers }) => {
        const value = Statistics.harmonicMean(numbers)
        return {
            content: [{ type: "text", text: `${value}` }]
        }
    })

    mathServer.tool("covariance", "Calculates the sample covariance between two arrays", {
        x: z.array(z.number()).describe("First array of values"),
        y: z.array(z.number()).describe("Second array of values")
    }, async ({ x, y }) => {
        const value = Statistics.covariance(x, y)
        return {
            content: [{ type: "text", text: `${value}` }]
        }
    })

    mathServer.tool("correlation", "Calculates the Pearson correlation coefficient between two arrays", {
        x: z.array(z.number()).describe("First array of values"),
        y: z.array(z.number()).describe("Second array of values")
    }, async ({ x, y }) => {
        const value = Statistics.correlation(x, y)
        return {
            content: [{ type: "text", text: `${value}` }]
        }
    })

    mathServer.tool("log", "Calculates the logarithm of a value with a given base", {
        base: z.number().describe("The base of the logarithm"),
        value: z.number().describe("The value to take the logarithm of")
    }, async ({ base, value }) => {
        const result = Algebra.log(base, value)
        return {
            content: [{ type: "text", text: `${result}` }]
        }
    })

    mathServer.tool("ln", "Calculates the natural logarithm (base e) of a value", {
        value: z.number().describe("The value to find the natural logarithm of")
    }, async ({ value }) => {
        const result = Algebra.ln(value)
        return {
            content: [{ type: "text", text: `${result}` }]
        }
    })

    mathServer.tool("log2", "Calculates the base-2 logarithm of a value", {
        value: z.number().describe("The value to find the base-2 logarithm of")
    }, async ({ value }) => {
        const result = Algebra.log2(value)
        return {
            content: [{ type: "text", text: `${result}` }]
        }
    })

    mathServer.tool("log10", "Calculates the base-10 logarithm of a value", {
        value: z.number().describe("The value to find the base-10 logarithm of")
    }, async ({ value }) => {
        const result = Algebra.log10(value)
        return {
            content: [{ type: "text", text: `${result}` }]
        }
    })

    mathServer.tool("exp", "Calculates e raised to a power (exponential function)", {
        value: z.number().describe("The exponent to raise e to")
    }, async ({ value }) => {
        const result = Algebra.exp(value)
        return {
            content: [{ type: "text", text: `${result}` }]
        }
    })

    mathServer.tool("permutations", "Calculates the number of ways to choose r items from n items where order matters: P(n,r) = n!/(n-r)!", {
        n: z.number().describe("Total number of items"),
        r: z.number().describe("Number of items to choose")
    }, async ({ n, r }) => {
        const result = Algebra.permutations(n, r)
        return {
            content: [{ type: "text", text: `${result}` }]
        }
    })

    mathServer.tool("combinations", "Calculates the number of ways to choose r items from n items where order does not matter: C(n,r) = n!/(r!(n-r)!)", {
        n: z.number().describe("Total number of items"),
        r: z.number().describe("Number of items to choose")
    }, async ({ n, r }) => {
        const result = Algebra.combinations(n, r)
        return {
            content: [{ type: "text", text: `${result}` }]
        }
    })

    mathServer.tool("gcd", "Calculates the greatest common divisor of two numbers", {
        a: z.number().describe("First number"),
        b: z.number().describe("Second number")
    }, async ({ a, b }) => {
        const result = NumberTheory.gcd(a, b)
        return {
            content: [{ type: "text", text: `${result}` }]
        }
    })

    mathServer.tool("lcm", "Calculates the least common multiple of two numbers", {
        a: z.number().describe("First number"),
        b: z.number().describe("Second number")
    }, async ({ a, b }) => {
        const result = NumberTheory.lcm(a, b)
        return {
            content: [{ type: "text", text: `${result}` }]
        }
    })

    mathServer.tool("isPrime", "Determines whether a number is prime", {
        number: z.number().describe("The number to check for primality")
    }, async ({ number }) => {
        const result = NumberTheory.isPrime(number)
        return {
            content: [{ type: "text", text: `${result}` }]
        }
    })

    mathServer.tool("primeFactors", "Calculates the prime factorization of a number", {
        number: z.number().describe("The number to factor")
    }, async ({ number }) => {
        const factors = NumberTheory.primeFactors(number)
        return {
            content: [{ type: "text", text: factors.join(', ') || 'None (number is 1 or less)' }]
        }
    })

    mathServer.tool("fibonacci", "Calculates the nth Fibonacci number (F(0)=0, F(1)=1)", {
        n: z.number().describe("The position in the Fibonacci sequence")
    }, async ({ n }) => {
        const result = NumberTheory.fibonacci(n)
        return {
            content: [{ type: "text", text: `${result}` }]
        }
    })

    mathServer.tool("isEven", "Determines whether a number is even", {
        number: z.number().describe("The number to check")
    }, async ({ number }) => {
        const result = NumberTheory.isEven(number)
        return {
            content: [{ type: "text", text: `${result}` }]
        }
    })

    mathServer.tool("isOdd", "Determines whether a number is odd", {
        number: z.number().describe("The number to check")
    }, async ({ number }) => {
        const result = NumberTheory.isOdd(number)
        return {
            content: [{ type: "text", text: `${result}` }]
        }
    })

    mathServer.tool("clamp", "Constrains a value to be within a specified range", {
        value: z.number().describe("The value to clamp"),
        min: z.number().describe("The lower bound"),
        max: z.number().describe("The upper bound")
    }, async ({ value, min, max }) => {
        const result = Utilities.clamp(value, min, max)
        return {
            content: [{ type: "text", text: `${result}` }]
        }
    })

    mathServer.tool("lerp", "Performs linear interpolation between two values", {
        a: z.number().describe("The start value"),
        b: z.number().describe("The end value"),
        t: z.number().describe("The interpolation factor (0 = a, 1 = b)")
    }, async ({ a, b, t }) => {
        const result = Utilities.lerp(a, b, t)
        return {
            content: [{ type: "text", text: `${result}` }]
        }
    })

    mathServer.tool("mapRange", "Maps a value from one range to another", {
        value: z.number().describe("The value to map"),
        inMin: z.number().describe("The lower bound of the input range"),
        inMax: z.number().describe("The upper bound of the input range"),
        outMin: z.number().describe("The lower bound of the output range"),
        outMax: z.number().describe("The upper bound of the output range")
    }, async ({ value, inMin, inMax, outMin, outMax }) => {
        const result = Utilities.mapRange(value, inMin, inMax, outMin, outMax)
        return {
            content: [{ type: "text", text: `${result}` }]
        }
    })

    mathServer.tool("percentageOf", "Calculates what percentage one number is of another", {
        part: z.number().describe("The part value"),
        whole: z.number().describe("The whole value")
    }, async ({ part, whole }) => {
        const result = Utilities.percentageOf(part, whole)
        return {
            content: [{ type: "text", text: `${result}%` }]
        }
    })

    mathServer.tool("percentageChange", "Calculates the percentage change from an old value to a new value", {
        oldValue: z.number().describe("The original value"),
        newValue: z.number().describe("The new value")
    }, async ({ oldValue, newValue }) => {
        const result = Utilities.percentageChange(oldValue, newValue)
        return {
            content: [{ type: "text", text: `${result}%` }]
        }
    })

    mathServer.tool("randomInt", "Generates a random integer between min and max (inclusive)", {
        min: z.number().describe("The minimum value (inclusive)"),
        max: z.number().describe("The maximum value (inclusive)")
    }, async ({ min, max }) => {
        const result = Utilities.randomInt(min, max)
        return {
            content: [{ type: "text", text: `${result}` }]
        }
    })

    mathServer.tool("randomFloat", "Generates a random floating-point number between min and max", {
        min: z.number().describe("The minimum value"),
        max: z.number().describe("The maximum value")
    }, async ({ min, max }) => {
        const result = Utilities.randomFloat(min, max)
        return {
            content: [{ type: "text", text: `${result}` }]
        }
    })

    mathServer.tool("modPow", "Calculates modular exponentiation: (base^exp) % mod", {
        base: z.number().describe("The base number"),
        exp: z.number().describe("The exponent"),
        mod: z.number().describe("The modulus")
    }, async ({ base, exp, mod }) => {
        const result = NumberTheory.modPow(base, exp, mod)
        return {
            content: [{ type: "text", text: `${result}` }]
        }
    })

    mathServer.tool("extendedGcd", "Calculates the extended GCD: ax + by = gcd(a,b)", {
        a: z.number().describe("First number"),
        b: z.number().describe("Second number")
    }, async ({ a, b }) => {
        const { gcd, x, y } = NumberTheory.extendedGcd(a, b)
        return {
            content: [{ type: "text", text: `gcd: ${gcd}, x: ${x}, y: ${y}` }]
        }
    })

    mathServer.tool("modInverse", "Calculates the modular multiplicative inverse of a modulo m", {
        a: z.number().describe("The number to find the inverse of"),
        m: z.number().describe("The modulus")
    }, async ({ a, m }) => {
        const result = NumberTheory.modInverse(a, m)
        return {
            content: [{ type: "text", text: `${result}` }]
        }
    })

    mathServer.tool("totient", "Calculates Euler's totient function φ(n)", {
        n: z.number().describe("The positive integer to compute φ(n) for")
    }, async ({ n }) => {
        const result = NumberTheory.totient(n)
        return {
            content: [{ type: "text", text: `${result}` }]
        }
    })

    mathServer.tool("isPerfectSquare", "Determines whether a number is a perfect square", {
        number: z.number().describe("The number to check")
    }, async ({ number }) => {
        const result = NumberTheory.isPerfectSquare(number)
        return {
            content: [{ type: "text", text: `${result}` }]
        }
    })

    mathServer.tool("digitalRoot", "Calculates the digital root (repeated digit sum) of a number", {
        number: z.number().describe("The number to find the digital root of")
    }, async ({ number }) => {
        const result = NumberTheory.digitalRoot(number)
        return {
            content: [{ type: "text", text: `${result}` }]
        }
    })

    mathServer.tool("collatz", "Generates the Collatz sequence starting from a positive integer", {
        number: z.number().describe("The starting positive integer")
    }, async ({ number }) => {
        const sequence = NumberTheory.collatz(number)
        return {
            content: [{ type: "text", text: sequence.join(', ') }]
        }
    })

    mathServer.tool("matrixMultiply", "Multiplies two matrices", {
        a: z.array(z.array(z.number())).describe("First matrix (2D array)"),
        b: z.array(z.array(z.number())).describe("Second matrix (2D array)")
    }, async ({ a, b }) => {
        const result = LinearAlgebra.matrixMultiply(a, b)
        return {
            content: [{ type: "text", text: JSON.stringify(result) }]
        }
    })

    mathServer.tool("determinant", "Calculates the determinant of a square matrix", {
        matrix: z.array(z.array(z.number())).describe("The square matrix to find the determinant of")
    }, async ({ matrix }) => {
        const result = LinearAlgebra.determinant(matrix)
        return {
            content: [{ type: "text", text: `${result}` }]
        }
    })

    mathServer.tool("transpose", "Calculates the transpose of a matrix", {
        matrix: z.array(z.array(z.number())).describe("The matrix to transpose")
    }, async ({ matrix }) => {
        const result = LinearAlgebra.transpose(matrix)
        return {
            content: [{ type: "text", text: JSON.stringify(result) }]
        }
    })

    mathServer.tool("dotProduct", "Calculates the dot product of two vectors", {
        a: z.array(z.number()).describe("First vector"),
        b: z.array(z.number()).describe("Second vector")
    }, async ({ a, b }) => {
        const result = LinearAlgebra.dotProduct(a, b)
        return {
            content: [{ type: "text", text: `${result}` }]
        }
    })

    mathServer.tool("crossProduct", "Calculates the cross product of two 3D vectors", {
        a: z.array(z.number()).describe("First 3D vector"),
        b: z.array(z.number()).describe("Second 3D vector")
    }, async ({ a, b }) => {
        const result = LinearAlgebra.crossProduct(a, b)
        return {
            content: [{ type: "text", text: result.join(', ') }]
        }
    })

    mathServer.tool("vectorMagnitude", "Calculates the magnitude (length) of a vector", {
        v: z.array(z.number()).describe("The vector")
    }, async ({ v }) => {
        const result = LinearAlgebra.vectorMagnitude(v)
        return {
            content: [{ type: "text", text: `${result}` }]
        }
    })

    mathServer.tool("vectorNormalize", "Normalizes a vector to unit length", {
        v: z.array(z.number()).describe("The vector to normalize")
    }, async ({ v }) => {
        const result = LinearAlgebra.vectorNormalize(v)
        return {
            content: [{ type: "text", text: result.join(', ') }]
        }
    })

    mathServer.tool("sinh", "Calculates the hyperbolic sine of a number", {
        number: z.number().describe("The number in radians to find the hyperbolic sine of")
    }, async ({ number }) => {
        const result = HyperbolicTrig.sinh(number)
        return {
            content: [{ type: "text", text: `${result}` }]
        }
    })

    mathServer.tool("cosh", "Calculates the hyperbolic cosine of a number", {
        number: z.number().describe("The number in radians to find the hyperbolic cosine of")
    }, async ({ number }) => {
        const result = HyperbolicTrig.cosh(number)
        return {
            content: [{ type: "text", text: `${result}` }]
        }
    })

    mathServer.tool("tanh", "Calculates the hyperbolic tangent of a number", {
        number: z.number().describe("The number in radians to find the hyperbolic tangent of")
    }, async ({ number }) => {
        const result = HyperbolicTrig.tanh(number)
        return {
            content: [{ type: "text", text: `${result}` }]
        }
    })

    mathServer.tool("asinh", "Calculates the inverse hyperbolic sine of a number", {
        number: z.number().describe("The number to find the inverse hyperbolic sine of")
    }, async ({ number }) => {
        const result = HyperbolicTrig.asinh(number)
        return {
            content: [{ type: "text", text: `${result}` }]
        }
    })

    mathServer.tool("acosh", "Calculates the inverse hyperbolic cosine of a number", {
        number: z.number().describe("The number to find the inverse hyperbolic cosine of")
    }, async ({ number }) => {
        const result = HyperbolicTrig.acosh(number)
        return {
            content: [{ type: "text", text: `${result}` }]
        }
    })

    mathServer.tool("atanh", "Calculates the inverse hyperbolic tangent of a number", {
        number: z.number().describe("The number to find the inverse hyperbolic tangent of")
    }, async ({ number }) => {
        const result = HyperbolicTrig.atanh(number)
        return {
            content: [{ type: "text", text: `${result}` }]
        }
    })

    mathServer.tool("haversine", "Calculates the great-circle distance between two points on Earth using the haversine formula", {
        lat1: z.number().describe("Latitude of first point in degrees"),
        lon1: z.number().describe("Longitude of first point in degrees"),
        lat2: z.number().describe("Latitude of second point in degrees"),
        lon2: z.number().describe("Longitude of second point in degrees")
    }, async ({ lat1, lon1, lat2, lon2 }) => {
        const result = Geometry.haversine(lat1, lon1, lat2, lon2)
        return {
            content: [{ type: "text", text: `${result} km` }]
        }
    })

    mathServer.tool("heronArea", "Calculates the area of a triangle using Heron's formula (3 sides)", {
        a: z.number().describe("First side length"),
        b: z.number().describe("Second side length"),
        c: z.number().describe("Third side length")
    }, async ({ a, b, c }) => {
        const result = Geometry.heronArea(a, b, c)
        return {
            content: [{ type: "text", text: `${result}` }]
        }
    })

    mathServer.tool("circleArea", "Calculates the area of a circle", {
        radius: z.number().describe("The radius of the circle")
    }, async ({ radius }) => {
        const result = Geometry.circleArea(radius)
        return {
            content: [{ type: "text", text: `${result}` }]
        }
    })

    mathServer.tool("sphereVolume", "Calculates the volume of a sphere", {
        radius: z.number().describe("The radius of the sphere")
    }, async ({ radius }) => {
        const result = Geometry.sphereVolume(radius)
        return {
            content: [{ type: "text", text: `${result}` }]
        }
    })

    mathServer.tool("compoundInterest", "Calculates compound interest: A = P(1 + r/n)^(nt)", {
        principal: z.number().describe("The initial principal amount"),
        rate: z.number().describe("The annual interest rate (as decimal, e.g. 0.05 for 5%)"),
        time: z.number().describe("The time the money is invested for in years"),
        n: z.number().describe("Number of times interest is compounded per year").default(1)
    }, async ({ principal, rate, time, n }) => {
        const result = Finance.compoundInterest(principal, rate, time, n)
        return {
            content: [{ type: "text", text: `${result}` }]
        }
    })

    mathServer.tool("presentValue", "Calculates the present value of a future sum: PV = FV/(1 + r/n)^(nt)", {
        futureValue: z.number().describe("The future value"),
        rate: z.number().describe("The annual interest rate (as decimal, e.g. 0.05 for 5%)"),
        time: z.number().describe("The number of years"),
        n: z.number().describe("Number of times interest is compounded per year").default(1)
    }, async ({ futureValue, rate, time, n }) => {
        const result = Finance.presentValue(futureValue, rate, time, n)
        return {
            content: [{ type: "text", text: `${result}` }]
        }
    })

    mathServer.tool("skewness", "Calculates the skewness of a dataset", {
        numbers: z.array(z.number()).describe("Array of numbers to find the skewness of")
    }, async ({ numbers }) => {
        const result = Statistics.skewness(numbers)
        return {
            content: [{ type: "text", text: `${result}` }]
        }
    })

    mathServer.tool("kurtosis", "Calculates the excess kurtosis of a dataset (normal distribution = 0)", {
        numbers: z.array(z.number()).describe("Array of numbers to find the kurtosis of")
    }, async ({ numbers }) => {
        const result = Statistics.kurtosis(numbers)
        return {
            content: [{ type: "text", text: `${result}` }]
        }
    })

    mathServer.tool("weightedMean", "Calculates the weighted mean of values with corresponding weights", {
        values: z.array(z.number()).describe("Array of values"),
        weights: z.array(z.number()).describe("Array of weights")
    }, async ({ values, weights }) => {
        const result = Statistics.weightedMean(values, weights)
        return {
            content: [{ type: "text", text: `${result}` }]
        }
    })

    mathServer.tool("zScore", "Calculates the z-score of a value relative to a dataset", {
        value: z.number().describe("The value to calculate the z-score for"),
        numbers: z.array(z.number()).describe("The reference dataset")
    }, async ({ value, numbers }) => {
        const result = Statistics.zScore(value, numbers)
        return {
            content: [{ type: "text", text: `${result}` }]
        }
    })

    mathServer.tool("movingAverage", "Calculates the simple moving average of a dataset", {
        numbers: z.array(z.number()).describe("Array of numbers"),
        window: z.number().describe("The window size")
    }, async ({ numbers, window }) => {
        const result = Statistics.movingAverage(numbers, window)
        return {
            content: [{ type: "text", text: result.join(', ') }]
        }
    })

    mathServer.tool("standardError", "Calculates the standard error of the mean", {
        numbers: z.array(z.number()).describe("Array of numbers to find the standard error of")
    }, async ({ numbers }) => {
        const result = Statistics.standardError(numbers)
        return {
            content: [{ type: "text", text: `${result}` }]
        }
    })

    mathServer.tool("sign", "Returns the sign of a number: 1 for positive, -1 for negative, 0 for zero", {
        number: z.number().describe("The number to find the sign of")
    }, async ({ number }) => {
        const result = Utilities.sign(number)
        return {
            content: [{ type: "text", text: `${result}` }]
        }
    })

    mathServer.tool("isBetween", "Checks if a number is within a specified range (inclusive)", {
        value: z.number().describe("The value to check"),
        lower: z.number().describe("The lower bound"),
        upper: z.number().describe("The upper bound")
    }, async ({ value, lower, upper }) => {
        const result = Utilities.isBetween(value, lower, upper)
        return {
            content: [{ type: "text", text: `${result}` }]
        }
    })

    mathServer.tool("baseConvert", "Converts a number from one base to another (2-36)", {
        value: z.string().describe("The value as a string in the source base"),
        fromBase: z.number().describe("The source base (2-36)"),
        toBase: z.number().describe("The target base (2-36)")
    }, async ({ value, fromBase, toBase }) => {
        const result = Utilities.baseConvert(value, fromBase, toBase)
        return {
            content: [{ type: "text", text: `${result}` }]
        }
    })

    mathServer.tool("fractionSimplify", "Simplifies a fraction to its lowest terms", {
        numerator: z.number().describe("The numerator"),
        denominator: z.number().describe("The denominator")
    }, async ({ numerator, denominator }) => {
        const { numerator: num, denominator: den } = Utilities.fractionSimplify(numerator, denominator)
        return {
            content: [{ type: "text", text: `${num}/${den}` }]
        }
    })

    return mathServer.server
}

async function main() {
    const server = createServer();

    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("MCP Server running in stdio mode");
}

main().catch((error) => {
    console.error("Server error:", error);
    process.exit(1);
});
