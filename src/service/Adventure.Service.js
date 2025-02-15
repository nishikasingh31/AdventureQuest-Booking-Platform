const AdventureModel = require('../model/Adventure.Model')

async function CreateNewAdventureInDBService(cityId, name, category, images, duration, pricePerHead){
    try{
        const result = await AdventureModel.create({
            cityId,
            name,
            category,
            images,
            duration,
            pricePerHead
        })
        if(result){
            return {
                success : true,
                data : result
            }
        }else{
            throw new Error("CreateNewAdventureInDBService unable to create  ")
        }


    }catch(error){
        console.log(error)
        return {
            success : false
        }
    }
}

module.exports = {
    CreateNewAdventureInDBService
}