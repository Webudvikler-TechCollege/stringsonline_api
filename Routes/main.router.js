import express from 'express'
const MainRouter = express.Router()
import { Authorize } from '../Middleware/auth.js'

import ProductController from '../Controllers/product.controller.js'
import BrandController from '../Controllers/brand.controller.js'
import ReviewController from '../Controllers/review.controller.js'
import ProductGroupController from '../Controllers/productgroup.controller.js'

// Section Routes
const productcontrol = new ProductController
MainRouter.get('/products', (req, res) => { productcontrol.list(req, res) })
MainRouter.get('/products/search/:keyword', (req, res) => { productcontrol.list(req, res) })
MainRouter.get('/products/:productgroup_slug', (req, res) => { productcontrol.list(req, res) })
MainRouter.get('/products/details/:id([0-9]*)', (req, res) => { productcontrol.details(req, res) })

// Productgroup Routes
const productgroupcontrol = new ProductGroupController
MainRouter.get('/productgoups', (req, res) => { productgroupcontrol.list(req, res) })
MainRouter.get('/productgoups/:id([0-9]*)', (req, res) => { productgroupcontrol.details(req, res) })

// Brands Routes
const brandcontrol = new BrandController
MainRouter.get('/brands', (req, res) => { brandcontrol.list(req, res) })
MainRouter.get('/brands/:id([0-9]*)', (req, res) => { brandcontrol.details(req, res) })

// Review Routes
const reviewcontrol = new ReviewController
MainRouter.get('/reviews/:org_id([0-9]*)', (req, res) => { reviewcontrol.list(req, res) })
MainRouter.get('/reviews/details/:id([0-9]*)', (req, res) => { reviewcontrol.details(req, res) })
MainRouter.post('/reviews', Authorize, (req, res) => { reviewcontrol.create(req, res) })
MainRouter.put('/reviews', Authorize, (req, res) => { reviewcontrol.update(req, res) })
MainRouter.delete('/reviews/:id([0-9]*)', Authorize, (req, res) => { reviewcontrol.remove(req, res) })


export default MainRouter