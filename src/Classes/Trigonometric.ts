export class Trigonometric {
    static sin(number: number) {
        return Math.sin(number);
    }

    static arcsin(number: number) {
        return Math.asin(number);
    }

    static cos(number: number) {
        return Math.cos(number);
    }

    static arccos(number: number) {
        return Math.acos(number);
    }

    static tan(number: number) {
        return Math.tan(number);
    }

    static arctan(number: number) {
        return Math.atan(number);
    }

    static radiansToDegrees(number: number) {
        return number * (180 / Math.PI);
    }

    static degreesToRadians(number: number) {
        return number * (Math.PI / 180);
    }

    static csc(number: number): number {
        return 1 / Math.sin(number);
    }

    static sec(number: number): number {
        return 1 / Math.cos(number);
    }

    static cot(number: number): number {
        return 1 / Math.tan(number);
    }

    static arctan2(y: number, x: number): number {
        return Math.atan2(y, x);
    }

    static hypot(a: number, b: number): number {
        return Math.hypot(a, b);
    }

    static lawOfCosines(a: number, b: number, angleC: number): number {
        return Math.sqrt(a ** 2 + b ** 2 - 2 * a * b * Math.cos(angleC));
    }

    static polarToCartesian(r: number, theta: number): { x: number; y: number } {
        return {
            x: r * Math.cos(theta),
            y: r * Math.sin(theta)
        };
    }

    static cartesianToPolar(x: number, y: number): { r: number; theta: number } {
        return {
            r: Math.sqrt(x ** 2 + y ** 2),
            theta: Math.atan2(y, x)
        };
    }
}
