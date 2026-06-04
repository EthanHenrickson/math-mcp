export interface ModeResult {
    modeResult: number[];
    maxFrequency: number;
}

export interface QuartileResult {
    q1: number;
    q2: number;
    q3: number;
}

export interface ExtendedGcdResult {
    gcd: number;
    x: number;
    y: number;
}

export interface FractionResult {
    numerator: number;
    denominator: number;
}

export interface CartCoord {
    x: number;
    y: number;
}

export interface PolarCoord {
    r: number;
    theta: number;
}

export interface SinusoidalResult {
    amplitude: number;
    period: number;
    periodDegrees: number;
    phaseShift: number;
    phaseShiftDescription: string;
    verticalShift: number;
    midline: string;
    range: string;
    maxValue: number;
    minValue: number;
}

export interface ArithmeticSequenceResult {
    terms: number[];
    nthTerm: number;
    sum: number;
}

export interface GeometricSequenceResult {
    terms: number[];
    nthTerm: number;
    sumFinite: number;
    sumInfinite: number | null;
}

export interface QuadraticIneqResult {
    discriminant: number;
    roots: string;
    solution: string;
}

export interface QuadraticResult {
    discriminant: number;
    root1: string;
    root2: string;
}

export interface Triangle {
    a: number | null;
    b: number | null;
    c: number | null;
    A: number | null;
    B: number | null;
    C: number | null;
}

export interface LawOfSinesResult {
    solution1: Triangle | null;
    solution2: Triangle | null;
    ambiguous: boolean;
    solutionCount: number;
    description: string;
}
