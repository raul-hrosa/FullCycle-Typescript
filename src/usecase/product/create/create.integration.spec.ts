import { Sequelize } from 'sequelize-typescript';
import ProductModel from '../../../infra/product/repository/sequelize/product.model';
import ProductRepository from '../../../infra/product/repository/sequelize/product.repository';
import CreateProductUseCase from './create.product.usecase';

describe("test create produc usecase", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should create a Product", async () => {
        const productRepository = new ProductRepository();
        const usecase = new CreateProductUseCase(productRepository)

        const input = {
            name: "Product 1",
            price: 200
        }

        const result = await usecase.execute(input)
        expect(result).toEqual({
            id: expect.any(String),
            name:  input.name,
            price: input.price
        })

    })

})