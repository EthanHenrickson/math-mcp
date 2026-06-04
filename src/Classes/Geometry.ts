export class Geometry {
    static haversine(lat1: number, lon1: number, lat2: number, lon2: number): number {
        const R = 6371;
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const a = Math.sin(dLat / 2) ** 2 +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) ** 2;
        return 2 * R * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
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
}
