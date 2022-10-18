export default function fixCarValue(carValue) {
    if (carValue < 1000) return carValue * 1000
    return Number(carValue)
}