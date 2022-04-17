const { response } = require('express')
const { ObjectId } = require('mongoose').Types; 
const { User, Category, Product } = require('../models');

const allowedCollections = [
    'users',
    'categories',
    'products',
    'roles'
];

const findUser = async (value= '', res = response) => {
    const isMongoID = ObjectId.isValid(value);
    if (isMongoID) {
        const user = await User.findById(value);
        res.json({
            results: (user) ? [user] : []
        });
    }

    const regex = new RegExp(value, 'i');
    const users = await User.find({  
        $or:[{name: regex}, {email: regex}],
        $and: [{status: true}]
     })

    res.json({
        results: (users) ? [users] : []
    });
}

const findCategory = async (value= '', res = response) => {
    const isMongoID = ObjectId.isValid(value);
    if (isMongoID) {
        const category = await Category.findById(value);
        res.json({
            results: (category) ? [category] : []
        });
    }

    const regex = new RegExp(value, 'i');
    const categories = await Category.find({  
        $or:[{name: regex}],
        $and: [{status: true}]
     })

    res.json({
        results: (categories) ? [categories] : []
    });
}

const findProduct = async (value= '', res = response) => {
    const isMongoID = ObjectId.isValid(value);
    if (isMongoID) {
        const product = await Product.findById(value).populate('category','name')
        res.json({
            results: (product) ? [product] : []
        });
    }

    const regex = new RegExp(value, 'i');
    const products = await Product.find({ name:regex, status: true }).populate('category','name')

    res.json({
        results: (products) ? [products] : []
    });
}

const search = (req,res= Response) => {
    
    const {collection, value} =req.params
    if (!allowedCollections.includes(collection)) {
        return res.status(400).json({
            msg: `Las colleciones permitidas son: ${allowedCollections}`,
        })
    }

    switch (collection) {
        case 'users':
            findUser(value,res)
            break;
        case 'categories':
            findCategory(value,res)
        break;
        case 'products':
            findProduct(value,res)
            break;    
        default:
            res.status(500).json({
                msg:`Default: Algo sali mal :(`
            })
    }
}

module.exports = { search }