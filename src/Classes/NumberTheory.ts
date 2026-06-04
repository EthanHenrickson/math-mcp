import type { ExtendedGcdResult } from '../types.js';

export class NumberTheory {
    static gcd(a: number, b: number): number {
        a = Math.abs(a);
        b = Math.abs(b);
        while (b !== 0) {
            [a, b] = [b, a % b];
        }
        return a;
    }

    static lcm(a: number, b: number): number {
        if (a === 0 || b === 0) return 0;
        return Math.abs(a * b) / NumberTheory.gcd(a, b);
    }

    static isPrime(n: number): boolean {
        if (n < 2 || !Number.isInteger(n)) return false;
        if (n === 2) return true;
        if (n % 2 === 0) return false;
        const sqrt = Math.sqrt(n);
        for (let i = 3; i <= sqrt; i += 2) {
            if (n % i === 0) return false;
        }
        return true;
    }

    static primeFactors(n: number): number[] {
        if (n <= 1) return [];
        const factors: number[] = [];
        let num = n;
        while (num % 2 === 0) {
            factors.push(2);
            num /= 2;
        }
        for (let i = 3; i <= Math.sqrt(num); i += 2) {
            while (num % i === 0) {
                factors.push(i);
                num /= i;
            }
        }
        if (num > 1) factors.push(num);
        return factors;
    }

    static fibonacci(n: number): number {
        if (n < 0 || !Number.isInteger(n)) return NaN;
        if (n === 0) return 0;
        if (n === 1) return 1;
        let a = 0;
        let b = 1;
        for (let i = 2; i <= n; i++) {
            [a, b] = [b, a + b];
        }
        return b;
    }

    static isEven(n: number): boolean {
        if (!Number.isInteger(n)) return false;
        return n % 2 === 0;
    }

    static isOdd(n: number): boolean {
        if (!Number.isInteger(n)) return false;
        return n % 2 !== 0;
    }

    static modPow(base: number, exp: number, mod: number): number {
        if (!Number.isInteger(base) || !Number.isInteger(exp) || !Number.isInteger(mod)) return NaN;
        if (mod <= 0) return NaN;
        if (exp < 0) return NaN;
        if (mod === 1) return 0;
        let result = 1;
        let b = ((base % mod) + mod) % mod;
        let e = exp;
        while (e > 0) {
            if (e % 2 === 1) result = (result * b) % mod;
            e = Math.floor(e / 2);
            b = (b * b) % mod;
        }
        return result;
    }

    static extendedGcd(a: number, b: number): ExtendedGcdResult {
        if (a === 0 && b === 0) return { gcd: 0, x: 0, y: 0 };
        let oldR = Math.abs(a), r = Math.abs(b);
        let oldS = 1, s = 0;
        let oldT = 0, t = 1;
        while (r !== 0) {
            const quotient = Math.floor(oldR / r);
            [oldR, r] = [r, oldR - quotient * r];
            [oldS, s] = [s, oldS - quotient * s];
            [oldT, t] = [t, oldT - quotient * t];
        }
        if (a < 0) oldS = -oldS;
        if (b < 0) oldT = -oldT;
        return { gcd: oldR, x: oldS, y: oldT };
    }

    static modInverse(a: number, m: number): number {
        if (!Number.isInteger(a) || !Number.isInteger(m)) return NaN;
        if (m <= 0) return NaN;
        const { gcd, x } = NumberTheory.extendedGcd(a, m);
        if (gcd !== 1) return NaN;
        return ((x % m) + m) % m;
    }

    static totient(n: number): number {
        if (n <= 0 || !Number.isInteger(n)) return NaN;
        if (n === 1) return 1;
        let result = n;
        let temp = n;
        if (temp % 2 === 0) {
            while (temp % 2 === 0) temp /= 2;
            result -= result / 2;
        }
        for (let i = 3; i * i <= temp; i += 2) {
            if (temp % i === 0) {
                while (temp % i === 0) temp /= i;
                result -= result / i;
            }
        }
        if (temp > 1) result -= result / temp;
        return result;
    }

    static isPerfectSquare(n: number): boolean {
        if (n < 0 || !Number.isInteger(n)) return false;
        const sqrt = Math.round(Math.sqrt(n));
        return sqrt * sqrt === n;
    }

    static digitalRoot(n: number): number {
        if (!Number.isInteger(n)) return NaN;
        n = Math.abs(n);
        if (n === 0) return 0;
        return 1 + ((n - 1) % 9);
    }

    static collatz(n: number): number[] {
        if (n <= 0 || !Number.isInteger(n)) return [];
        const sequence: number[] = [n];
        let current = n;
        let maxIter = 100000;
        while (current !== 1 && maxIter > 0) {
            if (current % 2 === 0) current /= 2;
            else current = 3 * current + 1;
            sequence.push(current);
            maxIter--;
        }
        return sequence;
    }
}
