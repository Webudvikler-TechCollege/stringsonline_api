import express from 'express'
const MainRouter = express.Router()
import { Authorize } from '../Middleware/auth.js'

import ProductController from '../Controllers/product.controller.js'
import BrandController from '../Controllers/brand.controller.js'
import ReviewController from '../Controllers/review.controller.js'
import ProductGroupController from '../Controllers/productgroup.controller.js'
import CartController from '../Controllers/cart.controller.js'
import OrderController from '../Controllers/order.controller.js'
import OrderLineController from '../Controllers/orderline.controller.js'

// Section Routes
const productcontrol = new ProductController
MainRouter.get('/products', (req, res) => { productcontrol.list(req, res) })
MainRouter.get('/products/search/:keyword', (req, res) => { productcontrol.list(req, res) })
MainRouter.get('/products/:productgroup_slug', (req, res) => { productcontrol.list(req, res) })
MainRouter.get('/products/details/:product_slug', (req, res) => { productcontrol.details(req, res) })

// Productgroup Routes
const productgroupcontrol = new ProductGroupController
MainRouter.get('/productgoups', (req, res) => { productgroupcontrol.list(req, res) })
MainRouter.get('/productgoups/:id([0-9]*)', (req, res) => { productgroupcontrol.details(req, res) })

// Brands Routes
const brandcontrol = new BrandController
MainRouter.get('/brands', (req, res) => { brandcontrol.list(req, res) })
MainRouter.get('/brands/:id([0-9]*)', (req, res) => { brandcontrol.details(req, res) })

// Cart Routes
const cartcontrol = new CartController
MainRouter.get('/cart', Authorize, (req, res) => { cartcontrol.list(req, res) })
MainRouter.post('/cart', Authorize, (req, res) => { cartcontrol.create(req, res) })
MainRouter.patch('/cart', Authorize, (req, res) => { cartcontrol.update(req, res) })
MainRouter.delete('/cart/:id([0-9]*)', Authorize, (req, res) => { cartcontrol.remove(req, res) })
MainRouter.delete('/cart/all', Authorize, (req, res) => { cartcontrol.empty(req, res) })

// Order Routes
const ordercontrol = new OrderController
MainRouter.get('/orders', Authorize, (req, res) => { ordercontrol.list(req, res) })
MainRouter.get('/orders/:id([0-9]*)', Authorize, (req, res) => { ordercontrol.details(req, res) })
MainRouter.post('/orders', Authorize, (req, res) => { ordercontrol.create(req, res) })
MainRouter.delete('/orders/:id([0-9]*)', Authorize, (req, res) => { ordercontrol.remove(req, res) })

// Orderline Routes
const orderlinecontrol = new OrderLineController
MainRouter.post('/orderlines', Authorize, (req, res) => { orderlinecontrol.create(req, res) })
MainRouter.delete('/orderlines/:id([0-9]*)', Authorize, (req, res) => { orderlinecontrol.remove(req, res) })

// Review Routes
const reviewcontrol = new ReviewController
MainRouter.get('/reviews/:org_id([0-9]*)', (req, res) => { reviewcontrol.list(req, res) })
MainRouter.get('/reviews/details/:id([0-9]*)', (req, res) => { reviewcontrol.details(req, res) })
MainRouter.post('/reviews', Authorize, (req, res) => { reviewcontrol.create(req, res) })
MainRouter.put('/reviews', Authorize, (req, res) => { reviewcontrol.update(req, res) })
MainRouter.delete('/reviews/:id([0-9]*)', Authorize, (req, res) => { reviewcontrol.remove(req, res) })


export default MainRouter