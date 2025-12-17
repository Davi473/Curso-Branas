import crypto from "crypto";

export default class Order {
    constructor(
        readonly orderId: string,
        readonly accountId: string,
        readonly marketId: string,
        readonly side: string,
        readonly quantity: number,
        readonly price: number,
        public fillQuantity: number,
        readonly fillPrice: number,
        public status: string,
        readonly timestamp: Date
    ) {
    }

    public static create (accountId: string, marketId: string, side: string, quantity: number, price: number) {
        const orderId = crypto.randomUUID();
        const status = "open";
        const timestamp = new Date();
        const fillQuantity = 0;
        const fillPrice = 0;
        return new Order(orderId, accountId, marketId, side, quantity, price, fillQuantity, fillPrice, status, timestamp);
    }

    public getAvailableQuantity () {
        return this.quantity - this.fillQuantity;
    }

    public fill (quantity: number) {
        this.fillQuantity += quantity;
        if (this.getAvailableQuantity() === 0) {
            this.status = "closed";
        }   
    }
}