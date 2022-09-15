import EnviaConsoleLog1Handler from '../event/handler/envia-consolelog1.handler'
import EnviaConsoleLog2Handler from '../event/handler/envia-consolelog2.handler'
import Address from '../value-object/address'
import Customer from './customer'
import EnviaConsoleLogHandler from '../event/handler/envia-consolelog.handler'
import EventDispatcher from '../../@shared/event/event-dispatcher'
import CustomerCreatedEvent from '../event/customer-created.event'
import AddressChangedEvent from '../event/address-changed.event'

describe('Costumer unit tests', () => {
    it('should trow error when id is empty', () => {
        expect(() => new Customer("", "Name")).toThrowError("customer: Id is required")
    })
    
    it('should trow error when name is empty', () => {
        expect(() => new Customer("123", "")).toThrowError("customer: Name is required")
    })

    it('should trow error when id and name are empty', () => {
        expect(() => new Customer("", "")).toThrowError("customer: Id is required,customer: Name is required")
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

    it("should notify when a new Customer is created", () => {
        const eventDispatcher = new EventDispatcher()
        const event1Handler = new EnviaConsoleLog1Handler()
        const event2Handler = new EnviaConsoleLog2Handler()
        const customer = new Customer("1", "Name");
        eventDispatcher.register("CustomerCreatedEvent", event1Handler);
        eventDispatcher.register("CustomerCreatedEvent", event2Handler);
        const spyEventHandler1 = jest.spyOn(event1Handler, "handle");
        const spyEventHandler2 = jest.spyOn(event2Handler, "handle");
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(2)
        const customerCreatedEvent = new CustomerCreatedEvent({
            name: customer.name
        })
        eventDispatcher.notify(customerCreatedEvent)
        expect(spyEventHandler1).toHaveBeenCalled()
        expect(spyEventHandler2).toHaveBeenCalled()           
    });

    it("should notify when customer change adrress", () => {
        const eventDispatcher = new EventDispatcher()
        const eventHandler = new EnviaConsoleLogHandler()
        const customer = new Customer("1", "Name");
        const address = new Address("Street 1", 123, "13444-000", "São Paulo")        
        customer.changeAddress(address)

        eventDispatcher.register("AddressChangedEvent", eventHandler);
        
        const spyEventHandler = jest.spyOn(eventHandler, "handle");
        expect(eventDispatcher.getEventHandlers["AddressChangedEvent"].length).toBe(1)
        
        const addressChangedEvent = new AddressChangedEvent({
            id: customer.id,
            name: customer.name,
            address: customer.adrress.toString()
        })

        eventDispatcher.notify(addressChangedEvent)
        expect(spyEventHandler).toHaveBeenCalled()
           
    })
})