import Order from '../../domain/entity/order';
import OrderItemModel from '../db/sequelize/model/order-item.model';
import OrderModel from '../db/sequelize/model/order.model';
import OrderRrepositoryIterface from '../../domain/repository/order-repository.interface'
import OrderItem from '../../domain/entity/order_item';

export default class OrderRepository implements OrderRrepositoryIterface {
    async create(entity: Order): Promise<void> {
        await OrderModel.create(
            {
                id: entity.id,
                customer_id: entity.customerId,
                total: entity.total(),
                items: entity.items.map((item) => ({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    product_id: item.productId,
                    quantity: item.quantity
                }))
            }, 
            {
                include: [{model: OrderItemModel}]
            }
        );
    }

    async update(entity: Order): Promise<void> {
        entity.items.map((item) => {
            OrderItemModel.upsert({
                id: item.id,
                name: item.name,
                price: item.price,
                product_id: item.productId,
                quantity: item.quantity,
                order_id: entity.id
            })
        })

        await OrderModel.update({
            customer_id: entity.customerId,
            total: entity.total(),
        }, {
            where: {id: entity.id}
        })
    }

    async find(id: string): Promise<Order> {
        const orderModel = await OrderModel.findOne({
            where: { id },
            include: [{model: OrderItemModel}]
        })
        const items = this.extractOrderItems(orderModel.items)
        return new Order(orderModel.id, orderModel.customer_id, items)
    }

    async findAll(): Promise<Order[]> {
        const orderModel = await OrderModel.findAll({
            include: [{model: OrderItemModel}]
        })
        const orders = orderModel.map((order) => {
            const items = this.extractOrderItems(order.items)
            return new Order(order.id, order.customer_id, items)
        })
        return orders;
    }

    private extractOrderItems(items: OrderItemModel[]): OrderItem[] {
        return items.map((item) => {
            return new OrderItem(item.id, item.name, (item.price / item.quantity), item.product_id, item.quantity)     
        })
    }
}