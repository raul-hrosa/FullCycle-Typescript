import { Sequelize } from 'sequelize-typescript';
import Product from '../../../domain/product/entity/product';
import ProductModel from '../../../infra/product/repository/sequelize/product.model';
import ProductRepository from '../../../infra/product/repository/sequelize/product.repository';
import FindProductUseCase from './find.product.usecase';

describe("test find product usecase", () => {
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

    it("should find a Product", async () => {
        const product = new Product("1", "Product 1", 100)
        const productRepository = new ProductRepository();
        const usecase = new FindProductUseCase(productRepository)
        await productRepository.create(product);

        const input = {
            id: "1"
        }

        const result = await usecase.execute(input)
        expect(result).toEqual({
            id: product.id,
            name:  product.name,
            price: product.price
        })

    })

})