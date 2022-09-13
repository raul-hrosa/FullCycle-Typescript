import { Sequelize } from "sequelize-typescript";
import Address from '../../../../domain/customer/value-object/address';
import OrderItem from '../../../../domain/checkout/entity/order_item';
import CustomerModel from '../../../customer/repository/sequelize/customer.model';
import OrderItemModel from './order-item.model';
import ProductModel from '../../../product/repository/sequelize/product.model';

import OrderRepository from './order.repository';
import Order from '../../../../domain/checkout/entity/order';
import Customer from '../../../../domain/customer/entity/customer';
import Product from '../../../../domain/product/entity/product'; 
import OrderModel from './order.model';
import CustomerRepository from '../../../customer/repository/sequelize/customer.repository';
import ProductRepository from '../../../product/repository/sequelize/product.repository';

describe("Order repository test", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        sequelize.addModels([CustomerModel, OrderModel, OrderItemModel, ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });


    it("should create a new order", async () => {
        const customerRepository = new CustomerRepository()
        const customer = new Customer("123", "Customer 1");
        const address = new Address("Street 1", 1, "Zipcode 1", "City ");
        customer.changeAddress(address)
        await customerRepository.create(customer)

        const productRepository = new ProductRepository()
        const product = new Product("123", "Product 1", 10)
        await productRepository.create(product)

        const orderItem = new OrderItem("1", product.name, product.price, product.id, 2)
        const order = new Order("123", "123", [orderItem])

        const orderRepository = new OrderRepository()
        await orderRepository.create(order)

        const orderModel = await OrderModel.findOne({
            where: { id: order.id },
            include: ["items"]
        })

        expect(orderModel.toJSON()).toStrictEqual({
            id: "123",
            customer_id: "123",
            total: order.total(),
            items: [
                {
                    id: orderItem.id,
                    name: orderItem.name,
                    price: orderItem.price,
                    quantity: orderItem.quantity,
                    order_id: "123",
                    product_id: "123"
                }
            ]
        })

    });

    it("should update a new order", async () => {
        const customerRepository = new CustomerRepository()
        const customer = new Customer("123", "Customer 1");
        const address = new Address("Street 1", 1, "Zipcode 1", "City ");
        customer.changeAddress(address)
        await customerRepository.create(customer)

        const productRepository = new ProductRepository()
        const product = new Product("1", "Product 1", 10)
        await productRepository.create(product)

        const orderItem = new OrderItem("1", product.name, product.price, product.id, 2)
        const order = new Order("123", "123", [orderItem])

        const orderRepository = new OrderRepository()
        await orderRepository.create(order)

        const orderModel = await OrderModel.findOne({
            where: { id: order.id },
            include: ["items"]
        })

        expect(orderModel.toJSON()).toStrictEqual({
            id: order.id,
            customer_id: order.customerId,
            total: order.total(),
            items: [
                {
                    id: orderItem.id,
                    name: orderItem.name,
                    price: orderItem.price,
                    quantity: orderItem.quantity,
                    order_id: order.id,
                    product_id: orderItem.productId
                }
            ]
        })

        const product2 = new Product("2", "Product 2", 20)
        await productRepository.create(product2)
        const orderItem2 = new OrderItem("2", product2.name, product2.price, product2.id, 1)
        order.addItem(orderItem2)
        orderRepository.update(order)
        const updatedOrderModel = await OrderModel.findOne({
            where: { id: order.id },
            include: ["items"]
        })
        expect(updatedOrderModel.toJSON()).toStrictEqual({
            id: order.id,
            customer_id: order.customerId,
            total: order.total(),
            items: [
                {
                    id: order.items[0].id,
                    name: order.items[0].name,
                    price: order.items[0].price,
                    quantity: order.items[0].quantity,
                    order_id: order.id,
                    product_id: order.items[0].productId,
                },
                {
                    id: order.items[1].id,
                    name: order.items[1].name,
                    price: order.items[1].price,
                    quantity: order.items[1].quantity,
                    order_id: order.id,
                    product_id: order.items[1].productId,
                }
            ]
        })

    });

    it("should find an order", async () => {
        const customerRepository = new CustomerRepository()
        const customer = new Customer("123", "Customer 1");
        const address = new Address("Street 1", 1, "Zipcode 1", "City ");
        customer.changeAddress(address)
        await customerRepository.create(customer)
        const productRepository = new ProductRepository()
        const product = new Product("123", "Product 1", 10)
        await productRepository.create(product)
        const orderItem = new OrderItem("1", product.name, product.price, product.id, 2)
        const order = new Order("01", "123", [orderItem])
        const orderRepository = new OrderRepository()
        await orderRepository.create(order)
        const orderModel = await OrderModel.findOne({
            where: { id: order.id },
            include: ["items"]
        })
        const foundOrder = await orderRepository.find("01")
        expect(orderModel.toJSON()).toStrictEqual({
            id: foundOrder.id,
            customer_id: foundOrder.customerId,
            total: foundOrder.total(), 
            items: [
                {
                    id: foundOrder.items[0].id,
                    name: foundOrder.items[0].name,
                    price: foundOrder.items[0].price,
                    quantity: foundOrder.items[0].quantity,
                    order_id: foundOrder.id,
                    product_id: foundOrder.items[0].productId,
                }
            ]
        })
    });

    it('should find all orders', async () => {
        const customerRepository = new CustomerRepository()
        const customer = new Customer("123", "Customer 1");
        const address = new Address("Street 1", 1, "Zipcode 1", "City ");
        customer.changeAddress(address)
        await customerRepository.create(customer)

        const productRepository = new ProductRepository()
        const product1 = new Product("1", "Product 1", 10)
        await productRepository.create(product1)
        const product2 = new Product("2", "Product 2", 20)
        await productRepository.create(product2)

        const orderRepository = new OrderRepository()
        const orderItem1 = new OrderItem("1", product1.name, product1.price, product1.id, 2)
        const order1 = new Order("01", "123", [orderItem1])
        await orderRepository.create(order1)

        const orderItem2 = new OrderItem("2", product1.name, product1.price, product1.id, 1)
        const orderItem3 = new OrderItem("3", product2.name, product2.price, product2.id, 2)
        const order2 = new Order("02", "123", [orderItem2, orderItem3])
        await orderRepository.create(order2)

        const foundOrders = await orderRepository.findAll();
        const orders = [order1, order2];
        expect(orders).toEqual(foundOrders);
    })
});