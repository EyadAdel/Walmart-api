const sellerModel = require("../models/seller");
const bcrypt = require("bcrypt");
const OrderModel = require("../models/orders");
const productModel = require("../models/products");

//Get All Sellers
const getAllSellers = async (req, res, next) => {
  try {
    const allSellers = await sellerModel.find();
    res.status(200).json(allSellers);
  } catch (err) {
    res.json({ message: err.message });
  }
};

// Add new seller
const AddnewSeller = async (req, res, next) => {
  const seller = req.body;
  try {
    const addededSeller = await sellerModel.create(seller);
    const token = await addededSeller.generateAuthToken();
    res.status(201).json({ addededSeller, token });
  } catch (err) {
    res.status(422).json({ message: err.message });
  }
};

const loginSeller = async (req, res) => {
  try {
    const { businessEmail, password } = req.body;
    const seller = await sellerModel.findOne({ businessEmail });
    if (!seller) {
      res.status(404).send("invalid password or email");
      return;
    }
    const valid = bcrypt.compareSync(password, seller.password);
    if (!valid) {
      res.status(404).send("invalid password or email");
      return;
    }
    const token = await seller.generateAuthToken();
    res.send({ seller, token });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Get seller by id
const getSellerById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const specificSeller = await sellerModel.findById(id);
    res.status(200).json(specificSeller);
  } catch (err) {
    res.json({ message: err.message });
  }
};

//Update Seller
const updateSellerById = async (req, res) => {
  const id = req.params.id;
  const obj = req.body;
  try {
    const updatedSeller = await sellerModel.findByIdAndUpdate(id, obj, {
      new: true,
    });
    res.json(updatedSeller);
  } catch (err) {
    res.status(422).json({ message: err.message });
  }
};

//Delete Seller
const deleteSeller = async (req, res) => {
  const id = req.params.id;
  try {
    await sellerModel.findByIdAndDelete(id);
    res.json("Seller Deleted Successfully");
  } catch (err) {
    res.status(422).json({ message: err.message });
  }
};

//-----------------------------------//

const getSellerOrders = async (req, res) => {
  try {
    const { id } = req.params;
    const seller = await sellerModel
      .findById(id)
      .populate("orders.products", "name priceAfter")
      .populate("orders.parentOrder", "status");

    // Extract only the orders that have not been confirmed/cancelled and parent order still pending
    const pendingOrders = [];
    for (const order of seller.orders) {
      const theOrder = await OrderModel.findById(order.parentOrder);
      if (!order.status && theOrder.status === "Pending") {
        pendingOrders.push(order);
      }
    }

    res.status(200).json(pendingOrders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error: " + error });
  }
};

const confirmOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status, sellerID } = req.body;

  try {
    const seller = await sellerModel.findById(sellerID);

    // Find the order and product index
    const orderIndex = seller.orders.findIndex(
      (order) => order._id.toString() === id
    );
    seller.orders[orderIndex].status = status;
    await seller.save();

    // Check if all products in the order have been confirmed or cancelled
    const { parentOrder } = seller.orders[orderIndex];
    const theOrder = await OrderModel.findById(parentOrder);

    if (status === "Cancel") {
      theOrder.status = "Cancelled";
      await theOrder.save();

      // Increase the stock quantity of the products in the cancelled order
      for (const item of theOrder.items) {
        const product = await productModel.findOne({ _id: item.product });
        const updatedStockQuantity = product.quantity + item.quantity;
        await productModel.findByIdAndUpdate(
          product._id,
          { quantity: updatedStockQuantity },
          { new: true }
        );
      }

      return res
        .status(200)
        .json({ message: "Notification updated and order cancelled" });
    }

    let allConfirmed = true;

    for (const item of theOrder.items) {
      const product = await productModel.findOne({ _id: item.product });
      const sellers = await sellerModel.findById(product.sellerID);

      for (const item of sellers.orders) {
        if (item.parentOrder.equals(parentOrder)) {
          if (!item.status) {
            allConfirmed = false;
          }
        }
      }

      if (!allConfirmed) {
        break;
      }
    }

    // Update the order status based on the products' status
    if (allConfirmed) {
      theOrder.status = "Confirmed";
      await theOrder.save();
      res
        .status(200)
        .json({ message: "Notification updated and order confirmed" });
    } else {
      res
        .status(200)
        .json({ message: "Notification updated and order still pending" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error: " + error });
  }
};

module.exports = {
  AddnewSeller,
  loginSeller,
  getAllSellers,
  getSellerById,
  updateSellerById,
  deleteSeller,
  getSellerOrders,
  confirmOrderStatus,
};
