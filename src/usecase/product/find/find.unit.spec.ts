import Product from '../../../domain/product/entity/product'
import FindProductUseCase from './find.product.usecase'

const product = new Product("123", "Product 1", 100)

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn()
    }
}


describe("unit test find product usecase", () => {
    it("should find a product", async () => {
        const productRepository = MockRepository()
        const usecase = new FindProductUseCase(productRepository)
        const input = {
            id: "123"
        }
        const output = await usecase.execute(input)
        expect(output).toEqual({
            id: product.id,
            name: product.name,
            price: product.price
        })
    })
})