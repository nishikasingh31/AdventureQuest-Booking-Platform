const express = require("express");

const { CreateNewCityController, GetAllCityController , UpdateACityController} = require("./../controller/City.Controller")

const {AdminAuthorizationMiddleware} = require('./../middleware/Authorization.Middleware')

const CityRouter = express.Router();

CityRouter.post("/add", AdminAuthorizationMiddleware, CreateNewCityController)

CityRouter.get("/all", GetAllCityController)

CityRouter.put("/update", UpdateACityController)

//CityRouter.delete("/delete", DeleteACityController)

module.exports = CityRouter;
