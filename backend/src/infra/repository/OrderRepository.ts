export default interface OrderRepository {
    save (order: Order): Promise<void>;
    getById (orderId: string): Promise<Order>;
}