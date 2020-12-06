import asynHandler from 'express-async-handler'
import Product from '../models/productModel.js'



// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asynHandler( async (req, res) => {
    const products = await Product.find({})

    res.json(products)
})


// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductsById = asynHandler( async (req, res) => {
    const product = await Product.findById(req.params.id)

    if(product){
        res.json(product)

    } else {
        res.status(404)
        throw new Error('product not found')
    }
})

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  private/ admin
const deleteProduct = asynHandler( async (req, res) => {
    const product = await Product.findById(req.params.id)

    if(product){
        await product.remove()
        res.json({message: 'product removed'})
    } else {
        res.status(404)
        throw new Error('product not found')
    }
})


// @desc    Create a product
// @route   Post /api/products
// @access  private/ admin
const createProduct = asynHandler( async (req, res) => {
    const product = new Product({
        name: 'Sample name',
        price: 0,
        user: req.user._id,
        image: '/images/samples.jpg',
        brand: 'Sample brand',
        category: 'Sample category',
        countInStock: 0,
        numReviews: 0,
        description: 'Sample description'
    })

    const createdProduct = await product.save()
    res.status(201).json(createdProduct)

})

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  private/ admin
const updateProduct = asynHandler( async (req, res) => {
    const {name, price, description, image, brand, category, countInStock} = req.body

    const product = await Product.findById(req.params.id)

    if(product) {
        product.name = name
        product.price = price
        product.description = description
        product.image = image
        product.brand = brand
        product.category = category
        product.countInStock = countInStock

        const updateProduct = await product.save()
        res.json(updateProduct)
        
    } else {
        res.status(404)
        throw new Error('product not found')
    }


})



export {
    getProducts,
    getProductsById, 
    deleteProduct,
    createProduct, 
    updateProduct
}