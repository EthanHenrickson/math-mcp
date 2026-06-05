import { describe, it, expect } from "vitest";
import { Algebra } from "../Algebra.js";

describe("Algebra", () => {
  it("log(a*b) = log(a) + log(b)", () => {
    for (let i = 0; i < 10; i++) {
      const a = Math.random() * 90 + 10;
      const b = Math.random() * 90 + 10;
      expect(Algebra.log(10, a * b)).toBeCloseTo(Algebra.log(10, a) + Algebra.log(10, b), 8);
    }
  });
  it("ln(e) = 1 and exp(ln(x)) ≈ x", () => {
    expect(Algebra.ln(Math.E)).toBeCloseTo(1, 12);
    for (let i = 0; i < 10; i++) {
      const x = Math.random() * 10 + 1;
      expect(Algebra.exp(Algebra.ln(x))).toBeCloseTo(x, 8);
    }
  });
  it("quadratic roots satisfy ax² + bx + c = 0", () => {
    for (let i = 0; i < 20; i++) {
      const a = Math.random() * 10 + 1;
      const b = Math.random() * 20 - 10;
      const c = Math.random() * 20 - 10;
      const r = Algebra.quadratic(a, b, c);
      if (r.discriminant >= 0) {
        expect(a * parseFloat(r.root1) ** 2 + b * parseFloat(r.root1) + c).toBeCloseTo(0, 8);
      }
    }
  });
  it("C(n, r) = C(n, n-r) and Pascal: C(n,k)+C(n,k-1)=C(n+1,k)", () => {
    for (let i = 0; i < 10; i++) {
      const n = Math.floor(Math.random() * 10) + 2;
      const r = Math.floor(Math.random() * (n + 1));
      expect(Algebra.combinations(n, r)).toBe(Algebra.combinations(n, n - r));
      const k = Math.floor(Math.random() * n) + 1;
      expect(Algebra.combinations(n, k) + Algebra.combinations(n, k - 1)).toBe(Algebra.combinations(n + 1, k));
    }
  });
  it("P(n,n) = n!", () => expect(Algebra.permutations(5, 5)).toBe(120));
  it("arithmetic sum = n × (a1 + an) / 2", () => {
    for (let i = 0; i < 10; i++) {
      const a1 = Math.random() * 20 - 10;
      const d = Math.random() * 10 - 5;
      const n = Math.floor(Math.random() * 20) + 2;
      const r = Algebra.arithmeticSequence(a1, d, n);
      expect(r.sum).toBeCloseTo(n * (a1 + r.nthTerm) / 2, 10);
    }
  });
  it("geometric convergent infinite sum = a1 / (1-r)", () => {
    const r = Algebra.geometricSequence(1, 0.5, 5);
    expect(r.sumInfinite).toBe(2);
    const r2 = Algebra.geometricSequence(1, 2, 5);
    expect(r2.sumInfinite).toBeNull();
  });
  it("quadratic inequality: x² - 5x + 6 < 0 → (2, 3)", () => {
    expect(Algebra.quadraticInequalities(1, -5, 6, "<").solution).toBe("(2, 3)");
  });
  it("invalid combos return NaN", () => {
    expect(Algebra.permutations(3, 5)).toBe(NaN);
    expect(Algebra.combinations(-1, 2)).toBe(NaN);
  });
});
