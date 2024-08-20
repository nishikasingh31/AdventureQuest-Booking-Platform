const {CreateNewCityInDBService} = require("./../service/City.Service")

async function CreateNewCityController(request, response){
    try{
        const {name, image, description, cuisines} = request.body

        const result = await CreateNewCityInDBService(name, image, description, cuisines)

        if(!result.success){
            throw new Error("CreateNewCityInDBService failed to complete task")
        }

        response.status(201).json({
            success : true,
            data : result.data
        })
    }catch(error){
        console.log(error)
        response.status(500).json({
            success : false,
            message :"something went wrong"
        })
    }
}

async function GetAllCityController(request, response){
    try{

        const result = await GetAllCityFromDBService()

        if(result.success){

            const DATA = result.data.map((element)=>{

                const {_id, name, description, cuisines, image} = element

                return {
                    id : _id,
                    name,
                    description,
                    cuisines,
                    image
                }
                
            })

            response.status(200).json({
                success : true,
                data : DATA
            })

        }else{
            throw new Error("GetAllCityFromDBService didn't give any city")
        }

    }catch(error){
        console.log(error)
        response.status(500).json({
            success : false,
            message : "Something went wrong" 
        })
    }
}

async function UpdateACityController(request, response){
    try{

        const {id : cityId} = request.query

        const {name, description, image, cuisines} = request.body

        const DATA = {}

        if(name){
            DATA.name = name
        }

        if(description){
            DATA.description = description
        }

        if(image){
            DATA.image = image
        }

        if(cuisines){
            DATA.cuisines = cuisines
        }

        const result = await UpdateACityInDBService(cityId, DATA)

        if(result.success){

           response.status(200).json({
                success : true,
                data : response.data
           })

        }else{
            throw new Error("UpdateACityInDBService didn't give result")
        }


    }catch(error){
        console.log(error)
        response.status(500).json({
            success : false,
            message : "Something went wrong" 
        })
    }
}

// async function DeleteACityController(request, response){
//     try {
//         const { id: cityId } = request.query;

//         const result = await DeleteACityInDBService(cityId);

//         if (result.success) {
//             response.status(200).json({
//                 success: true,
//                 data: result.data
//             });
//         } else {
//             throw new Error("DeleteACityInDBService didn't give result");
//         }
//     }catch (error) {
//         console.log(error);
//         response.status(500).json({
//             success: false,
//             message: "Something went wrong"
//         });
//     }
// }

module.exports = {
    CreateNewCityController,
    GetAllCityController,
    UpdateACityController,
    //DeleteACityController
}