import { Arithmetic } from './Arithmetic.js';

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
}
