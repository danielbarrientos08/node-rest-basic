const { response,request } = require('express');
const { json } = require('express/lib/response');
const { Category } = require('../models');
const category = require('../models/category');




const listCategories = async (req, res = response)=> {

    const { limit=5,from=0 } = req.query
    const filter = {status:true}


    const [total,data] = await Promise.all([
        Category.countDocuments( filter ),
        Category.find(filter).populate('user')
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

const getCategory = async (req, res = response)=> {

    const {id} = req.params
    const category = await Category.findById(id).populate('user')

    res.status(200).json({
        category
    });
};

const createCategory = async (req, res = response)=> 
{
    const name = req.body.name.toUpperCase()
    const categoryDB = await Category.findOne({name})

    if(categoryDB){
        return res.status(422).json({
            msg:`La categoria ${name} ya existe`
        })
    }
    //
    const data = {
        name,
        user: req.user._id
    }

    const category = new Category(data)
    await category.save()

    res.status(201).json({
        category
    });
};


const updateCategory = async (req, res = response)=> {

    const name = req.body.name.toUpperCase()
    const {id} = req.params

    const categoryDB = await Category.findOne({name})

    if(categoryDB && categoryDB._id != id){
        return res.status(422).json({
            msg:`La categoria ${name} ya existe`
        })
    }
    //
    const data = {
        name,
        user: req.user._id
    }

    const category =  await Category.findByIdAndUpdate(id,data)


    res.status(201).json({
        category
    });
};

const deleteCategory = async (req, res = response)=> {

    const {id} = req.params

    const category = await Category.findByIdAndUpdate(id,{status:false}) 
    res.status(200).json({
        category
    });
};

module.exports = {
   listCategories,
   getCategory,
   createCategory,
   updateCategory,
   deleteCategory
}