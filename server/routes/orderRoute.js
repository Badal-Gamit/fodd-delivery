const exress=require('express');
const { isverify, isadmin } = require('../middleware/jwt');
const {clientTokenController,CheckoutController, UserOrderController, orderController, updateOrderController}=require('../Controller/orderController')
const  router=exress.Router();
router.get('/client-token',isverify,clientTokenController)
router.post('/user-checkout/:id',isverify,CheckoutController)
router.get('/user-order/:id',isverify,UserOrderController)
router.get('/order-list',orderController)
router.patch('/order-change/:id',updateOrderController)


module.exports=router