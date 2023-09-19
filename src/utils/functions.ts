export const convertPrice = (price: string): number => {
    return Number(Number(price).toFixed(2));
}