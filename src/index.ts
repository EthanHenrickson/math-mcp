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

    register("add", "Add numbers", {
        firstNumber: z.number().describe("First addend"),
        secondNumber: z.number().describe("Second addend")
    }, ({ firstNumber, secondNumber }) => Arithmetic.add(firstNumber, secondNumber))

    register("subtract", "Subtract numbers", {
        minuend: z.number().describe("Number to subtract from"),
        subtrahend: z.number().describe("Number to subtract")
    }, ({ minuend, subtrahend }) => Arithmetic.subtract(minuend, subtrahend))

    register("multiply", "Multiply numbers", {
        firstNumber: z.number().describe("First factor"),
        secondNumber: z.number().describe("Second factor")
    }, ({ firstNumber, secondNumber }) => Arithmetic.multiply(firstNumber, secondNumber))

    register("division", "Divide numbers", {
        numerator: z.number().describe("Numerator"),
        denominator: z.number().describe("Denominator")
    }, ({ numerator, denominator }) => Arithmetic.division(numerator, denominator))

    register("sum", "Sum array of numbers", {
        numbers: z.array(z.number()).min(1).describe("Numbers to sum")
    }, ({ numbers }) => Arithmetic.sum(numbers))

    register("modulo", "Modulo remainder", {
        numerator: z.number().describe("Numerator"),
        denominator: z.number().describe("Denominator")
    }, ({ numerator, denominator }) => Arithmetic.modulo(numerator, denominator))

    register("floor", "Round down", {
        number: z.number().describe("Number to floor"),
    }, ({ number }) => Arithmetic.floor(number))

    register("ceiling", "Round up", {
        number: z.number().describe("Number to ceil"),
    }, ({ number }) => Arithmetic.ceil(number))

    register("round", "Round to integer", {
        number: z.number().describe("Number to round"),
    }, ({ number }) => Arithmetic.round(number))

    register("power", "Exponentiation", {
        base: z.number().describe("Base number"),
        exponent: z.number().describe("Exponent")
    }, ({ base, exponent }) => Arithmetic.power(base, exponent))

    register("sqrt", "Square root", {
        number: z.number().describe("Input number")
    }, ({ number }) => Arithmetic.sqrt(number))

    register("cbrt", "Cube root", {
        number: z.number().describe("Input number")
    }, ({ number }) => Arithmetic.cbrt(number))

    register("root", "Nth root", {
        number: z.number().describe("Input number"),
        n: z.number().describe("Root degree")
    }, ({ number, n }) => Arithmetic.root(number, n))

    register("abs", "Absolute value", {
        number: z.number().describe("Input number")
    }, ({ number }) => Arithmetic.abs(number))

    register("factorial", "Factorial", {
        number: z.number().describe("Non-negative integer")
    }, ({ number }) => Arithmetic.factorial(number))

    // ======================== Statistics (23) ========================

    register("mean", "Arithmetic mean", {
        numbers: z.array(z.number()).min(1).describe("Input array")
    }, ({ numbers }) => Statistics.mean(numbers))

    register("median", "Median value", {
        numbers: z.array(z.number()).min(1).describe("Input array")
    }, ({ numbers }) => Statistics.median(numbers))

    register("mode", "Most common value", {
        numbers: z.array(z.number()).describe("Input array")
    }, ({ numbers }) => Statistics.mode(numbers),
    (r) => `Entries (${r.modes.join(', ')}) appeared ${r.maxFrequency} times`)

    register("min", "Minimum value", {
        numbers: z.array(z.number()).describe("Input array")
    }, ({ numbers }) => Statistics.min(numbers))

    register("max", "Maximum value", {
        numbers: z.array(z.number()).describe("Input array")
    }, ({ numbers }) => Statistics.max(numbers))

    register("varianceSample", "Sample variance", {
        numbers: z.array(z.number()).describe("Input array")
    }, ({ numbers }) => Statistics.varianceSample(numbers))

    register("variancePopulation", "Population variance", {
        numbers: z.array(z.number()).describe("Input array")
    }, ({ numbers }) => Statistics.variancePopulation(numbers))

    register("standardDeviationSample", "Sample std dev", {
        numbers: z.array(z.number()).describe("Input array")
    }, ({ numbers }) => Statistics.standardDeviationSample(numbers))

    register("standardDeviationPopulation", "Population std dev", {
        numbers: z.array(z.number()).describe("Input array")
    }, ({ numbers }) => Statistics.standardDeviationPopulation(numbers))

    register("quartiles", "Q1, Q2, Q3", {
        numbers: z.array(z.number()).describe("Input array")
    }, ({ numbers }) => Statistics.quartiles(numbers),
    (r) => `Q1: ${r.q1}, Q2: ${r.q2}, Q3: ${r.q3}`)

    register("percentile", "Percentile value", {
        numbers: z.array(z.number()).describe("Input array"),
        percentile: z.number().min(0).max(100).describe("Percentile 0-100")
    }, ({ numbers, percentile }) => Statistics.percentile(numbers, percentile))

    register("range", "Max minus min", {
        numbers: z.array(z.number()).describe("Input array")
    }, ({ numbers }) => Statistics.range(numbers))

    register("interquartileRange", "IQR (Q3-Q1)", {
        numbers: z.array(z.number()).describe("Input array")
    }, ({ numbers }) => Statistics.interquartileRange(numbers))

    register("geometricMean", "Geometric mean", {
        numbers: z.array(z.number()).describe("Positive numbers")
    }, ({ numbers }) => Statistics.geometricMean(numbers))

    register("harmonicMean", "Harmonic mean", {
        numbers: z.array(z.number()).describe("Non-zero numbers")
    }, ({ numbers }) => Statistics.harmonicMean(numbers))

    register("covariance", "Sample covariance", {
        x: z.array(z.number()).describe("First array"),
        y: z.array(z.number()).describe("Second array")
    }, ({ x, y }) => Statistics.covariance(x, y))

    register("correlation", "Pearson correlation", {
        x: z.array(z.number()).describe("First array"),
        y: z.array(z.number()).describe("Second array")
    }, ({ x, y }) => Statistics.correlation(x, y))

    register("skewness", "Distribution skewness", {
        numbers: z.array(z.number()).describe("Input array")
    }, ({ numbers }) => Statistics.skewness(numbers))

    register("kurtosis", "Excess kurtosis", {
        numbers: z.array(z.number()).describe("Input array")
    }, ({ numbers }) => Statistics.kurtosis(numbers))

    register("weightedMean", "Weighted mean", {
        values: z.array(z.number()).describe("Values"),
        weights: z.array(z.number()).describe("Weights")
    }, ({ values, weights }) => Statistics.weightedMean(values, weights))

    register("zScore", "Z-score", {
        value: z.number().describe("Value to test"),
        numbers: z.array(z.number()).describe("Reference dataset")
    }, ({ value, numbers }) => Statistics.zScore(value, numbers))

    register("movingAverage", "Moving average", {
        numbers: z.array(z.number()).describe("Data array"),
        window: z.number().describe("Window size")
    }, ({ numbers, window }) => Statistics.movingAverage(numbers, window),
    (r) => r.join(', '))

    register("standardError", "Standard error", {
        numbers: z.array(z.number()).describe("Input array")
    }, ({ numbers }) => Statistics.standardError(numbers))

    // ======================== Trigonometric (17) ========================

    register("sin", "Sine (radians)", {
        number: z.number().describe("Angle in radians")
    }, ({ number }) => Trigonometric.sin(number))

    register("arcsin", "Arc sine", {
        number: z.number().describe("Input value")
    }, ({ number }) => Trigonometric.arcsin(number))

    register("cos", "Cosine (radians)", {
        number: z.number().describe("Angle in radians")
    }, ({ number }) => Trigonometric.cos(number))

    register("arccos", "Arc cosine", {
        number: z.number().describe("Input value")
    }, ({ number }) => Trigonometric.arccos(number))

    register("tan", "Tangent (radians)", {
        number: z.number().describe("Angle in radians")
    }, ({ number }) => Trigonometric.tan(number))

    register("arctan", "Arc tangent", {
        number: z.number().describe("Input value")
    }, ({ number }) => Trigonometric.arctan(number))

    register("radiansToDegrees", "Rad to deg", {
        number: z.number().describe("Radians")
    }, ({ number }) => Trigonometric.radiansToDegrees(number))

    register("degreesToRadians", "Deg to rad", {
        number: z.number().describe("Degrees")
    }, ({ number }) => Trigonometric.degreesToRadians(number))

    register("csc", "Cosecant (radians)", {
        number: z.number().describe("Angle in radians")
    }, ({ number }) => Trigonometric.csc(number))

    register("sec", "Secant (radians)", {
        number: z.number().describe("Angle in radians")
    }, ({ number }) => Trigonometric.sec(number))

    register("cot", "Cotangent (radians)", {
        number: z.number().describe("Angle in radians")
    }, ({ number }) => Trigonometric.cot(number))

    register("arctan2", "Arctan2(y,x)", {
        y: z.number().describe("Y coordinate"),
        x: z.number().describe("X coordinate")
    }, ({ y, x }) => Trigonometric.arctan2(y, x))

    register("hypot", "Hypotenuse", {
        a: z.number().describe("Side A"),
        b: z.number().describe("Side B")
    }, ({ a, b }) => Trigonometric.hypot(a, b))

    register("lawOfCosines", "Law of cosines", {
        a: z.number().describe("Side A"),
        b: z.number().describe("Side B"),
        angleC: z.number().describe("Angle C (radians)")
    }, ({ a, b, angleC }) => Trigonometric.lawOfCosines(a, b, angleC))

    register("polarToCartesian", "Polar to cartesian", {
        r: z.number().describe("Radius"),
        theta: z.number().describe("Angle (radians)")
    }, ({ r, theta }) => Trigonometric.polarToCartesian(r, theta),
    (r) => `x: ${r.x}, y: ${r.y}`)

    register("cartesianToPolar", "Cartesian to polar", {
        x: z.number().describe("X coordinate"),
        y: z.number().describe("Y coordinate")
    }, ({ x, y }) => Trigonometric.cartesianToPolar(x, y),
    (r) => `r: ${r.r}, theta: ${r.theta}`)

    register("sinusoidalFunction", "Sine wave properties", {
        a: z.number().describe("Amplitude factor"),
        k: z.number().describe("Angular multiplier"),
        d: z.number().describe("Phase shift (radians)"),
        c: z.number().describe("Vertical shift")
    }, ({ a, k, d, c }) => Trigonometric.sinusoidalFunction(a, k, d, c),
    (r) => `Amplitude: ${r.amplitude}
Period: ${r.period} rad (${r.periodDegrees}\u00b0)
Phase shift: ${r.phaseShiftDescription}
Vertical shift: ${r.verticalShift}
Midline: ${r.midline}
Range: ${r.range}
Max: ${r.maxValue}, Min: ${r.minValue}`)

    // ======================== Algebra (11) ========================

    register("log", "Logarithm (any base)", {
        base: z.number().describe("Log base"),
        value: z.number().describe("Input value")
    }, ({ base, value }) => Algebra.log(base, value))

    register("ln", "Natural log", {
        value: z.number().describe("Input value")
    }, ({ value }) => Algebra.ln(value))

    register("log2", "Base-2 log", {
        value: z.number().describe("Input value")
    }, ({ value }) => Algebra.log2(value))

    register("log10", "Base-10 log", {
        value: z.number().describe("Input value")
    }, ({ value }) => Algebra.log10(value))

    register("exp", "e^x", {
        value: z.number().describe("Exponent")
    }, ({ value }) => Algebra.exp(value))

    register("permutations", "Permutations P(n,r)", {
        n: z.number().describe("Total items"),
        r: z.number().describe("Items to choose")
    }, ({ n, r }) => Algebra.permutations(n, r))

    register("combinations", "Combinations C(n,r)", {
        n: z.number().describe("Total items"),
        r: z.number().describe("Items to choose")
    }, ({ n, r }) => Algebra.combinations(n, r))

    register("quadratic", "Solve ax^2+bx+c=0", {
        a: z.number().describe("Quadratic coeff"),
        b: z.number().describe("Linear coeff"),
        c: z.number().describe("Constant")
    }, ({ a, b, c }) => Algebra.quadratic(a, b, c),
    (r) => `Discriminant: ${r.discriminant}\nRoots: ${r.root1}, ${r.root2}`)

    register("arithmeticSequence", "Arithmetic progression", {
        a1: z.number().describe("First term"),
        d: z.number().describe("Common diff"),
        n: z.number().describe("Term count")
    }, ({ a1, d, n }) => Algebra.arithmeticSequence(a1, d, n),
    (r, args) => `Sequence: ${r.terms.join(', ')}\nnth term: ${r.nthTerm}\nSum of ${args.n} terms: ${r.sum}`)

    register("geometricSequence", "Geometric progression", {
        a1: z.number().describe("First term"),
        r: z.number().describe("Common ratio"),
        n: z.number().describe("Term count")
    }, ({ a1, r, n }) => Algebra.geometricSequence(a1, r, n),
    (r, args) => {
        let result = `Sequence: ${r.terms.join(', ')}\nnth term: ${r.nthTerm}\nSum of ${args.n} terms: ${r.sumFinite}`
        if (r.sumInfinite !== null) result += `\nInfinite sum: ${r.sumInfinite}`
        else result += `\nInfinite sum: Diverges (|r| \u2265 1)`
        return result
    })

    register("quadraticInequalities", "Quadratic inequalities", {
        a: z.number().describe("Quadratic coeff"),
        b: z.number().describe("Linear coeff"),
        c: z.number().describe("Constant"),
        inequality: z.enum([">", ">=", "<", "<="]).describe("Inequality op")
    }, ({ a, b, c, inequality }) => Algebra.quadraticInequalities(a, b, c, inequality),
    (r) => `Discriminant: ${r.discriminant}\nRoots: ${r.roots}\nSolution: ${r.solution}`)

    // ======================== NumberTheory (14) ========================

    register("gcd", "Greatest common divisor", {
        a: z.number().describe("First number"),
        b: z.number().describe("Second number")
    }, ({ a, b }) => NumberTheory.gcd(a, b))

    register("lcm", "Least common multiple", {
        a: z.number().describe("First number"),
        b: z.number().describe("Second number")
    }, ({ a, b }) => NumberTheory.lcm(a, b))

    register("isPrime", "Primality test", {
        number: z.number().describe("Number to test")
    }, ({ number }) => NumberTheory.isPrime(number))

    register("primeFactors", "Prime factorization", {
        number: z.number().describe("Number to factor")
    }, ({ number }) => NumberTheory.primeFactors(number),
    (r) => r.join(', ') || 'None (number is 1 or less)')

    register("fibonacci", "Nth Fibonacci", {
        n: z.number().describe("Position in sequence")
    }, ({ n }) => NumberTheory.fibonacci(n))

    register("isEven", "Even check", {
        number: z.number().describe("Number to check")
    }, ({ number }) => NumberTheory.isEven(number))

    register("isOdd", "Odd check", {
        number: z.number().describe("Number to check")
    }, ({ number }) => NumberTheory.isOdd(number))

    register("modPow", "Modular exponentiation", {
        base: z.number().describe("Base"),
        exp: z.number().describe("Exponent"),
        mod: z.number().describe("Modulus")
    }, ({ base, exp, mod }) => NumberTheory.modPow(base, exp, mod))

    register("extendedGcd", "Extended GCD", {
        a: z.number().describe("First number"),
        b: z.number().describe("Second number")
    }, ({ a, b }) => NumberTheory.extendedGcd(a, b),
    (r) => `gcd: ${r.gcd}, x: ${r.x}, y: ${r.y}`)

    register("modInverse", "Modular inverse", {
        a: z.number().describe("Number"),
        m: z.number().describe("Modulus")
    }, ({ a, m }) => NumberTheory.modInverse(a, m))

    register("totient", "Euler totient", {
        n: z.number().describe("Positive integer")
    }, ({ n }) => NumberTheory.totient(n))

    register("isPerfectSquare", "Perfect square test", {
        number: z.number().describe("Number to test")
    }, ({ number }) => NumberTheory.isPerfectSquare(number))

    register("digitalRoot", "Digital root", {
        number: z.number().describe("Input number")
    }, ({ number }) => NumberTheory.digitalRoot(number))

    register("collatz", "Collatz sequence", {
        number: z.number().describe("Starting integer")
    }, ({ number }) => NumberTheory.collatz(number),
    (r) => r.join(', '))

    // ======================== Utilities (11) ========================

    register("clamp", "Clamp to range", {
        value: z.number().describe("Value to clamp"),
        min: z.number().describe("Lower bound"),
        max: z.number().describe("Upper bound")
    }, ({ value, min, max }) => Utilities.clamp(value, min, max))

    register("lerp", "Linear interpolation", {
        a: z.number().describe("Start value"),
        b: z.number().describe("End value"),
        t: z.number().describe("Interpolation factor")
    }, ({ a, b, t }) => Utilities.lerp(a, b, t))

    register("mapRange", "Map between ranges", {
        value: z.number().describe("Value to map"),
        inMin: z.number().describe("Input lower bound"),
        inMax: z.number().describe("Input upper bound"),
        outMin: z.number().describe("Output lower bound"),
        outMax: z.number().describe("Output upper bound")
    }, ({ value, inMin, inMax, outMin, outMax }) => Utilities.mapRange(value, inMin, inMax, outMin, outMax))

    register("percentageOf", "Part as % of whole", {
        part: z.number().describe("Part value"),
        whole: z.number().describe("Whole value")
    }, ({ part, whole }) => Utilities.percentageOf(part, whole),
    (r) => `${r}%`)

    register("percentageChange", "% change", {
        oldValue: z.number().describe("Original value"),
        newValue: z.number().describe("New value")
    }, ({ oldValue, newValue }) => Utilities.percentageChange(oldValue, newValue),
    (r) => `${r}%`)

    register("randomInt", "Random integer", {
        min: z.number().describe("Minimum inclusive"),
        max: z.number().describe("Maximum inclusive")
    }, ({ min, max }) => Utilities.randomInt(min, max))

    register("randomFloat", "Random float", {
        min: z.number().describe("Minimum"),
        max: z.number().describe("Maximum")
    }, ({ min, max }) => Utilities.randomFloat(min, max))

    register("sign", "Sign (-1,0,1)", {
        number: z.number().describe("Input number")
    }, ({ number }) => Utilities.sign(number))

    register("isBetween", "In range check", {
        value: z.number().describe("Value to test"),
        lower: z.number().describe("Lower bound"),
        upper: z.number().describe("Upper bound")
    }, ({ value, lower, upper }) => Utilities.isBetween(value, lower, upper))

    register("baseConvert", "Base conversion", {
        value: z.string().describe("Value in source base"),
        fromBase: z.number().describe("Source base (2-36)"),
        toBase: z.number().describe("Target base (2-36)")
    }, ({ value, fromBase, toBase }) => Utilities.baseConvert(value, fromBase, toBase))

    register("fractionSimplify", "Simplify fraction", {
        numerator: z.number().describe("Numerator"),
        denominator: z.number().describe("Denominator")
    }, ({ numerator, denominator }) => Utilities.fractionSimplify(numerator, denominator),
    (r) => `${r.numerator}/${r.denominator}`)

    // ======================== LinearAlgebra (7) ========================

    register("matrixMultiply", "Matrix multiply", {
        a: z.array(z.array(z.number())).describe("First matrix"),
        b: z.array(z.array(z.number())).describe("Second matrix")
    }, ({ a, b }) => LinearAlgebra.matrixMultiply(a, b),
    (r) => JSON.stringify(r))

    register("determinant", "Matrix determinant", {
        matrix: z.array(z.array(z.number())).describe("Square matrix")
    }, ({ matrix }) => LinearAlgebra.determinant(matrix))

    register("transpose", "Matrix transpose", {
        matrix: z.array(z.array(z.number())).describe("Matrix to transpose")
    }, ({ matrix }) => LinearAlgebra.transpose(matrix),
    (r) => JSON.stringify(r))

    register("dotProduct", "Vector dot product", {
        a: z.array(z.number()).describe("First vector"),
        b: z.array(z.number()).describe("Second vector")
    }, ({ a, b }) => LinearAlgebra.dotProduct(a, b))

    register("crossProduct", "3D cross product", {
        a: z.array(z.number()).describe("First 3D vector"),
        b: z.array(z.number()).describe("Second 3D vector")
    }, ({ a, b }) => LinearAlgebra.crossProduct(a, b),
    (r) => r.join(', '))

    register("vectorMagnitude", "Vector length", {
        v: z.array(z.number()).describe("Input vector")
    }, ({ v }) => LinearAlgebra.vectorMagnitude(v))

    register("vectorNormalize", "Normalize vector", {
        v: z.array(z.number()).describe("Vector to normalize")
    }, ({ v }) => LinearAlgebra.vectorNormalize(v),
    (r) => r.join(', '))

    // ======================== HyperbolicTrig (6) ========================

    register("sinh", "Hyperbolic sine", {
        number: z.number().describe("Radians")
    }, ({ number }) => HyperbolicTrig.sinh(number))

    register("cosh", "Hyperbolic cosine", {
        number: z.number().describe("Radians")
    }, ({ number }) => HyperbolicTrig.cosh(number))

    register("tanh", "Hyperbolic tangent", {
        number: z.number().describe("Radians")
    }, ({ number }) => HyperbolicTrig.tanh(number))

    register("asinh", "Inv hyperbolic sine", {
        number: z.number().describe("Input value")
    }, ({ number }) => HyperbolicTrig.asinh(number))

    register("acosh", "Inv hyperbolic cosine", {
        number: z.number().describe("Input value")
    }, ({ number }) => HyperbolicTrig.acosh(number))

    register("atanh", "Inv hyperbolic tangent", {
        number: z.number().describe("Input value")
    }, ({ number }) => HyperbolicTrig.atanh(number))

    // ======================== Geometry (5) ========================

    register("haversine", "Earth distance (km)", {
        lat1: z.number().describe("Latitude point 1"),
        lon1: z.number().describe("Longitude point 1"),
        lat2: z.number().describe("Latitude point 2"),
        lon2: z.number().describe("Longitude point 2")
    }, ({ lat1, lon1, lat2, lon2 }) => Geometry.haversine(lat1, lon1, lat2, lon2),
    (r) => `${r} km`)

    register("heronArea", "Triangle area (3 sides)", {
        a: z.number().describe("Side A"),
        b: z.number().describe("Side B"),
        c: z.number().describe("Side C")
    }, ({ a, b, c }) => Geometry.heronArea(a, b, c))

    register("circleArea", "Circle area", {
        radius: z.number().describe("Circle radius")
    }, ({ radius }) => Geometry.circleArea(radius))

    register("sphereVolume", "Sphere volume", {
        radius: z.number().describe("Sphere radius")
    }, ({ radius }) => Geometry.sphereVolume(radius))

    register("lawOfSines", "Law of sines", {
        a: z.number().optional().describe("Side a"),
        b: z.number().optional().describe("Side b"),
        c: z.number().optional().describe("Side c"),
        A: z.number().optional().describe("Angle A (deg)"),
        B: z.number().optional().describe("Angle B (deg)"),
        C: z.number().optional().describe("Angle C (deg)")
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

    register("compoundInterest", "Compound interest", {
        principal: z.number().describe("Principal"),
        rate: z.number().describe("Rate (decimal)"),
        time: z.number().describe("Years"),
        n: z.number().describe("Compounds/year").default(1)
    }, ({ principal, rate, time, n }) => Finance.compoundInterest(principal, rate, time, n))

    register("presentValue", "Present value", {
        futureValue: z.number().describe("Future value"),
        rate: z.number().describe("Rate (decimal)"),
        time: z.number().describe("Years"),
        n: z.number().describe("Compounds/year").default(1)
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
