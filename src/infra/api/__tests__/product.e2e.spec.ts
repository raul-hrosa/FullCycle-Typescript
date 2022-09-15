import { app, sequelize } from "../express"
import request from "supertest"

describe("E2E test for produc", () => {
    beforeEach(async () => {
        await sequelize.sync({force: true})
    })

    afterAll(async () => {
        await sequelize.close()
    })

    it("should create a product", async () => {
        const response = await request(app)
            .post("/product")
            .send({
                name: "product",
                price: 100
            })
        
        expect(response.status).toBe(200);
        expect(response.body.name).toBe("product")
        expect(response.body.price).toBe(100)        
    })

    
})