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

    function register<R>(
        name: string,
        description: string,
        schema: Record<string, z.ZodTypeAny>,
        handler: (args: Record<string, any>) => R,
        format?: (result: R, args: Record<string, any>) => string
    ) {
        mathServer.tool(name, description, schema, async (args: Record<string, unknown>, _extra: any) => {
            const result = handler(args)
            const text = format ? format(result, args) : `${result}`
            return { content: [{ type: "text" as const, text }] }
        })
    }

    // ======================== Arithmetic (15) ========================

    register("add", "Adds two numbers together", {
        firstNumber: z.number().describe("The first addend"),
        secondNumber: z.number().describe("The second addend")
    }, ({ firstNumber, secondNumber }) => Arithmetic.add(firstNumber, secondNumber))

    register("subtract", "Subtracts the second number from the first number", {
        minuend: z.number().describe("The number to subtract from (minuend)"),
        subtrahend: z.number().describe("The number being subtracted (subtrahend)")
    }, ({ minuend, subtrahend }) => Arithmetic.subtract(minuend, subtrahend))

    register("multiply", "Multiplies two numbers together", {
        firstNumber: z.number().describe("The first number"),
        secondNumber: z.number().describe("The second number")
    }, ({ firstNumber, secondNumber }) => Arithmetic.multiply(firstNumber, secondNumber))

    register("division", "Divides the first number by the second number", {
        numerator: z.number().describe("The number being divided (numerator)"),
        denominator: z.number().describe("The number to divide by (denominator)")
    }, ({ numerator, denominator }) => Arithmetic.division(numerator, denominator))

    register("sum", "Adds any number of numbers together", {
        numbers: z.array(z.number()).min(1).describe("Array of numbers to sum")
    }, ({ numbers }) => Arithmetic.sum(numbers))

    register("modulo", "Divides two numbers and returns the remainder", {
        numerator: z.number().describe("The number being divided (numerator)"),
        denominator: z.number().describe("The number to divide by (denominator)")
    }, ({ numerator, denominator }) => Arithmetic.modulo(numerator, denominator))

    register("floor", "Rounds a number down to the nearest integer", {
        number: z.number().describe("The number to round down"),
    }, ({ number }) => Arithmetic.floor(number))

    register("ceiling", "Rounds a number up to the nearest integer", {
        number: z.number().describe("The number to round up"),
    }, ({ number }) => Arithmetic.ceil(number))

    register("round", "Rounds a number to the nearest integer", {
        number: z.number().describe("The number to round"),
    }, ({ number }) => Arithmetic.round(number))

    register("power", "Raises a base number to an exponent", {
        base: z.number().describe("The base number"),
        exponent: z.number().describe("The exponent to raise the base to")
    }, ({ base, exponent }) => Arithmetic.power(base, exponent))

    register("sqrt", "Calculates the square root of a number", {
        number: z.number().describe("The number to find the square root of")
    }, ({ number }) => Arithmetic.sqrt(number))

    register("cbrt", "Calculates the cube root of a number", {
        number: z.number().describe("The number to find the cube root of")
    }, ({ number }) => Arithmetic.cbrt(number))

    register("root", "Calculates the nth root of a number", {
        number: z.number().describe("The number to find the root of"),
        n: z.number().describe("The degree of the root")
    }, ({ number, n }) => Arithmetic.root(number, n))

    register("abs", "Returns the absolute value of a number", {
        number: z.number().describe("The number to find the absolute value of")
    }, ({ number }) => Arithmetic.abs(number))

    register("factorial", "Calculates the factorial of a non-negative integer", {
        number: z.number().describe("The non-negative integer to calculate the factorial of")
    }, ({ number }) => Arithmetic.factorial(number))

    // ======================== Statistics (23) ========================

    register("mean", "Calculates the arithmetic mean of a list of numbers", {
        numbers: z.array(z.number()).min(1).describe("Array of numbers to find the mean of")
    }, ({ numbers }) => Statistics.mean(numbers))

    register("median", "Calculates the median of a list of numbers", {
        numbers: z.array(z.number()).min(1).describe("Array of numbers to find the median of")
    }, ({ numbers }) => Statistics.median(numbers))

    register("mode", "Finds the most common number in a list of numbers", {
        numbers: z.array(z.number()).describe("Array of numbers to find the mode of")
    }, ({ numbers }) => Statistics.mode(numbers),
    (r) => `Entries (${r.modeResult.join(', ')}) appeared ${r.maxFrequency} times`)

    register("min", "Finds the minimum value from a list of numbers", {
        numbers: z.array(z.number()).describe("Array of numbers to find the minimum of")
    }, ({ numbers }) => Statistics.min(numbers))

    register("max", "Finds the maximum value from a list of numbers", {
        numbers: z.array(z.number()).describe("Array of numbers to find the maximum of")
    }, ({ numbers }) => Statistics.max(numbers))

    register("varianceSample", "Calculates the sample variance of an array of numbers (divides by n-1)", {
        numbers: z.array(z.number()).describe("Array of numbers to find the sample variance of")
    }, ({ numbers }) => Statistics.varianceSample(numbers))

    register("variancePopulation", "Calculates the population variance of an array of numbers (divides by n)", {
        numbers: z.array(z.number()).describe("Array of numbers to find the population variance of")
    }, ({ numbers }) => Statistics.variancePopulation(numbers))

    register("standardDeviationSample", "Calculates the sample standard deviation of an array of numbers", {
        numbers: z.array(z.number()).describe("Array of numbers to find the sample standard deviation of")
    }, ({ numbers }) => Statistics.standardDeviationSample(numbers))

    register("standardDeviationPopulation", "Calculates the population standard deviation of an array of numbers", {
        numbers: z.array(z.number()).describe("Array of numbers to find the population standard deviation of")
    }, ({ numbers }) => Statistics.standardDeviationPopulation(numbers))

    register("quartiles", "Calculates the first, second (median), and third quartiles of a dataset", {
        numbers: z.array(z.number()).describe("Array of numbers to find the quartiles of")
    }, ({ numbers }) => Statistics.quartiles(numbers),
    (r) => `Q1: ${r.q1}, Q2: ${r.q2}, Q3: ${r.q3}`)

    register("percentile", "Calculates the value at a given percentile of a dataset using linear interpolation", {
        numbers: z.array(z.number()).describe("Array of numbers"),
        percentile: z.number().min(0).max(100).describe("The percentile to calculate (0-100)")
    }, ({ numbers, percentile }) => Statistics.percentile(numbers, percentile))

    register("range", "Calculates the range (max - min) of an array of numbers", {
        numbers: z.array(z.number()).describe("Array of numbers to find the range of")
    }, ({ numbers }) => Statistics.range(numbers))

    register("interquartileRange", "Calculates the interquartile range (Q3 - Q1) of a dataset", {
        numbers: z.array(z.number()).describe("Array of numbers to find the interquartile range of")
    }, ({ numbers }) => Statistics.interquartileRange(numbers))

    register("geometricMean", "Calculates the geometric mean of an array of positive numbers", {
        numbers: z.array(z.number()).describe("Array of positive numbers to find the geometric mean of")
    }, ({ numbers }) => Statistics.geometricMean(numbers))

    register("harmonicMean", "Calculates the harmonic mean of an array of non-zero numbers", {
        numbers: z.array(z.number()).describe("Array of non-zero numbers to find the harmonic mean of")
    }, ({ numbers }) => Statistics.harmonicMean(numbers))

    register("covariance", "Calculates the sample covariance between two arrays", {
        x: z.array(z.number()).describe("First array of values"),
        y: z.array(z.number()).describe("Second array of values")
    }, ({ x, y }) => Statistics.covariance(x, y))

    register("correlation", "Calculates the Pearson correlation coefficient between two arrays", {
        x: z.array(z.number()).describe("First array of values"),
        y: z.array(z.number()).describe("Second array of values")
    }, ({ x, y }) => Statistics.correlation(x, y))

    register("skewness", "Calculates the skewness of a dataset", {
        numbers: z.array(z.number()).describe("Array of numbers to find the skewness of")
    }, ({ numbers }) => Statistics.skewness(numbers))

    register("kurtosis", "Calculates the excess kurtosis of a dataset (normal distribution = 0)", {
        numbers: z.array(z.number()).describe("Array of numbers to find the kurtosis of")
    }, ({ numbers }) => Statistics.kurtosis(numbers))

    register("weightedMean", "Calculates the weighted mean of values with corresponding weights", {
        values: z.array(z.number()).describe("Array of values"),
        weights: z.array(z.number()).describe("Array of weights")
    }, ({ values, weights }) => Statistics.weightedMean(values, weights))

    register("zScore", "Calculates the z-score of a value relative to a dataset", {
        value: z.number().describe("The value to calculate the z-score for"),
        numbers: z.array(z.number()).describe("The reference dataset")
    }, ({ value, numbers }) => Statistics.zScore(value, numbers))

    register("movingAverage", "Calculates the simple moving average of a dataset", {
        numbers: z.array(z.number()).describe("Array of numbers"),
        window: z.number().describe("The window size")
    }, ({ numbers, window }) => Statistics.movingAverage(numbers, window),
    (r) => r.join(', '))

    register("standardError", "Calculates the standard error of the mean", {
        numbers: z.array(z.number()).describe("Array of numbers to find the standard error of")
    }, ({ numbers }) => Statistics.standardError(numbers))

    // ======================== Trigonometric (17) ========================

    register("sin", "Calculates the sine of a number in radians", {
        number: z.number().describe("The number in radians to find the sine of")
    }, ({ number }) => Trigonometric.sin(number))

    register("arcsin", "Calculates the arcsine (in radians) of a number", {
        number: z.number().describe("The number to find the arcsine of")
    }, ({ number }) => Trigonometric.arcsin(number))

    register("cos", "Calculates the cosine of a number in radians", {
        number: z.number().describe("The number in radians to find the cosine of")
    }, ({ number }) => Trigonometric.cos(number))

    register("arccos", "Calculates the arccosine (in radians) of a number", {
        number: z.number().describe("The number to find the arccosine of")
    }, ({ number }) => Trigonometric.arccos(number))

    register("tan", "Calculates the tangent of a number in radians", {
        number: z.number().describe("The number in radians to find the tangent of")
    }, ({ number }) => Trigonometric.tan(number))

    register("arctan", "Calculates the arctangent (in radians) of a number", {
        number: z.number().describe("The number to find the arctangent of")
    }, ({ number }) => Trigonometric.arctan(number))

    register("radiansToDegrees", "Converts a radian value to its equivalent in degrees", {
        number: z.number().describe("The number in radians to convert to degrees")
    }, ({ number }) => Trigonometric.radiansToDegrees(number))

    register("degreesToRadians", "Converts a degree value to its equivalent in radians", {
        number: z.number().describe("The number in degrees to convert to radians")
    }, ({ number }) => Trigonometric.degreesToRadians(number))

    register("csc", "Calculates the cosecant of a number in radians", {
        number: z.number().describe("The number in radians to find the cosecant of")
    }, ({ number }) => Trigonometric.csc(number))

    register("sec", "Calculates the secant of a number in radians", {
        number: z.number().describe("The number in radians to find the secant of")
    }, ({ number }) => Trigonometric.sec(number))

    register("cot", "Calculates the cotangent of a number in radians", {
        number: z.number().describe("The number in radians to find the cotangent of")
    }, ({ number }) => Trigonometric.cot(number))

    register("arctan2", "Calculates the arctangent of y/x in radians, using the signs to determine the correct quadrant", {
        y: z.number().describe("The y-coordinate"),
        x: z.number().describe("The x-coordinate")
    }, ({ y, x }) => Trigonometric.arctan2(y, x))

    register("hypot", "Calculates the hypotenuse (sqrt(a\u00b2 + b\u00b2))", {
        a: z.number().describe("First side length"),
        b: z.number().describe("Second side length")
    }, ({ a, b }) => Trigonometric.hypot(a, b))

    register("lawOfCosines", "Calculates the third side of a triangle using the law of cosines: c = sqrt(a\u00b2 + b\u00b2 - 2ab\u00b7cos(C))", {
        a: z.number().describe("First side length"),
        b: z.number().describe("Second side length"),
        angleC: z.number().describe("The angle between sides a and b in radians")
    }, ({ a, b, angleC }) => Trigonometric.lawOfCosines(a, b, angleC))

    register("polarToCartesian", "Converts polar coordinates (r, theta) to cartesian coordinates (x, y)", {
        r: z.number().describe("The radius (distance from origin)"),
        theta: z.number().describe("The angle in radians")
    }, ({ r, theta }) => Trigonometric.polarToCartesian(r, theta),
    (r) => `x: ${r.x}, y: ${r.y}`)

    register("cartesianToPolar", "Converts cartesian coordinates (x, y) to polar coordinates (r, theta)", {
        x: z.number().describe("The x-coordinate"),
        y: z.number().describe("The y-coordinate")
    }, ({ x, y }) => Trigonometric.cartesianToPolar(x, y),
    (r) => `r: ${r.r}, theta: ${r.theta}`)

    register("sinusoidalFunction", "Returns properties of a sinusoidal function f(x) = a\u00b7sin(k(x\u2212d)) + c: amplitude, period, phase shift, vertical shift, range", {
        a: z.number().describe("The amplitude factor (a)"),
        k: z.number().describe("The frequency/angular multiplier (k)"),
        d: z.number().describe("The phase shift (d) - horizontal shift in radians"),
        c: z.number().describe("The vertical shift / midline (c)")
    }, ({ a, k, d, c }) => Trigonometric.sinusoidalFunction(a, k, d, c),
    (r) => `Amplitude: ${r.amplitude}
Period: ${r.period} rad (${r.periodDegrees}\u00b0)
Phase shift: ${r.phaseShiftDescription}
Vertical shift: ${r.verticalShift}
Midline: ${r.midline}
Range: ${r.range}
Max: ${r.maxValue}, Min: ${r.minValue}`)

    // ======================== Algebra (11) ========================

    register("log", "Calculates the logarithm of a value with a given base", {
        base: z.number().describe("The base of the logarithm"),
        value: z.number().describe("The value to take the logarithm of")
    }, ({ base, value }) => Algebra.log(base, value))

    register("ln", "Calculates the natural logarithm (base e) of a value", {
        value: z.number().describe("The value to find the natural logarithm of")
    }, ({ value }) => Algebra.ln(value))

    register("log2", "Calculates the base-2 logarithm of a value", {
        value: z.number().describe("The value to find the base-2 logarithm of")
    }, ({ value }) => Algebra.log2(value))

    register("log10", "Calculates the base-10 logarithm of a value", {
        value: z.number().describe("The value to find the base-10 logarithm of")
    }, ({ value }) => Algebra.log10(value))

    register("exp", "Calculates e raised to a power (exponential function)", {
        value: z.number().describe("The exponent to raise e to")
    }, ({ value }) => Algebra.exp(value))

    register("permutations", "Calculates the number of ways to choose r items from n items where order matters: P(n,r) = n!/(n-r)!", {
        n: z.number().describe("Total number of items"),
        r: z.number().describe("Number of items to choose")
    }, ({ n, r }) => Algebra.permutations(n, r))

    register("combinations", "Calculates the number of ways to choose r items from n items where order does not matter: C(n,r) = n!/(r!(n-r)!)", {
        n: z.number().describe("Total number of items"),
        r: z.number().describe("Number of items to choose")
    }, ({ n, r }) => Algebra.combinations(n, r))

    register("quadratic", "Solves ax\u00b2 + bx + c = 0 using the quadratic formula, returning real or complex roots", {
        a: z.number().describe("The quadratic coefficient (a)"),
        b: z.number().describe("The linear coefficient (b)"),
        c: z.number().describe("The constant term (c)")
    }, ({ a, b, c }) => Algebra.quadratic(a, b, c),
    (r) => `Discriminant: ${r.discriminant}\nRoots: ${r.root1}, ${r.root2}`)

    register("arithmeticSequence", "Finds the nth term, sum of n terms, and full sequence of an arithmetic progression", {
        a1: z.number().describe("The first term"),
        d: z.number().describe("The common difference"),
        n: z.number().describe("The number of terms")
    }, ({ a1, d, n }) => Algebra.arithmeticSequence(a1, d, n),
    (r, args) => `Sequence: ${r.terms.join(', ')}\nnth term: ${r.nthTerm}\nSum of ${args.n} terms: ${r.sum}`)

    register("geometricSequence", "Finds the nth term, finite sum, infinite sum, and full sequence of a geometric progression", {
        a1: z.number().describe("The first term"),
        r: z.number().describe("The common ratio"),
        n: z.number().describe("The number of terms")
    }, ({ a1, r, n }) => Algebra.geometricSequence(a1, r, n),
    (r, args) => {
        let result = `Sequence: ${r.terms.join(', ')}\nnth term: ${r.nthTerm}\nSum of ${args.n} terms: ${r.sumFinite}`
        if (r.sumInfinite !== null) result += `\nInfinite sum: ${r.sumInfinite}`
        else result += `\nInfinite sum: Diverges (|r| \u2265 1)`
        return result
    })

    register("quadraticInequalities", "Solves ax\u00b2 + bx + c >/\u2265/</\u2264 0 and returns interval notation", {
        a: z.number().describe("The quadratic coefficient (a)"),
        b: z.number().describe("The linear coefficient (b)"),
        c: z.number().describe("The constant term (c)"),
        inequality: z.string().describe("The inequality operator: >, >=, <, <=")
    }, ({ a, b, c, inequality }) => Algebra.quadraticInequalities(a, b, c, inequality),
    (r) => `Discriminant: ${r.discriminant}\nRoots: ${r.roots}\nSolution: ${r.solution}`)

    // ======================== NumberTheory (14) ========================

    register("gcd", "Calculates the greatest common divisor of two numbers", {
        a: z.number().describe("First number"),
        b: z.number().describe("Second number")
    }, ({ a, b }) => NumberTheory.gcd(a, b))

    register("lcm", "Calculates the least common multiple of two numbers", {
        a: z.number().describe("First number"),
        b: z.number().describe("Second number")
    }, ({ a, b }) => NumberTheory.lcm(a, b))

    register("isPrime", "Determines whether a number is prime", {
        number: z.number().describe("The number to check for primality")
    }, ({ number }) => NumberTheory.isPrime(number))

    register("primeFactors", "Calculates the prime factorization of a number", {
        number: z.number().describe("The number to factor")
    }, ({ number }) => NumberTheory.primeFactors(number),
    (r) => r.join(', ') || 'None (number is 1 or less)')

    register("fibonacci", "Calculates the nth Fibonacci number (F(0)=0, F(1)=1)", {
        n: z.number().describe("The position in the Fibonacci sequence")
    }, ({ n }) => NumberTheory.fibonacci(n))

    register("isEven", "Determines whether a number is even", {
        number: z.number().describe("The number to check")
    }, ({ number }) => NumberTheory.isEven(number))

    register("isOdd", "Determines whether a number is odd", {
        number: z.number().describe("The number to check")
    }, ({ number }) => NumberTheory.isOdd(number))

    register("modPow", "Calculates modular exponentiation: (base^exp) % mod", {
        base: z.number().describe("The base number"),
        exp: z.number().describe("The exponent"),
        mod: z.number().describe("The modulus")
    }, ({ base, exp, mod }) => NumberTheory.modPow(base, exp, mod))

    register("extendedGcd", "Calculates the extended GCD: ax + by = gcd(a,b)", {
        a: z.number().describe("First number"),
        b: z.number().describe("Second number")
    }, ({ a, b }) => NumberTheory.extendedGcd(a, b),
    (r) => `gcd: ${r.gcd}, x: ${r.x}, y: ${r.y}`)

    register("modInverse", "Calculates the modular multiplicative inverse of a modulo m", {
        a: z.number().describe("The number to find the inverse of"),
        m: z.number().describe("The modulus")
    }, ({ a, m }) => NumberTheory.modInverse(a, m))

    register("totient", "Calculates Euler's totient function \u03c6(n)", {
        n: z.number().describe("The positive integer to compute \u03c6(n) for")
    }, ({ n }) => NumberTheory.totient(n))

    register("isPerfectSquare", "Determines whether a number is a perfect square", {
        number: z.number().describe("The number to check")
    }, ({ number }) => NumberTheory.isPerfectSquare(number))

    register("digitalRoot", "Calculates the digital root (repeated digit sum) of a number", {
        number: z.number().describe("The number to find the digital root of")
    }, ({ number }) => NumberTheory.digitalRoot(number))

    register("collatz", "Generates the Collatz sequence starting from a positive integer", {
        number: z.number().describe("The starting positive integer")
    }, ({ number }) => NumberTheory.collatz(number),
    (r) => r.join(', '))

    // ======================== Utilities (11) ========================

    register("clamp", "Constrains a value to be within a specified range", {
        value: z.number().describe("The value to clamp"),
        min: z.number().describe("The lower bound"),
        max: z.number().describe("The upper bound")
    }, ({ value, min, max }) => Utilities.clamp(value, min, max))

    register("lerp", "Performs linear interpolation between two values", {
        a: z.number().describe("The start value"),
        b: z.number().describe("The end value"),
        t: z.number().describe("The interpolation factor (0 = a, 1 = b)")
    }, ({ a, b, t }) => Utilities.lerp(a, b, t))

    register("mapRange", "Maps a value from one range to another", {
        value: z.number().describe("The value to map"),
        inMin: z.number().describe("The lower bound of the input range"),
        inMax: z.number().describe("The upper bound of the input range"),
        outMin: z.number().describe("The lower bound of the output range"),
        outMax: z.number().describe("The upper bound of the output range")
    }, ({ value, inMin, inMax, outMin, outMax }) => Utilities.mapRange(value, inMin, inMax, outMin, outMax))

    register("percentageOf", "Calculates what percentage one number is of another", {
        part: z.number().describe("The part value"),
        whole: z.number().describe("The whole value")
    }, ({ part, whole }) => Utilities.percentageOf(part, whole),
    (r) => `${r}%`)

    register("percentageChange", "Calculates the percentage change from an old value to a new value", {
        oldValue: z.number().describe("The original value"),
        newValue: z.number().describe("The new value")
    }, ({ oldValue, newValue }) => Utilities.percentageChange(oldValue, newValue),
    (r) => `${r}%`)

    register("randomInt", "Generates a random integer between min and max (inclusive)", {
        min: z.number().describe("The minimum value (inclusive)"),
        max: z.number().describe("The maximum value (inclusive)")
    }, ({ min, max }) => Utilities.randomInt(min, max))

    register("randomFloat", "Generates a random floating-point number between min and max", {
        min: z.number().describe("The minimum value"),
        max: z.number().describe("The maximum value")
    }, ({ min, max }) => Utilities.randomFloat(min, max))

    register("sign", "Returns the sign of a number: 1 for positive, -1 for negative, 0 for zero", {
        number: z.number().describe("The number to find the sign of")
    }, ({ number }) => Utilities.sign(number))

    register("isBetween", "Checks if a number is within a specified range (inclusive)", {
        value: z.number().describe("The value to check"),
        lower: z.number().describe("The lower bound"),
        upper: z.number().describe("The upper bound")
    }, ({ value, lower, upper }) => Utilities.isBetween(value, lower, upper))

    register("baseConvert", "Converts a number from one base to another (2-36)", {
        value: z.string().describe("The value as a string in the source base"),
        fromBase: z.number().describe("The source base (2-36)"),
        toBase: z.number().describe("The target base (2-36)")
    }, ({ value, fromBase, toBase }) => Utilities.baseConvert(value, fromBase, toBase))

    register("fractionSimplify", "Simplifies a fraction to its lowest terms", {
        numerator: z.number().describe("The numerator"),
        denominator: z.number().describe("The denominator")
    }, ({ numerator, denominator }) => Utilities.fractionSimplify(numerator, denominator),
    (r) => `${r.numerator}/${r.denominator}`)

    // ======================== LinearAlgebra (7) ========================

    register("matrixMultiply", "Multiplies two matrices", {
        a: z.array(z.array(z.number())).describe("First matrix (2D array)"),
        b: z.array(z.array(z.number())).describe("Second matrix (2D array)")
    }, ({ a, b }) => LinearAlgebra.matrixMultiply(a, b),
    (r) => JSON.stringify(r))

    register("determinant", "Calculates the determinant of a square matrix", {
        matrix: z.array(z.array(z.number())).describe("The square matrix to find the determinant of")
    }, ({ matrix }) => LinearAlgebra.determinant(matrix))

    register("transpose", "Calculates the transpose of a matrix", {
        matrix: z.array(z.array(z.number())).describe("The matrix to transpose")
    }, ({ matrix }) => LinearAlgebra.transpose(matrix),
    (r) => JSON.stringify(r))

    register("dotProduct", "Calculates the dot product of two vectors", {
        a: z.array(z.number()).describe("First vector"),
        b: z.array(z.number()).describe("Second vector")
    }, ({ a, b }) => LinearAlgebra.dotProduct(a, b))

    register("crossProduct", "Calculates the cross product of two 3D vectors", {
        a: z.array(z.number()).describe("First 3D vector"),
        b: z.array(z.number()).describe("Second 3D vector")
    }, ({ a, b }) => LinearAlgebra.crossProduct(a, b),
    (r) => r.join(', '))

    register("vectorMagnitude", "Calculates the magnitude (length) of a vector", {
        v: z.array(z.number()).describe("The vector")
    }, ({ v }) => LinearAlgebra.vectorMagnitude(v))

    register("vectorNormalize", "Normalizes a vector to unit length", {
        v: z.array(z.number()).describe("The vector to normalize")
    }, ({ v }) => LinearAlgebra.vectorNormalize(v),
    (r) => r.join(', '))

    // ======================== HyperbolicTrig (6) ========================

    register("sinh", "Calculates the hyperbolic sine of a number", {
        number: z.number().describe("The number in radians to find the hyperbolic sine of")
    }, ({ number }) => HyperbolicTrig.sinh(number))

    register("cosh", "Calculates the hyperbolic cosine of a number", {
        number: z.number().describe("The number in radians to find the hyperbolic cosine of")
    }, ({ number }) => HyperbolicTrig.cosh(number))

    register("tanh", "Calculates the hyperbolic tangent of a number", {
        number: z.number().describe("The number in radians to find the hyperbolic tangent of")
    }, ({ number }) => HyperbolicTrig.tanh(number))

    register("asinh", "Calculates the inverse hyperbolic sine of a number", {
        number: z.number().describe("The number to find the inverse hyperbolic sine of")
    }, ({ number }) => HyperbolicTrig.asinh(number))

    register("acosh", "Calculates the inverse hyperbolic cosine of a number", {
        number: z.number().describe("The number to find the inverse hyperbolic cosine of")
    }, ({ number }) => HyperbolicTrig.acosh(number))

    register("atanh", "Calculates the inverse hyperbolic tangent of a number", {
        number: z.number().describe("The number to find the inverse hyperbolic tangent of")
    }, ({ number }) => HyperbolicTrig.atanh(number))

    // ======================== Geometry (5) ========================

    register("haversine", "Calculates the great-circle distance between two points on Earth using the haversine formula", {
        lat1: z.number().describe("Latitude of first point in degrees"),
        lon1: z.number().describe("Longitude of first point in degrees"),
        lat2: z.number().describe("Latitude of second point in degrees"),
        lon2: z.number().describe("Longitude of second point in degrees")
    }, ({ lat1, lon1, lat2, lon2 }) => Geometry.haversine(lat1, lon1, lat2, lon2),
    (r) => `${r} km`)

    register("heronArea", "Calculates the area of a triangle using Heron's formula (3 sides)", {
        a: z.number().describe("First side length"),
        b: z.number().describe("Second side length"),
        c: z.number().describe("Third side length")
    }, ({ a, b, c }) => Geometry.heronArea(a, b, c))

    register("circleArea", "Calculates the area of a circle", {
        radius: z.number().describe("The radius of the circle")
    }, ({ radius }) => Geometry.circleArea(radius))

    register("sphereVolume", "Calculates the volume of a sphere", {
        radius: z.number().describe("The radius of the sphere")
    }, ({ radius }) => Geometry.sphereVolume(radius))

    register("lawOfSines", "Solves triangles using the law of sines. Provide 3 values (at least one side). Handles ASA, AAS, and SSA ambiguous case.", {
        a: z.number().optional().describe("Side a (opposite angle A)"),
        b: z.number().optional().describe("Side b (opposite angle B)"),
        c: z.number().optional().describe("Side c (opposite angle C)"),
        A: z.number().optional().describe("Angle A in degrees (opposite side a)"),
        B: z.number().optional().describe("Angle B in degrees (opposite side b)"),
        C: z.number().optional().describe("Angle C in degrees (opposite side c)")
    }, ({ a, b, c, A, B, C }) => Geometry.lawOfSines(a, b, c, A, B, C),
    (r) => {
        let output = `Description: ${r.description}\n`
        if (r.solutionCount > 0 && r.solution1) {
            const s1 = r.solution1
            output += `Solution 1: a=${s1.a}, b=${s1.b}, c=${s1.c}, A=${s1.A}\u00b0, B=${s1.B}\u00b0, C=${s1.C}\u00b0`
        }
        if (r.solution2) {
            const s2 = r.solution2
            output += `\nSolution 2: a=${s2.a}, b=${s2.b}, c=${s2.c}, A=${s2.A}\u00b0, B=${s2.B}\u00b0, C=${s2.C}\u00b0`
        }
        return output
    })

    // ======================== Finance (2) ========================

    register("compoundInterest", "Calculates compound interest: A = P(1 + r/n)^(nt)", {
        principal: z.number().describe("The initial principal amount"),
        rate: z.number().describe("The annual interest rate (as decimal, e.g. 0.05 for 5%)"),
        time: z.number().describe("The time the money is invested for in years"),
        n: z.number().describe("Number of times interest is compounded per year").default(1)
    }, ({ principal, rate, time, n }) => Finance.compoundInterest(principal, rate, time, n))

    register("presentValue", "Calculates the present value of a future sum: PV = FV/(1 + r/n)^(nt)", {
        futureValue: z.number().describe("The future value"),
        rate: z.number().describe("The annual interest rate (as decimal, e.g. 0.05 for 5%)"),
        time: z.number().describe("The number of years"),
        n: z.number().describe("Number of times interest is compounded per year").default(1)
    }, ({ futureValue, rate, time, n }) => Finance.presentValue(futureValue, rate, time, n))

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
