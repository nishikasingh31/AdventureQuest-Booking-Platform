const express = require("express");
const { CreateNewAdventureController} = require("./../controller/Adventure.controller")

const AdventureRouter = express.Router();

AdventureRouter.post("/add", CreateNewAdventureController)
                                      
module.exports = AdventureRouter;