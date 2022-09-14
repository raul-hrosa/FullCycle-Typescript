import Product from '../../../domain/product/entity/product'
import UpdateProductUseCase from './update.product.usecase'

const product = new Product("1", "Product 1", 100)

const input = {
    id: product.id,
    name: "Product Updated",
    price: 200
}

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn()
    }
}


describe("unit test product update usecase", () => {
    it("should update a product", async () => {
        const productRepository = MockRepository()
        const usecase = new UpdateProductUseCase(productRepository)
        const output = await usecase.execute(input)
        expect(output).toEqual(input)
    })
})