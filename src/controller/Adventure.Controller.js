const {CreateNewAdventureInDBService}  = require('./../service/Adventure.Service')


async function CreateNewAdventureController(request,response){
try {

   // const {cityId} = request.query;

    const {cityId, name, category, images, duration, pricePerHead } = request.body

    const result = await CreateNewAdventureInDBService(cityId, name, category, images, duration, pricePerHead)

    if(!result.success){
        throw new Error("CreateNewAdventureInDBService failed to complete task")
    }

    response.status(201).json({
        success : true,
        data : result.data
    })
    
} catch (error) {
    console.log(error)
    response.status(500).json({
        success : false,
        message : "Something went wrong" 
    })
}
}


module.exports = {
    CreateNewAdventureController
}