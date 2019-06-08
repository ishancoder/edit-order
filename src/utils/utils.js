export function generateId(min=1000000, max=4000000) {
    return Math.floor((max - min) * Math.random()) + min;
}