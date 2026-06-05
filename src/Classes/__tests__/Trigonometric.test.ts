import { describe, it, expect } from "vitest";
import { Trigonometric } from "../Trigonometric.js";

describe("Trigonometric", () => {
  it("sin² + cos² = 1 at key angles", () => {
    for (const a of [0, Math.PI / 6, Math.PI / 4, Math.PI / 3, Math.PI / 2, Math.PI]) {
      expect(Trigonometric.sin(a) ** 2 + Trigonometric.cos(a) ** 2).toBeCloseTo(1, 12);
    }
  });
  it("tan = sin / cos", () => {
    for (let i = 0; i < 20; i++) {
      const a = Math.random() * 2 * Math.PI;
      if (Math.abs(Trigonometric.cos(a)) > 1e-10) {
        expect(Trigonometric.tan(a)).toBeCloseTo(Trigonometric.sin(a) / Trigonometric.cos(a), 8);
      }
    }
  });
  it("csc = 1/sin, sec = 1/cos", () => {
    for (let i = 0; i < 10; i++) {
      const a = Math.random() * Math.PI;
      if (Math.abs(Trigonometric.sin(a)) > 1e-10)
        expect(Trigonometric.csc(a)).toBeCloseTo(1 / Trigonometric.sin(a), 8);
      if (Math.abs(Trigonometric.cos(a)) > 1e-10)
        expect(Trigonometric.sec(a)).toBeCloseTo(1 / Trigonometric.cos(a), 8);
    }
  });
  it("180° ↔ π rad round trip", () => {
    expect(Trigonometric.degreesToRadians(180)).toBeCloseTo(Math.PI, 12);
    expect(Trigonometric.radiansToDegrees(Math.PI)).toBeCloseTo(180, 12);
  });
  it("deg ↔ rad fuzz round trip", () => {
    for (let i = 0; i < 20; i++) {
      const d = Math.random() * 360 - 180;
      expect(Trigonometric.radiansToDegrees(Trigonometric.degreesToRadians(d))).toBeCloseTo(d, 10);
    }
  });
  it("cartesian ↔ polar round trip", () => {
    for (let i = 0; i < 20; i++) {
      const x = Math.random() * 20 - 10;
      const y = Math.random() * 20 - 10;
      const pol = Trigonometric.cartesianToPolar(x, y);
      const car = Trigonometric.polarToCartesian(pol.r, pol.theta);
      expect(car.x).toBeCloseTo(x, 8);
      expect(car.y).toBeCloseTo(y, 8);
    }
  });
  it("arcsin domain: |x| > 1 returns NaN", () => {
    expect(Trigonometric.arcsin(2)).toBe(NaN);
    expect(Trigonometric.arccos(-2)).toBe(NaN);
  });
  it("sin(-x) = -sin(x), cos(-x) = cos(x)", () => {
    for (let i = 0; i < 10; i++) {
      const x = Math.random() * 10;
      expect(Trigonometric.sin(-x)).toBeCloseTo(-Trigonometric.sin(x), 12);
      expect(Trigonometric.cos(-x)).toBeCloseTo(Trigonometric.cos(x), 12);
    }
  });
  it("law of cosines: c² = a² + b² - 2ab cos(C)", () => {
    for (let i = 0; i < 10; i++) {
      const a = Math.random() * 10 + 1;
      const b = Math.random() * 10 + 1;
      const C = Math.random() * Math.PI;
      const c = Trigonometric.lawOfCosines(a, b, C);
      expect(c ** 2).toBeCloseTo(a ** 2 + b ** 2 - 2 * a * b * Math.cos(C), 8);
    }
  });
  it("hypot(3,4) = 5", () => expect(Trigonometric.hypot(3, 4)).toBe(5));

  it("sinusoidalFunction: amplitude, period, range", () => {
    const r = Trigonometric.sinusoidalFunction(3, 2, 0.5, 1);
    expect(r.amplitude).toBe(3);
    expect(r.period).toBeCloseTo(Math.PI, 10);
    expect(r.maxValue).toBe(4);
    expect(r.minValue).toBe(-2);
  });
  it("sinusoidalFunction: zero frequency → infinite period", () => {
    const r = Trigonometric.sinusoidalFunction(3, 0, 0, 1);
    expect(r.period).toBe(Infinity);
  });
  it("sinusoidalFunction: k ≠ 0 yields finite period", () => {
    const r = Trigonometric.sinusoidalFunction(1, 4, 0, 0);
    expect(r.period).toBeCloseTo(Math.PI / 2, 10);
  });
  it("sinusoidalFunction: negative amplitude coerces to positive", () => {
    const r = Trigonometric.sinusoidalFunction(-5, 1, 0, 0);
    expect(r.amplitude).toBe(5);
  });
  it("sinusoidalFunction: positive d shifts left (x + d convention)", () => {
    const r = Trigonometric.sinusoidalFunction(1, 1, 2, 0);
    expect(r.phaseShiftDescription).toContain("left");
  });
  it("sinusoidalFunction: negative d shifts right (x + d convention)", () => {
    const r = Trigonometric.sinusoidalFunction(1, 1, -1.5, 0);
    expect(r.phaseShiftDescription).toContain("right");
  });
  it("sinusoidalFunction: d=0 no shift", () => {
    const r = Trigonometric.sinusoidalFunction(1, 2, 0, 0);
    expect(r.phaseShiftDescription).toBe("No phase shift");
  });
  it("sinusoidalFunction: vertical shift c sets midline", () => {
    const r = Trigonometric.sinusoidalFunction(2, 1, 0, 7);
    expect(parseFloat(r.midline.replace("y = ", ""))).toBe(7);
    expect(r.maxValue).toBe(9);
    expect(r.minValue).toBe(5);
  });
});
