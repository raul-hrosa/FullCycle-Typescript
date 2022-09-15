import { app, sequelize } from "../express"
import request from "supertest"

describe("E2E test for customer", () => {
    beforeEach(async () => {
        await sequelize.sync({force: true})
    })

    afterAll(async () => {
        await sequelize.close()
    })

    it("should create a customer", async () => {
        const response = await request(app)
            .post("/customer")
            .send({
                name: "jhon",
                address: {
                    street: "street",
                    city: "city",
                    number: 123,
                    zip: "123"
                }
            })
        
        expect(response.status).toBe(200);
        expect(response.body.name).toBe("jhon")
        expect(response.body.address.street).toBe("street")
        expect(response.body.address.city).toBe("city")
        expect(response.body.address.number).toBe(123)
        expect(response.body.address.zip).toBe("123")
    })

    
    it("should not create a customer", async () => {
        const response = await request(app)
            .post("/customer")
            .send({
                name: "jhon"
            })
        
        expect(response.status).toBe(500);
    })

    it("should list all customers", async () => {
        const response1 = await request(app)
            .post("/customer")
            .send({
                name: "jhon",
                address: {
                    street: "street",
                    city: "city",
                    number: 123,
                    zip: "123"
                }
            })        
        expect(response1.status).toBe(200);

        const response2 = await request(app)
        .post("/customer")
        .send({
            name: "jane",
            address: {
                street: "street2",
                city: "city2",
                number: 456,
                zip: "456"
            }
        })
        expect(response2.status).toBe(200);

        const listResponse = await request(app).get("/customer").send();
        expect(listResponse.status).toBe(200)
        expect(listResponse.body.customers.length).toBe(2)
        const customer = listResponse.body.customers[0]
        expect(customer.name).toBe("jhon")
        expect(customer.address.street).toBe("street")
        const customer2 = listResponse.body.customers[1]
        expect(customer2.name).toBe("jane")
        expect(customer2.address.street).toBe("street2")
    })
})