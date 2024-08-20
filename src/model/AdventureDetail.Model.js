const mongoose = require("mongoose");

const SlotSchema = new mongoose.Schema({
    date : {
        type : Date,
        require : true
    },
    numberOfPerson : {
        type : Number,
        required : true,
        default : 20,
    },
})

const AdventureDetailSchema = new mongoose.Schema({
    adventureId : {
        type : String,
        rel : "adventures",
        required : true
    },
    subtitle : {
        type : String,
        required : true
    },
    description : {
        type : String
    },
    // openingHrs : {
    //     type : String,
    //     default : "10.00",
    //     required : true
    // },
    // closingHrs : {
    //     type : String,
    //     default : "18.00",
    //     required : true
    // },
    // onlineBooking : {
    //     type : Boolean,
    //     default : true,
    //     required : true
    //},
    slots : {
        type : [SlotSchema],
        required : true
    }
    
})

const AdventureDetailModel = mongoose.model("adventure_detail", AdventureDetailSchema)

module.exports = AdventureDetailModel