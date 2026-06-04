import { Arithmetic } from './Arithmetic.js';
import type { ArithmeticSequenceResult, GeometricSequenceResult, QuadraticIneqResult, QuadraticResult } from '../types.js';

export class Algebra {
    static log(base: number, value: number): number {
        if (base === 1) return NaN;
        return Math.log(value) / Math.log(base);
    }

    static ln(value: number): number {
        return Math.log(value);
    }

    static log2(value: number): number {
        return Math.log2(value);
    }

    static log10(value: number): number {
        return Math.log10(value);
    }

    static exp(value: number): number {
        return Math.exp(value);
    }

    static permutations(n: number, r: number): number {
        if (n < 0 || r < 0 || !Number.isInteger(n) || !Number.isInteger(r) || r > n) return NaN;
        return Arithmetic.factorial(n) / Arithmetic.factorial(n - r);
    }

    static combinations(n: number, r: number): number {
        if (n < 0 || r < 0 || !Number.isInteger(n) || !Number.isInteger(r) || r > n) return NaN;
        return Arithmetic.factorial(n) / (Arithmetic.factorial(r) * Arithmetic.factorial(n - r));
    }

    static arithmeticSequence(a1: number, d: number, n: number): ArithmeticSequenceResult {
        if (!Number.isInteger(n) || n < 1) throw new Error("n must be a positive integer");
        const terms: number[] = [];
        for (let i = 0; i < n; i++) {
            terms.push(a1 + i * d);
        }
        const nthTerm = a1 + (n - 1) * d;
        const sum = (n / 2) * (a1 + nthTerm);
        return { terms, nthTerm, sum };
    }

    static geometricSequence(a1: number, r: number, n: number): GeometricSequenceResult {
        if (!Number.isInteger(n) || n < 1) throw new Error("n must be a positive integer");
        const terms: number[] = [];
        for (let i = 0; i < n; i++) {
            terms.push(a1 * r ** i);
        }
        const nthTerm = a1 * r ** (n - 1);
        const sumFinite = r === 1 ? n * a1 : a1 * (1 - r ** n) / (1 - r);
        const sumInfinite = Math.abs(r) < 1 ? a1 / (1 - r) : null;
        return { terms, nthTerm, sumFinite, sumInfinite };
    }

    static quadraticInequalities(a: number, b: number, c: number, inequality: string): QuadraticIneqResult {
        if (a === 0) {
            const root = -c / b;
            let solution: string;
            if (inequality === ">") solution = b > 0 ? `(${root}, ∞)` : `(-∞, ${root})`;
            else if (inequality === ">=") solution = b > 0 ? `[${root}, ∞)` : `(-∞, ${root}]`;
            else if (inequality === "<") solution = b > 0 ? `(-∞, ${root})` : `(${root}, ∞)`;
            else solution = b > 0 ? `(-∞, ${root}]` : `[${root}, ∞)`;
            return { discriminant: 0, roots: `${root}`, solution };
        }

        const discriminant = b * b - 4 * a * c;
        let roots: string;
        let solution: string;

        if (discriminant < 0) {
            roots = "No real roots";
            if (a > 0) {
                solution = inequality === ">" || inequality === ">=" ? "(-∞, ∞)" : "No solution";
            } else {
                solution = inequality === "<" || inequality === "<=" ? "(-∞, ∞)" : "No solution";
            }
        } else if (discriminant === 0) {
            const root = -b / (2 * a);
            roots = `${root}`;
            if (a > 0) {
                if (inequality === ">") solution = `(-∞, ${root}) ∪ (${root}, ∞)`;
                else if (inequality === ">=") solution = "(-∞, ∞)";
                else if (inequality === "<") solution = "No solution";
                else solution = `{${root}}`;
            } else {
                if (inequality === ">") solution = "No solution";
                else if (inequality === ">=") solution = `{${root}}`;
                else if (inequality === "<") solution = `(-∞, ${root}) ∪ (${root}, ∞)`;
                else solution = "(-∞, ∞)";
            }
        } else {
            const sqrtD = Math.sqrt(discriminant);
            const r1 = (-b - sqrtD) / (2 * a);
            const r2 = (-b + sqrtD) / (2 * a);
            const smaller = Math.min(r1, r2);
            const larger = Math.max(r1, r2);
            roots = `${smaller}, ${larger}`;

            const openLeft = `(-∞, ${smaller})`;
            const openRight = `(${larger}, ∞)`;
            const openMiddle = `(${smaller}, ${larger})`;
            const closedLeft = `(-∞, ${smaller}]`;
            const closedRight = `[${larger}, ∞)`;
            const closedMiddle = `[${smaller}, ${larger}]`;

            if (a > 0) {
                if (inequality === ">") solution = `${openLeft} ∪ ${openRight}`;
                else if (inequality === ">=") solution = `${closedLeft} ∪ ${closedRight}`;
                else if (inequality === "<") solution = openMiddle;
                else solution = closedMiddle;
            } else {
                if (inequality === ">") solution = openMiddle;
                else if (inequality === ">=") solution = closedMiddle;
                else if (inequality === "<") solution = `${openLeft} ∪ ${openRight}`;
                else solution = `${closedLeft} ∪ ${closedRight}`;
            }
        }

        return { discriminant, roots, solution };
    }

    static quadratic(a: number, b: number, c: number): QuadraticResult {
        if (a === 0) {
            if (b === 0) {
                return { discriminant: 0, root1: "No solution", root2: "No solution" };
            }
            const root = -c / b;
            return { discriminant: 0, root1: `${root}`, root2: `${root}` };
        }

        const discriminant = b * b - 4 * a * c;
        const twoA = 2 * a;

        if (discriminant >= 0) {
            const sqrtD = Math.sqrt(discriminant);
            const r1 = (-b + sqrtD) / twoA;
            const r2 = (-b - sqrtD) / twoA;
            return { discriminant: Math.round(discriminant * 1e12) / 1e12, root1: `${r1}`, root2: `${r2}` };
        }

        const realPart = -b / twoA;
        const imagPart = Math.sqrt(-discriminant) / twoA;
        const fmtImag = imagPart === 1 ? "" : imagPart === -1 ? "" : `${Math.abs(Math.round(imagPart * 1e12) / 1e12)}`;
        const rp = Math.round(realPart * 1e12) / 1e12;

        const formatComplex = (rp: number, im: number, flipSign: boolean): string => {
            const imag = flipSign ? -im : im;
            const fmtI = imag === 1 ? "" : imag === -1 ? "" : `${Math.abs(Math.round(imag * 1e12) / 1e12)}`;
            const sign = imag < 0 ? "-" : (rp === 0 ? "" : "+");
            const rpStr = rp === 0 ? "" : `${rp}`;
            const iStr = fmtI === "" ? "i" : `${fmtI}i`;
            return `${rpStr}${sign}${iStr}`.replace(/^\+/, "").trim();
        };

        const root1 = formatComplex(rp, imagPart, false);
        const root2 = formatComplex(rp, imagPart, true);

        return { discriminant, root1, root2 };
    }
}
