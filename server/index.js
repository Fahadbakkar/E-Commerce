"use strict";

const express = require("express");
const morgan = require("morgan");

const {
  getItems,
  getItem,
  addCart,
  updateCart,
  removeFromCart,
  getCompanies,
  getCompany,
  getItemsPage,
  getCart,
  newUser,
  checkout,
  getChatResponse,
  getCategories,
} = require("./handlers.js");

const PORT = 4000;

express()
  .use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Methods",
      "OPTIONS, HEAD, GET, PUT, POST, DELETE"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  })
  .use(morgan("tiny"))
  .use(express.static("./server/assets"))
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use("/", express.static(__dirname + "/"))

  // REST endpoints?
  .get("/api/get-items", getItems)
  .get("/api/get-companies", getCompanies)
  .get("/api/get-items/:item", getItem)
  .get("/api/get-items-page/:page/:categories", getItemsPage)
  .get("/api/get-company/:company", getCompany)
  .post("/api/add-to-cart", addCart)
  .patch("/api/update-cart", updateCart)
  .patch("/api/remove-from-cart", removeFromCart)
  .get("/api/get-cart/:userEmail", getCart)
  .post("/api/new-user", newUser)
  .post("/api/Checkout", checkout)
  .get("/api/botResponse/:prompt", getChatResponse)
  .get("/api/categories", getCategories)

  .listen(PORT, () => console.info(`Listening on port ${PORT}`));
