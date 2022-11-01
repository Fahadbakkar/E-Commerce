const { query } = require("express");
const { MongoClient } = require("mongodb");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();

const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

//retrieves all items from items collection
const getItems = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("Gadget-Group");
    const result = (
      await db.collection("items").find().project({ _id: 1 }).toArray()
    ).map((obj) => obj._id);
    res.status(200).json({
      status: 200,
      data: result,
      message: "Successfully retrieved items",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: 500, message: err.message });
  } finally {
    client.close();
  }
};
//for categories
const getCategories = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("Gadget-Group");
    const result = (
      await db.collection("items").find().project({ category: 1 }).toArray()
    ).map((category) => category.category);

    res.status(200).json({
      status: 200,
      data: result,
      message: "Successfully retrieved categories",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: 500, message: err.message });
  } finally {
    client.close();
  }
};

//retrieves a single page with the 20 items
const getItemsPage = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const page = Number(req.params.page);
  const category = req.params.categories;

  try {
    await client.connect();
    const db = client.db("Gadget-Group");
    const result = await db
      .collection("items")
      .find(category !== "All" ? { category: category } : {})
      .skip((page - 1) * 20)
      .limit(20)
      .toArray();
    res.status(200).json({
      status: 200,
      data: result,
      message: "Successfully retrieved items",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: 500, message: err.message });
  } finally {
    client.close();
  }
};

//retrieve a single item by id
const getItem = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const id = parseInt(req.params.item);

  try {
    await client.connect();
    const db = client.db("Gadget-Group");
    const oneItem = await db.collection("items").findOne({ _id: id });

    res.status(200).json({
      status: 200,
      data: oneItem,
      message: "item found",
    });
  } catch (err) {
    console.log(err);
  } finally {
    client.close();
  }
};

//post order to cart collecton + modify stock of specific item
const addCart = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  const { name, price, imageSrc, quantity, userEmail, id } = req.body;

  try {
    await client.connect();
    const db = client.db("Gadget-Group");
    //add the item in cart
    const result = await db
      .collection("users")

      .updateOne(
        { email: userEmail },
        { $push: { cart: { id, name, imageSrc, price, quantity } } }
      );

    res.status(200).json({
      status: 200,
      //data: findItem,
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      data: req.body,
      message: "Error adding to cart",
    });
    console.log(err);
  } finally {
    client.close();
  }
};

//update items to add or remove in cart
const updateCart = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const { stock, name } = req.body;
  const query = { name };
  try {
    await client.connect();
    const db = client.db("Gadget-Group");
    //find the item
    const findItem = await db.collection("items").findOne(query);
    //update stock
    const changeStock = await db
      .collection("items")
      .updateOne(query, { $set: { numInStock: findItem.numInStock - stock } });
    //update the stock
    const updateCart = await db.collection("users").updateOne(query);
  } catch (err) {
    res.status(500).json({
      status: 500,
      data: req.body,
      message: "Error updating cart",
    });
  } finally {
    client.close();
  }
};

//removing specific item from cart
const removeFromCart = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const { userEmail, itemId } = req.body;
  try {
    await client.connect();
    const db = client.db("Gadget-Group");


    // update the cart
    await db.collection("users").updateOne({ email: userEmail }, {$pull: {cart: {id: itemId}}})
    res.status(200).json({
      status: 200,
      message: "Successfully removed",
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      data: req.body,
      message: "Error removing from cart",
    });
  } finally {
    client.close();
  }
};

//retrieve a single company by id
const getCompany = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const id = parseInt(req.params.company);
  try {
    await client.connect();
    const db = client.db("Gadget-Group");
    const getCompany = await db.collection("companies").findOne({ _id: id });
    res.status(200).json({
      status: 200,
      data: getCompany,
      message: "company found",
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: "Error retriving company",
    });
  } finally {
    client.close();
  }
};

//retrieve all companies
const getCompanies = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("Gadget-Group");
    const result = await db.collection("companies").find().toArray();
    res.status(200).json({
      status: 200,
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: "Error retriving companies",
    });
  } finally {
    client.close();
  }
};

//retrieves a users cart
const getCart = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const userEmail = req.params.userEmail;

  try {
    await client.connect();
    const db = client.db("Gadget-Group");
    const data = await db.collection("users").findOne({ email: userEmail });

    res.status(200).json({
      status: 200,
      result: data,
      message: "cart found",
    });
  } catch (error) {
    console.log(error);
  } finally {
    client.close();
  }
};

//posts new user
const newUser = async (req, res) => {
  const newUser = req.body;
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("Gadget-Group");
    const data = await db.collection("users").insertOne(newUser);

    res.status(200).json({
      status: 200,
      message: "New user added",
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      data: req.body,
      message: "Error adding new user",
    });
    console.log(error);
  } finally {
    client.close();
  }
};

//checkout function
const checkout = async (req, res) => {
  const { email } = req.body;

  const newValue = { cart: [] };
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();

    const db = client.db("Gadget-Group");
    //get the user
    const nameofItems = (await db.collection("users").findOne({ email: email }))
      .cart;
    await Promise.all(
      nameofItems.map(async (item) => {
        const specificItem = await db
          .collection("items")
          .findOne({ name: item.name });
        await db
          .collection("items")
          .updateOne(
            { name: item.name },
            { $set: { numInStock: specificItem.numInStock - item.quantity } }
          );
      })
    );

    // set cart to null after checkout
    const data = await db
      .collection("users")
      .updateOne({ email: email }, { $set: { cart: [] } });

    res.status(200).json({
      status: 200,
      message: "checkout successful",
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      data: req.body,
      message: "Error checking out ",
    });
    console.log(error);
  } finally {
    client.close();
  }
};

const getChatResponse = async (req, res) => {
  const prompt = req.params.prompt
  const { Configuration, OpenAIApi } = require("openai");
  console.log(prompt)

    try {
      const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
      });
      const openai = new OpenAIApi(configuration);
      
      const response = await openai.createCompletion({
        model: "text-davinci-002",
        prompt: "Write a creative ad for the following product to run on Instagram aimed at web developers:\n\nProduct: " + prompt,
        temperature: 0.5,
        max_tokens: 80,
        top_p: 1,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
      });

      res.status(200).json({
        status:200,
        botRes: response.data.choices[0].text
      })
    } 
    catch (err) {
        console.log(err.message)
    }

}

module.exports = {
  getItems,
  getItem,
  getItemsPage,
  addCart,
  updateCart,
  removeFromCart,
  getCompany,
  getCompanies,
  getCart,
  newUser,
  checkout,
  getChatResponse,
  getCategories,
};
