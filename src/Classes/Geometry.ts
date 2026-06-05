import type { LawOfSinesResult, Triangle } from '../types.js';

export class Geometry {
    // great-circle distance via haversine, 6371km earth radius, deg in km out
    // clamp a to [0,1] to prevent NaN from fp rounding near antipodal points
    static haversine(lat1: number, lon1: number, lat2: number, lon2: number): number {
        const R = 6371;
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const a = Math.sin(dLat / 2) ** 2 +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) ** 2;
        const clamped = Math.min(1, Math.max(0, a));
        return 2 * R * Math.atan2(Math.sqrt(clamped), Math.sqrt(1 - clamped));
    }

    static heronArea(a: number, b: number, c: number): number {
        if (a <= 0 || b <= 0 || c <= 0) return NaN;
        if (a + b <= c || a + c <= b || b + c <= a) return NaN;
        const s = (a + b + c) / 2;
        return Math.sqrt(s * (s - a) * (s - b) * (s - c));
    }

    static circleArea(radius: number): number {
        if (radius < 0) return NaN;
        return Math.PI * radius * radius;
    }

    static sphereVolume(radius: number): number {
        if (radius < 0) return NaN;
        return (4 / 3) * Math.PI * radius ** 3;
    }

    // law of sines solver, handles the ambiguous ssa case too
    static lawOfSines(
        a?: number, b?: number, c?: number,
        A?: number, B?: number, C?: number
    ): LawOfSinesResult {
        const toRad = (d: number) => d * Math.PI / 180;
        const toDeg = (r: number) => r * 180 / Math.PI;
        const round = (x: number) => Math.round(x * 1e10) / 1e10;

        const sides: (number | null)[] = [a ?? null, b ?? null, c ?? null];
        const angles: (number | null)[] = [A ?? null, B ?? null, C ?? null];

        const knownSides = sides.filter(x => x !== null).length;
        const knownAngles = angles.filter(x => x !== null).length;

        if (knownSides === 0) throw new Error("At least one side is required");
        if (knownAngles === 3) throw new Error("Three angles given, infinite similar triangles; need at least one side");
        if (knownSides + knownAngles < 3) throw new Error("Insufficient information, need 3 values (at least one side)");

        const solveTriangle = (s: (number | null)[], ang: (number | null)[]): { sides: number[]; angles: number[] } | null => {
            const outS = [...s];
            const outA = [...ang];

            for (let iter = 0; iter < 10; iter++) {
                let changed = false;

                if (outA.filter(x => x !== null).length === 2) {
                    const sum = (outA[0] ?? 0) + (outA[1] ?? 0) + (outA[2] ?? 0);
                    for (let i = 0; i < 3; i++) {
                        if (outA[i] === null) { outA[i] = 180 - sum; changed = true; }
                    }
                }

                let ratio: number | null = null;
                for (let i = 0; i < 3; i++) {
                    if (outS[i] !== null && outA[i] !== null) {
                        ratio = outS[i]! / Math.sin(toRad(outA[i]!));
                        break;
                    }
                }

                if (ratio !== null) {
                    for (let i = 0; i < 3; i++) {
                        if (outS[i] === null && outA[i] !== null) {
                            outS[i] = round(ratio * Math.sin(toRad(outA[i]!)));
                            changed = true;
                        }
                        if (outA[i] === null && outS[i] !== null) {
                            const sinVal = outS[i]! / ratio;
                            if (sinVal > 1.0000000001) return null;
                            outA[i] = round(toDeg(Math.asin(Math.max(-1, Math.min(1, sinVal)))));
                            changed = true;
                        }
                    }
                }

                if (!changed) break;
            }

            if (outS.some(x => x === null) || outA.some(x => x === null)) return null;
            return { sides: outS as number[], angles: outA as number[] };
        };

        const toTriangle = (data: { sides: number[]; angles: number[] }): Triangle => ({
            a: data.sides[0], b: data.sides[1], c: data.sides[2],
            A: data.angles[0], B: data.angles[1], C: data.angles[2]
        });

        const result1 = solveTriangle(sides, angles);

        if (result1 === null) {
            return {
                solution1: null, solution2: null,
                ambiguous: false, solutionCount: 0,
                description: "No valid triangle"
            };
        }

        let result2: { sides: number[]; angles: number[] } | null = null;

        if (knownSides === 2 && knownAngles === 1) {
            const sideIdx1 = sides[0] !== null ? 0 : (sides[1] !== null ? 1 : 2);
            const sideIdx2 = sides[1] !== null ? 1 : (sides[0] !== null ? 0 : 2);
            const angIdx = angles[0] !== null ? 0 : (angles[1] !== null ? 1 : 2);

            if (angIdx === sideIdx1 || angIdx === sideIdx2) {
                const otherSideIdx = angIdx === sideIdx1 ? sideIdx2 : sideIdx1;
                const givenOpposite = sides[angIdx]!;
                const givenAdjacent = sides[otherSideIdx]!;
                const givenAngle = angles[angIdx]!;
                const h = givenAdjacent * Math.sin(toRad(givenAngle));

                if (givenOpposite > h + 1e-10 && givenOpposite < givenAdjacent) {
                    const altAngles = [...angles];
                    const computedAngle = result1.angles[otherSideIdx];
                    const altAngle = 180 - computedAngle;
                    const sumCheck = altAngle + givenAngle;
                    if (sumCheck < 180) {
                        altAngles[otherSideIdx] = altAngle;
                        result2 = solveTriangle(sides, altAngles);
                    }
                }
            }
        }

        return {
            solution1: toTriangle(result1),
            solution2: result2 ? toTriangle(result2) : null,
            ambiguous: result2 !== null,
            solutionCount: result2 ? 2 : 1,
            description: result2
                ? "SSA ambiguous case: two possible triangles"
                : "One unique triangle"
        };
    }
}
