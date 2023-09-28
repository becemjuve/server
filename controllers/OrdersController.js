const mongoose = require("mongoose")
const Order = require('../models/OrderModel')

//create New order

exports.createNewOrder = async(req,res)=>{
  try {
    const {total, cartProducts} = req.body
    const {user} = req
    const products = cartProducts.map(prod=>{
        return{
            product: prod._id,
            quantity: prod.count
        }
    })
    const totalAmount = total
    const order = await Order.create({
        user:user._id,
        products,
        totalAmount
    })
    res.json({message: "Order saved please check your Number we will call you"})
    
  } catch (error) {
    
  }
}

// get all Order ADMIN

exports.getAllOrder = async(req,res)=>{
  try {
    let allOrders = await Order.find()
    allOrders= await Promise.all(
      allOrders = allOrders.map(async(order)=>{
      const item = await Order.findById(order._id)
        .populate("user", "firstName lastName email phoneNumber")
        .populate("products.product", "name price category")
        .exec()
        return item
    })
    )
    
    res.json({allOrders})
  } catch (error) {
    
  }
}
// Get Order USER
exports.getUserOrders = async(req,res)=>{
  try {
    const id = req.user._id;
    const orders = await Order.find({user:id})
    .populate("products.product", "name price category")
    res.json({orders})
  } catch (error) {
    
  }
}
//Get One Order 
exports.getOneOrder = async(req,res)=>{
  try {
    const id = req.params.id;
    const order = await Order.findById(id)
    .populate("user", "firstName lastName email phoneNumber")
    .populate("products.product", "name price category image stock")
    .exec()
    res.json({order})
  } catch (error) {
    
  }
}

//Update Order
exports.updateOrder = async(req,res)=>{
  try {
    const {id} = req.params;
    const {action} = req.body;
    const order = await Order.findById(id)
    order.status = action
    await order.save()
    res.json({message: "Order Updated"})

  } catch (error) {
    
  }
}