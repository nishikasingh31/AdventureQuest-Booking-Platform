const http = require('http');

const url = require('url');

const PORT = 4000;

var DATABASE = [
    {
        id :1,
        name : "Bhilai",
        adventurePlaces : 0

    },
    {
        id :2,
        name : "Mumbai",
        adventurePlaces : 3
    },
    {
        id :3,
        name : "Delhi",
        adventurePlaces : 4
    }
]
const serverHandler = (request,response)=>{

    const {url : request_url, method} = request

    const{pathname , query} = url.parse(request_url, true)

    console.log(request_url, pathname, query)
    if(pathname ==="/cities" && method === "GET"){
        response.writeHead(200, {'Content-Type': 'application/json'})
        const result = {
            success : true,
            data : DATABASE
        }
        response.end(JSON.stringify(result))

    }else if(pathname ==="/cities/add" && method === "POST"){
        let body = "";
        request.on("data",(chunk)=>{
            body+=chunk.toString()
        })
        request.on("end",()=>{
            const REQ_PAYLOAD = JSON.parse(body)
            console.log(REQ_PAYLOAD)
            const {name, adventurePlaces} = REQ_PAYLOAD

            DATABASE.push({
                id : DATABASE.length + 1,
                name,
                adventurePlaces
            })

            response.writeHead(201, {'Content-Type': 'application/json'})

            const result = {
            success : true,
            data : DATABASE
            }
            response.end(JSON.stringify(result))
        })

    }else if(pathname ==="/cities/update" && method === "PUT"){
        const {id} = query;
        if(!id){
            response.writeHead(400, {'Content-Type': 'application/json'})
            response.end(JSON.stringify({
                success : false,
                message : "id is missing in url"
            }))
        }

        let body = ""
        request.on("data", (chunk)=>{
            body+=chunk.toString()
        })

        request.on("end",()=>{
            const REQ_PAYLOAD = JSON.parse(body)

            const {name, adventurePlaces} = REQ_PAYLOAD

            const cityIndex = DATABASE.findIndex((element)=>{
                return element.id == id
            })
            const cityData = JSON.parse(JSON.stringify(DATABASE[cityIndex]))
        
            if(name){
                cityData.name = name
            }
            if(adventurePlaces){
                cityData.adventurePlaces = adventurePlaces
            }

            DATABASE.splice(cityIndex, 1, cityData)
            response.writeHead(200, {'Content-Type': 'application/json'})
            response.end(JSON.stringify({
                success : true
            }))
        })
        
    }else if(pathname ==="/cities/delete" && method === "DELETE"){
        const {id} = query;
        if(!id){
            response.writeHead(400, {'Content-Type': 'application/json'})
            response.end(JSON.stringify({
                success : false,
                message : "id is missing in url"
            }))
        }
        const cityIndex = DATABASE.findIndex((element)=>{
            return element.id == id
        })

        DATABASE.splice(cityIndex, 1)

        response.writeHead(200, {'Content-Type': 'application/json'})
        response.end(JSON.stringify({
            success : true,
        }))
    }else{
        response.writeHead(404, {'Content-Type': 'application/json'})
        const result = {
            success : false,
            message : "API NOT FOUND"
        }
        response.end(JSON.stringify(result))
    }
}
const server = http.createServer(serverHandler);

server.listen(PORT, ()=> {
    console.log("HTTP server is running on port -",PORT)
})


