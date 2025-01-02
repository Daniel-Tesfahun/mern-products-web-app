import mongoose from "mongoose";
import ProductModel from "../models/ProductModel.js";

export const createProduct = async (req, res) => {
    const product = req.body;

    if (!product.name || !product.price || !product.image) {
        return res.status(400).json({ success: false, message: "Please provide all required fields" });
    }

    const checkProduct = await ProductModel.findOne({ name: product.name });

    try {
        if (!checkProduct) {
            const newProduct = new ProductModel(product);

            await newProduct.save();
            res.status(200).json({ success: true, message: "new product created", data: newProduct });
        } else {
            res.status(403).json({ success: false, message: "Product already exists" });
        }

    } catch (error) {
        console.log("Error in Creating Product: ", error.message);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export const getAllProducts = async (req, res) => {
    try {
        const allProducts = await ProductModel.find({});
        res.status(200).json({ success: true, data: allProducts });
    } catch (error) {
        console.log("Erorr in Fetching Products: ", error.message);
        res.status(500).json({ sucecss: false, message: "Internal server error" });
    }
};

export const deleteProduct = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        console.log("Invalid Product ID");
        return res.status(404).json({ success: false, message: "Invalid Product ID" });
    }

    try {
        await ProductModel.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Product deleted" });
    } catch (error) {
        console.log("Error in Deleting Product: ", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const updateProduct = async (req, res) => {
    const { id } = req.params;

    const product = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        console.log("Invalid Product ID");
        return res.status(404).json({ success: false, message: "Invalid Product ID" });
    }

    try {
        const updatedProduct = await ProductModel.findByIdAndUpdate(id, product, { new: true });
        res.status(200).json({ success: true, message: "Product updated", data: updatedProduct });
    } catch (error) {
        console.log("Error in Updating Product: ", error.message);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};