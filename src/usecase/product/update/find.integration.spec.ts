import { Sequelize } from 'sequelize-typescript';
import Product from '../../../domain/product/entity/product';
import ProductModel from '../../../infra/product/repository/sequelize/product.model';
import ProductRepository from '../../../infra/product/repository/sequelize/product.repository';
import UpdateProductUseCase from './update.product.usecase';

describe("test fin customer usecase", () => {
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

    it("should update a Product", async () => {
        const productRepository = new ProductRepository();
        const product = new Product("1", "Product 1", 100)
        await productRepository.create(product);

        const usecase = new UpdateProductUseCase(productRepository)

        const input = {
            id: product.id,
            name: "Product 2",
            price: 200
        }

        const result = await usecase.execute(input)
        expect(result).toEqual({
            id: input.id,
            name:  input.name,
            price: input.price
        })

    })

})