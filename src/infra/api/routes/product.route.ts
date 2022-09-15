import express,{ Request, Response } from 'express'
import CreateProductUseCase from '../../../usecase/product/create/create.product.usecase'
import ProductRepository from '../../product/repository/sequelize/product.repository'

export const productRoute = express.Router()

productRoute.post('/', async(req: Request, res:Response) => {
    const usecase = new CreateProductUseCase(new ProductRepository())
    try {
        const productDto = {
            name: req.body.name,
            price: req.body.price
        }
        const output = usecase.execute(productDto)
        res.send(output)
    }catch (err){
        res.status(500).send(err)
    }
})

