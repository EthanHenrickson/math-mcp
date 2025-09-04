export class Trigonometric {
    /**
     * Calculate the sin of a number in radians
     * @param number - The number to find the sin of
     * @returns The sin of a number in radians
     */
    static sin(number) {
        const sin = Math.sin(number);
        return sin;
    }
    /**
     * Calculate the arcsin of a number in radians
     * @param number - The number to find the arcsin of
     * @returns The arcsin of a number in radians
     */
    static arcsin(number) {
        const arcsin = Math.asin(number);
        return arcsin;
    }
    /**
     * Calculate the cos of a number in radians
     * @param number - The number to find the cos of
     * @returns The cos of a number in radians
     */
    static cos(number) {
        const cos = Math.cos(number);
        return cos;
    }
    /**
     * Calculate the arccos of a number in radians
     * @param number - The number to find the arccos of
     * @returns The arccos of a number in radians
     */
    static arccos(number) {
        const arccos = Math.acos(number);
        return arccos;
    }
    /**
     * Calculate the tangent of a number in radians
     * @param number - The number to find the tangent of
     * @returns The tangent of a number in radians
     */
    static tan(number) {
        const tangent = Math.tan(number);
        return tangent;
    }
    /**
     * Calculate the arc tangent of a number in radians
     * @param number - The number to find the arc tangent of
     * @returns The arc tangent of a number in radians
     */
    static arctan(number) {
        const arctangent = Math.atan(number);
        return arctangent;
    }
    /**
     * Converts a radian into its equivalent value in degrees
     * @param number - The number to get the degree of
     * @returns The degree of the number
     */
    static radiansToDegrees(number) {
        const degrees = number * (180 / Math.PI);
        return degrees;
    }
    /**
     * Converts a degree into its equivalent value in radians
     * @param number - The number to get the radians of
     * @returns The radians of the number
     */
    static degreesToRadians(number) {
        const radians = number * (Math.PI / 180);
        return radians;
    }
}
