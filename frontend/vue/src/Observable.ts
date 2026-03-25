
export default class Observable {
    handlers: { event: string,  callback: Function }[] = [];

    public register(event: string, callback: Function): void {
        this.handlers.push({ event, callback });
    }
    public async notifyAll(event: string, data: any): Promise<void> {
        for (const handler of this.handlers) {
            if (event === handler.event) {
                await handler.callback(data);
            }
        }
    }
}