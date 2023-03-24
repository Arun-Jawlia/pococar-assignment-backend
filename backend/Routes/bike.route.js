const express = require('express');
const { BikeModel } = require('../Models/bike.model');

const BikeRouter = express.Router()


BikeRouter.get('/',async(req,res)=>
{
    try {
       const bikes =  await BikeModel.find()
       res.send(bikes)
        
    } catch (error) {
        console.log(error.message)
    }
})


BikeRouter.post('/add',async(req,res)=>
{
    const {img, bikename,price, brand} = req.body
    const newBike = new BikeModel({
        brand,
        bikename,
        price,
        img
    })
    await newBike.save()
    res.send({message:'Bike added successfully'})
})
















module.exports = {BikeRouter}