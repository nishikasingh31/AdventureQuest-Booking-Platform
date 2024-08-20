const express = require("express")

const { createNewAdventureDetailController } = require("./../controller/AdventureDetail.controller")

const AdventureDetailRouter = express.Router();

AdventureDetailRouter.post("/add", createNewAdventureDetailController)

module.exports = AdventureDetailRouter