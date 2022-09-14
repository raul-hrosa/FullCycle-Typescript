import CustomerFactory from '../../../domain/customer/factory/customer.factory';
import Address from '../../../domain/customer/value-object/address';
import UpdateCustomerUseCase from './update.customer.usecase';

const customer = CustomerFactory.createWithAddress("Jhon", new Address("Street 1", 1, "Zipcode 1", "City 1"));

const input = {
    id: customer.id,
    name: "Jhon Update",
    address: {
        street: "Street 1 Update",
        city: "City 1 Update",
        number: 456,
        zip: "Zipcode 1 Update",
    }
}

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(customer)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    }
}

describe("unit test customer update usecase", () => {
    it("should update a customer", async () => {
        const customerRepository = MockRepository()
        const usecase = new UpdateCustomerUseCase(customerRepository)

        const output = await usecase.execute(input)

        expect(output).toEqual(input)
    })
})