import OrderItem from './order_item';

export default class Order {
    
    private _id: string;
    private _costumerId: string;
    private _items: OrderItem[] = []
    private _total: number;

    constructor(id: string, costumerId: string, items: OrderItem[]){
        this._id = id
        this._costumerId = costumerId
        this._items = items
        this._total = this.total()
        this.validate()
    }
    
    public get id() : string {
        return this._id
    }
    
    public get customerId() : string {
        return this._costumerId
    }    
    
    public get items() : OrderItem[] {
        return this._items
    }    
    
    total(): number {
        return this._items.reduce((acc, item) => acc + item.price, 0)
    }

    validate() {
        if(this._id.length === 0){
            throw new Error("Id is required");            
        }
        if(this._costumerId.length === 0){
            throw new Error("CostumerId is required");            
        }
        if(this._items.length === 0){
            throw new Error("Items are required");            
        }
        if(this._items.some(item => item.quantity <= 0)) {
            throw new Error("Quantity must be greater than zero");            
        }
    }

    addItem(item: OrderItem) {
        this._items.push(item)
    }

}