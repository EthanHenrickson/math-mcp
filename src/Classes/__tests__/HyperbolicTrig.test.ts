import { describe, it, expect } from "vitest";
import { HyperbolicTrig } from "../HyperbolicTrig.js";

describe("HyperbolicTrig", () => {
  it("sinh(x) = (eˣ - e⁻ˣ)/2", () => {
    for (let i = 0; i < 10; i++) {
      const x = Math.random() * 5 - 2.5;
      expect(HyperbolicTrig.sinh(x)).toBeCloseTo((Math.exp(x) - Math.exp(-x)) / 2, 12);
    }
  });
  it("cosh(x) = (eˣ + e⁻ˣ)/2", () => {
    for (let i = 0; i < 10; i++) {
      const x = Math.random() * 5 - 2.5;
      expect(HyperbolicTrig.cosh(x)).toBeCloseTo((Math.exp(x) + Math.exp(-x)) / 2, 12);
    }
  });
  it("tanh(x) = sinh(x) / cosh(x)", () => {
    for (let i = 0; i < 10; i++) {
      const x = Math.random() * 5 - 2.5;
      expect(HyperbolicTrig.tanh(x)).toBeCloseTo(HyperbolicTrig.sinh(x) / HyperbolicTrig.cosh(x), 10);
    }
  });
  it("cosh²(x) - sinh²(x) = 1", () => {
    for (let i = 0; i < 20; i++) {
      const x = Math.random() * 5 - 2.5;
      const c = HyperbolicTrig.cosh(x);
      const s = HyperbolicTrig.sinh(x);
      expect(c * c - s * s).toBeCloseTo(1, 10);
    }
  });
  it("sinh(-x) = -sinh(x), cosh(-x) = cosh(x)", () => {
    for (let i = 0; i < 10; i++) {
      const x = Math.random() * 5;
      expect(HyperbolicTrig.sinh(-x)).toBeCloseTo(-HyperbolicTrig.sinh(x), 12);
      expect(HyperbolicTrig.cosh(-x)).toBeCloseTo(HyperbolicTrig.cosh(x), 12);
    }
  });
  it("asinh(sinh(x)) ≈ x", () => {
    for (let i = 0; i < 10; i++) {
      const x = Math.random() * 5 - 2.5;
      expect(HyperbolicTrig.asinh(HyperbolicTrig.sinh(x))).toBeCloseTo(x, 10);
    }
  });
  it("acosh domain: x < 1 → NaN", () => expect(HyperbolicTrig.acosh(0.5)).toBe(NaN));
  it("atanh domain: |x| > 1 → NaN", () => expect(HyperbolicTrig.atanh(2)).toBe(NaN));
  it("atanh(±1) = ±Infinity", () => {
    expect(HyperbolicTrig.atanh(1)).toBe(Infinity);
    expect(HyperbolicTrig.atanh(-1)).toBe(-Infinity);
  });
});
