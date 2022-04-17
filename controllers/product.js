const { response,request } = require('express');
const { Product } = require('../models');





const listProducts = async (req, res = response)=> {

    const { limit=5,from=0 } = req.query
    const filter = {status:true}


    const [total,data] = await Promise.all([
        Product.countDocuments( filter ),
        Product.find(filter).populate('category').populate('user')
            .skip(Number(from))
            .limit(Number(limit))         
    ])

    res.status(200).json({
        total,
        data,
        from: Number(from),
        limit: Number(limit)
    });
};

const getProduct = async (req, res = response)=> {

    const {id} = req.params
    const product = await Product.findById(id).populate('category').populate('user')

    res.status(200).json({
        product
    });
};

const createProduct = async (req, res = response)=> 
{
    const { name,price, category, description } = req.body
    const categoryDB = await Product.findOne({name})


    const data = {
        name,
        user: req.user._id,
        price,
        category,
        description
    }

    const product = new Product(data)
    await product.save()

    res.status(201).json({
        product
    });
};


const updateProduct = async (req, res = response)=> {

    const { name,price, category, description } = req.body
    const {id} = req.params

    const productDB = await Product.findOne({name})

    if(productDB && productDB._id != id){
        return res.status(422).json({
            msg:`El producto ${name} ya existe`
        })
    }
    //
    const data = {
        name,
        price,
        category,
        description,
        user: req.user._id
    }
    const product =  await Product.findByIdAndUpdate(id,data)

    res.status(201).json({
        product
    });
};

const deleteProduct = async (req, res = response)=> {

    const {id} = req.params

    const product = await Product.findByIdAndUpdate(id,{status:false}) 
    res.status(200).json({
        product
    });
};

module.exports = {
   listProducts,
   getProduct,
   createProduct,
   updateProduct,
   deleteProduct
}