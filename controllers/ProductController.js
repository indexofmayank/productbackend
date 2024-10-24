const { default: mongoose } = require('mongoose');
const Product = require('../models/ProductModel');


exports.createProduct = async (req, res) => {
    try {
        console.log(req.body);
        const {
            name,
            product_status,
            category,
            add_ons,
            search_tags,
            price,
            sku,
            barCode,
            tax,
            description,
            featured
        } = req.body;
        const newProduct = await Product.create({
            name,
            product_status,
            category,
            add_ons,
            search_tags,
            price,
            sku,
            barCode,
            tax,
            description,
            featured
        });
        if(!newProduct) {
            return res.status(404).json({
                success: false,
                message: 'Not able to create a new product'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Product created successfully',
            data: newProduct
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

exports.getAllProducts = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = parseInt(page - 1) * limit;
        
        const products = await Product.aggregate([
            {   
                $lookup: {
                    from: 'categories',
                    localField: 'category',
                    foreignField: '_id',
                    as: 'categoryDetails'
                }
            },
            {
                $unwind: '$categoryDetails'
            },
            {
                $project: {
                    name: {$ifNull: ["$name", "N/a"]},
                    category: '$categoryDetails.name',
                    product_status: {$ifNull: ["$product_status", "N/a"]},
                    add_ons: {$ifNull: ["$add_ons", "N/a"]},
                    search_tags: {$ifNull: ["$search_tags", "N/a"]},
                    price: {$ifNull: ["$price", "N/a"]},
                    sku: {$ifNull: ["$sku", "N/a"]},
                    price: {$ifNull: ["$price", "N/a"]},
                    barCode: {$ifNull: ["$barCode", "N/a"]},
                    tax: {$ifNull: ["$tax", "N/a"]},
                    description: {$ifNull: ["$description", "N/a"]}
                }
            },
            {$sort: {name: 1}},
            {$skip: skip},
            {$limit: limit}
        ]);

        if(!products) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        const totalProduct = await Product.countDocuments();

        return res.status(200).json({
            success: true,
            page,
            limit,
            totalPage: Math.ceil(totalProduct / limit),
            totalProduct,
            data: products
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

exports.getProductById = async (req, res) => {
    try {
        const product = await Product.aggregate([
            {
                $match: {_id: new mongoose.Types.ObjectId(req.params.id)}
            },
            {   
                $lookup: {
                    from: 'categories',
                    localField: 'category',
                    foreignField: '_id',
                    as: 'categoryDetails'
                }
            },
            {
                $unwind: '$categoryDetails'
            },
            {
                $project: {
                    name: {$ifNull: ["$name", "N/a"]},
                    category: '$categoryDetails.name',
                    product_status: {$ifNull: ["$product_status", "N/a"]},
                    add_ons: {$ifNull: ["$add_ons", "N/a"]},
                    search_tags: {$ifNull: ["$search_tags", "N/a"]},
                    price: {$ifNull: ["$price", "N/a"]},
                    sku: {$ifNull: ["$sku", "N/a"]},
                    price: {$ifNull: ["$price", "N/a"]},
                    barCode: {$ifNull: ["$barCode", "N/a"]},
                    tax: {$ifNull: ["$tax", "N/a"]},
                    description: {$ifNull: ["$description", "N/a"]}
                }
            }
        ]);
        if(!product) {
            return res.status(404).json({
                success: false,
                message: 'Not found'
            });
        }

        return res.status(200).json({
            success: true,
            data: product
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

exports.deleteProductById = async (req, res) => {
    try {
        const {id} = req.params;
        const deletedProduct = await Product.findById(req.params.id);
        if(!deletedProduct) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }
        await deletedProduct.remove();
        return res.status(200).json({
            success: true,
            message: 'Deleted successfully'
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

exports.updateProductById = async (req, res) => {
    try {
        const {id} = req.params;
        const updatedData = req.body;
        const result = await Product.findByIdAndUpdate(id, updatedData, {new: true});
        if(!result) {
            return res.status(404).json({
                success: false,
                message: 'Product not found',
            });
        }
        return res.status(200).json({
            success: true,
            message: "Product update successfully"
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}