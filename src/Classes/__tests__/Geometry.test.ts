import { describe, it, expect } from "vitest";
import { Geometry } from "../Geometry.js";

describe("Geometry", () => {
  it("haversine: same point = 0", () => {
    expect(Geometry.haversine(40.71, -74.0, 40.71, -74.0)).toBeCloseTo(0, 10);
  });
  it("haversine is symmetric", () => {
    const d1 = Geometry.haversine(40.71, -74.0, 51.5, -0.12);
    const d2 = Geometry.haversine(51.5, -0.12, 40.71, -74.0);
    expect(d1).toBeCloseTo(d2, 10);
  });
  it("heronArea(3,4,5) = 6", () => expect(Geometry.heronArea(3, 4, 5)).toBe(6));
  it("heronArea: triangle inequality violation → NaN", () => {
    expect(Geometry.heronArea(1, 1, 10)).toBe(NaN);
  });
  it("circle area = πr², sphere volume = 4πr³/3", () => {
    expect(Geometry.circleArea(5)).toBeCloseTo(Math.PI * 25, 10);
    expect(Geometry.sphereVolume(5)).toBeCloseTo((4 / 3) * Math.PI * 125, 10);
  });
  it("negative radius → NaN", () => {
    expect(Geometry.circleArea(-1)).toBe(NaN);
    expect(Geometry.sphereVolume(-1)).toBe(NaN);
  });
  it("law of sines: AAS 30-60-90", () => {
    const r = Geometry.lawOfSines(5, undefined, undefined, 30, 60, undefined);
    expect(r.solutionCount).toBe(1);
    expect(r.solution1?.C).toBeCloseTo(90, 8);
    expect(r.solution1?.c).toBeCloseTo(10, 3);
  });
  it("law of sines: SSA ambiguous → 2 solutions", () => {
    const r = Geometry.lawOfSines(8, 10, undefined, 30, undefined, undefined);
    expect(r.solutionCount).toBe(2);
    expect(r.ambiguous).toBe(true);
  });
  it("law of sines: side too short → no triangle", () => {
    const r = Geometry.lawOfSines(2, undefined, 10, 30, undefined, undefined);
    expect(r.solutionCount).toBe(0);
  });
  it("law of sines: solved triangle sums to 180°", () => {
    const r = Geometry.lawOfSines(10, undefined, undefined, 40, 60, undefined);
    if (r.solution1) {
      expect(r.solution1.A! + r.solution1.B! + r.solution1.C!).toBeCloseTo(180, 8);
    }
  });
});
