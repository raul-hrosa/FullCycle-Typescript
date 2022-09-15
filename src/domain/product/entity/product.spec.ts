import Product from './product'

describe('PRoduct unit tests', () => {
    it('should trow error when id is empty', () => {
        expect(() => new Product("", "Product 1", 100)).toThrowError("product: Id is required")
    })
    
    it('should trow error when name is empty', () => {
        expect(() => new Product("123", "", 100)).toThrowError("product: Name is required")
    })

    it('should trow error when price is less than zero', () => {
        expect(() => new Product("123", "Product 1", -1)).toThrowError("product: Price must be greater than zero")
    })

    it('should trow error when id and name is empty and price is less than zero', () => {
        expect(() => new Product("", "", -1)).toThrowError("product: Id is required,product: Name is required,product: Price must be greater than zero")
    })

    it('should change name', () => {
        const product = new Product("123", "Product 1", 100)
        product.changeName("Product 2")
        expect(product.name).toBe("Product 2")
    })

    it('should change price', () => {
        const product = new Product("123", "Product 1", 100)
        product.changePrice(200)
        expect(product.price).toBe(200)
    })
})