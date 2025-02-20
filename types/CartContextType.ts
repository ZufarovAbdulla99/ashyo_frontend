export interface CartContextType {
    totalPrices: number;
    setTotalPrices: (price: number) => void;
    updateItemPrice: (oldPrice: number, newPrice: number) => void;
}