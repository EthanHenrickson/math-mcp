import { describe, it, expect } from "vitest";
import { Arithmetic } from "../Arithmetic.js";

describe("Arithmetic", () => {
  it("n + (-n) = 0", () => expect(Arithmetic.add(3.14, -3.14)).toBeCloseTo(0, 12));
  it("n * 0 = 0", () => expect(Arithmetic.multiply(-5, 0)).toBeCloseTo(0, 12));
  it("(a / b) * b ≈ a", () => {
    for (let i = 0; i < 20; i++) {
      const a = Math.random() * 200 - 100;
      const b = (Math.random() * 100 + 1) * (Math.random() > 0.5 ? 1 : -1);
      expect(Arithmetic.multiply(Arithmetic.division(a, b), b)).toBeCloseTo(a, 10);
    }
  });
  it("n! = n × (n-1)! for n >= 1", () => {
    for (const n of [2, 5, 10, 50, 100, 150]) {
      expect(Arithmetic.factorial(n)).toBe(n * Arithmetic.factorial(n - 1));
    }
  });
  it("0! = 1, negative/float returns NaN", () => {
    expect(Arithmetic.factorial(0)).toBe(1);
    expect(Arithmetic.factorial(-1)).toBe(NaN);
    expect(Arithmetic.factorial(3.5)).toBe(NaN);
  });
  it("(n√a)^n ≈ a", () => {
    for (let i = 0; i < 20; i++) {
      const a = Math.random() * 100 + 1;
      const n = Math.floor(Math.random() * 6) + 2;
      expect(Arithmetic.power(Arithmetic.root(a, n), n)).toBeCloseTo(a, 8);
    }
  });
  it("|x| >= 0 and |x| = |-x|", () => {
    for (let i = 0; i < 20; i++) {
      const x = Math.random() * 200 - 100;
      expect(Arithmetic.abs(x)).toBeGreaterThanOrEqual(0);
      expect(Arithmetic.abs(x)).toBe(Arithmetic.abs(-x));
    }
  });
  it("division by zero returns Infinity", () => expect(Arithmetic.division(1, 0)).toBe(Infinity));
  it("empty sum returns 0", () => expect(Arithmetic.sum([])).toBe(0));
  it("sqrt(x)² ≈ x for x >= 0", () => {
    for (let i = 0; i < 20; i++) {
      const x = Math.random() * 1000;
      expect(Arithmetic.power(Arithmetic.sqrt(x), 2)).toBeCloseTo(x, 8);
    }
  });
});
