import Address from './address'
import Customer from './customer'

describe('Costumer unit tests', () => {
    it('should trow error when id is empty', () => {
        expect(() => new Customer("", "Name"))
    })
    
    it('should trow error when name is empty', () => {
        expect(() => new Customer("123", ""))
    })

    it('should change name', () => {
        const customer = new Customer("123", "Name");
        customer.changeName("Another name")
        expect(customer.name).toBe("Another name")
    })

    it('should activate customer', () => {
        const customer = new Customer("1", "Name");
        const address = new Address("Street 1", 123, "13444-000", "São Paulo")        
        customer.changeAddress(address)
        customer.activate()
        expect(customer.isActive()).toBe(true)
    })

    it('should deactivate customer', () => {
        const customer = new Customer("1", "Name");
        customer.deactivate()
        expect(customer.isActive()).toBe(false)
    })

    it('should throw error if address is undefined when activate a costumer', () => {
        const customer = new Customer("1", "Name");        
        expect(() => customer.activate() ).toThrowError("Address is mandatory to activate costumer")
    })

    it('should add reward points', () => {
        const customer = new Customer("1", "Name");        
        expect(customer.rewardPoints).toBe(0)
        customer.addRewardPoints(10)
        expect(customer.rewardPoints).toBe(10)
        customer.addRewardPoints(10)
        expect(customer.rewardPoints).toBe(20)
    })
})