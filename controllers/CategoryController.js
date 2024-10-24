const Category = require('../models/CategoryModel');
const mongoose = require('mongoose');

exports.createCategory = async (req, res) => {
    try {
        const {
            name, status
        } = req.body;

        const newCategory = await Category.create({
            name, status
        })

        if(!newCategory) {
            return res.status(500).json({
                success: false,
                message: 'Not able to create category'
            });
        }
        return res.status(200).json({
            success: true,
            message: 'it is working'
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

exports.getAllCategory = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
    
        
        const categories = await Category.aggregate([
           {
            $project: {
                name: {$ifNull: ["$name", "N/a"]},
                status: {$ifNull: ["$status", "N/a"]}
            }
           },
           {$sort: {name: 1}},
           {$skip: skip},
           {$limit: limit}
        ]);

        const totalCategory = await Category.countDocuments();

        return res.status(200).json({
            success: true,
            page,
            limit,
            totalPage: Math.ceil(totalCategory / limit),
            totalCategory,
            data: categories
        });

    } catch (error) {
        return res.status(500).json({ 
            success: false,
            message: error.message
        });
    }
}

exports.getCategoryById = async (req, res) => {

    try {
        const {id} = req.params;

        const category = await Category.aggregate([
            {
                $match: {_id: new mongoose.Types.ObjectId(id)}
            },
            {
                $project: {
                    name: {$ifNull: ["$name", "N/a"]},
                    status: {$ifNull: ["$status", "N/a"]}
                }
            }
        ]);

        return res.status(200).json({
            success: true,
            message: 'it working bro',
            data: category
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

exports.deleteCategoryById = async (req, res) => {
    try {
        const {id} = req.params;
        const category = await Category.findById(id);
        console.log(category);
        if(!category) {
            return res.status(404).json({
                success: false,
                message: 'Category not found',
            });
        }
        await category.remove();
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

exports.updateCategoryById = async (req, res) => {
    try {
        const {id} = req.params;
        const updatedData = req.body;
        const result = await Category.findByIdAndUpdate(id, updatedData, {new: true});
        if(!result) {
            return res.status(404).json({
                success: false,
                message: 'Category not found'
            });
        }
        return res.status(200).json({
            success: true,
            message: 'Category updated successfully'
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}