const AdventureDetailModel = require("./../model/AdventureDetail.Model")

async function CreateNewAdventureDetailInDbService(adventureId, subtitle, description, slots){
    try{

        const result = await AdventureDetailModel.create({
            adventureId,
            subtitle,
            description,
            slots
        })

        if(result){
            return {
                success : true,
                data : result
            }
        }else{
            throw new Error("CreateNewAdventureDetailInDbService unable to create new adventure detail")
        }

    }catch(error){
        console.log(error)
        return {
            success : false
        }
    }
}

async function BookSlotForAdventureInDBService(adventureId, date, numberOfPerson){
    try{

        const AdventureResult = await AdventureDetailModel.findOne({
            adventureId
        })

        if(!AdventureResult){
            throw new Error("CheckSlotAvailibiltyForAdventureInDBService unable to get any adventure with given adventureId")
        }

        const {slots} = AdventureResult

        const slotIndex = slots.findIndex((slot)=>new Date(slot.date).getTime() === new Date(date).getTime())

        if(slotIndex===-1){
            throw new Error("Slot is not available for the given date")
        }

        const bookingSlot = slots[slotIndex]

        if(bookingSlot.numberOfPerson < numberOfPerson){
            throw new Error("Slot is not available for the given capacity")
        }

        if((bookingSlot.numberOfPerson-numberOfPerson) == 0){
            slots.splice(slotIndex, 1)
        }else{
            slots[slotIndex].numberOfPerson = bookingSlot.numberOfPerson-numberOfPerson
        }

        await AdventureResult.save()

        return {
            success : true
        }

    }catch(error){
        console.log(error)
        return {
            success : false
        }
    }
}

module.exports = {
    CreateNewAdventureDetailInDbService,
    BookSlotForAdventureInDBService
}