import Order from './order'
import OrderItem from './order_item'

describe('Order unit tests', () => {
    it('should trow error when id is empty', () => {
        expect(() => new Order("", "123", [])).toThrowError("Id is required")
    })

    it('should trow error when costumerId is empty', () => {
        expect(() => new Order("123", "", [])).toThrowError("CostumerId is required")
    })

    it('should trow error when item has no provided', () => {
        expect(() => new Order("123", "123", [])).toThrowError("Items are required")
    })

    it('should calculated total', () => {
        const item = new OrderItem("i1","item 1", 100, "p1", 2)
        const item2 = new OrderItem("i2","item 2", 200, "p2", 2)
        const order = new Order("o1", "c1", [item])        
        expect(order.total()).toBe(200)
        const order2 = new Order("o2", "c2", [item, item2])
        expect(order2.total()).toBe(600)
    })

    it('should throw error if the item quantity is less or equal zero', () => {
        expect(() => {
            const item = new OrderItem("i1","item 1", 100, "p1", 0)
            const order = new Order("o1", "c1", [item])
        }).toThrowError("Quantity must be greater than zero")
    })

    it('should add a new item', () => {
        const item = new OrderItem("i1","item 1", 100, "p1", 2)
        const order = new Order("o1", "c1", [item])        
        expect(order.total()).toBe(200)
        expect(order.items.length).toBe(1)
        const item2 = new OrderItem("i2","item 2", 200, "p2", 2)
        order.addItem(item2)
        expect(order.total()).toBe(600)
        expect(order.items.length).toBe(2)
    })

})