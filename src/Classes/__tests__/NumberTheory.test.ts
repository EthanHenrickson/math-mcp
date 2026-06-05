import { describe, it, expect } from "vitest";
import { NumberTheory } from "../NumberTheory.js";

describe("NumberTheory", () => {
  it("gcd(a,b) = gcd(b,a) and divides both", () => {
    for (let i = 0; i < 10; i++) {
      const a = Math.floor(Math.random() * 1000) + 1;
      const b = Math.floor(Math.random() * 1000) + 1;
      const g = NumberTheory.gcd(a, b);
      expect(g).toBe(NumberTheory.gcd(b, a));
      expect(a % g).toBe(0);
      expect(b % g).toBe(0);
    }
  });
  it("gcd × lcm = |a × b|", () => {
    for (let i = 0; i < 10; i++) {
      const a = Math.floor(Math.random() * 500) + 1;
      const b = Math.floor(Math.random() * 500) + 1;
      expect(NumberTheory.gcd(a, b) * NumberTheory.lcm(a, b)).toBe(Math.abs(a * b));
    }
  });
  it("extended gcd: ax + by = gcd(a,b)", () => {
    for (let i = 0; i < 10; i++) {
      const a = Math.floor(Math.random() * 200) + 1;
      const b = Math.floor(Math.random() * 200) + 1;
      const r = NumberTheory.extendedGcd(a, b);
      expect(a * r.x + b * r.y).toBe(r.gcd);
    }
  });
  it("a × a⁻¹ ≡ 1 (mod m) when coprime", () => {
    for (let i = 0; i < 10; i++) {
      const m = Math.floor(Math.random() * 50) + 2;
      const a = Math.floor(Math.random() * (m - 1)) + 1;
      if (NumberTheory.gcd(a, m) === 1) {
        expect(NumberTheory.modPow(a * NumberTheory.modInverse(a, m), 1, m)).toBe(1);
      }
    }
  });
  it("φ(p) = p-1 for primes", () => {
    for (const p of [2, 3, 5, 7, 11, 13, 17, 19, 97]) {
      expect(NumberTheory.totient(p)).toBe(p - 1);
    }
  });
  it("F(n) = F(n-1) + F(n-2)", () => {
    for (const n of [5, 10, 15, 20]) {
      expect(NumberTheory.fibonacci(n))
        .toBe(NumberTheory.fibonacci(n - 1) + NumberTheory.fibonacci(n - 2));
    }
  });
  it("prime factors product equals n", () => {
    for (let i = 0; i < 10; i++) {
      const n = Math.floor(Math.random() * 9999) + 2;
      expect(NumberTheory.primeFactors(n).reduce((a, b) => a * b, 1)).toBe(n);
    }
  });
  it("collatz(27) ends at 1", () => {
    const seq = NumberTheory.collatz(27);
    expect(seq[0]).toBe(27);
    expect(seq[seq.length - 1]).toBe(1);
  });
  it("digital root ≡ n mod 9", () => {
    for (let i = 1; i < 100; i++) {
      expect(NumberTheory.digitalRoot(i)).toBe(i % 9 === 0 ? 9 : i % 9);
    }
  });
  it("isPerfectSquare", () => {
    expect(NumberTheory.isPerfectSquare(144)).toBe(true);
    expect(NumberTheory.isPerfectSquare(143)).toBe(false);
    expect(NumberTheory.isPerfectSquare(-4)).toBe(false);
  });
});
