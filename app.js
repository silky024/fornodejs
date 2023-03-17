const http = require('http')
const https = require('https')
const PORT = process.env.PORT || 9819
const option = {
    host: `covid19.ddc.moph.go.th`,//`<SRTING>`,
    port: 443, //<INT>
    method: `GET`, //`<STRING>`
    path: `/api/Cases/today-cases-all` //`<STRING>`
}
function convertStringtoJSON(data)
{
    try{
        return JSON.parse(data)
    }catch(excp){
        return data
    }
}
/*const option = {
    host: `covid19.th-stat.com`,
    port: 443,
    method: `GET`,
    path: `/api/open/today`

}*/
let req = https.request(option,(resp) =>
{
    let respdata = ``
    resp.on(`data`,(chunk)=>{
        respdata += chunk.toString()
    })
    resp.on(`end`,function(){
        console.log(respdata)
        let resq = convertStringtoJSON(respdata)
        console.log(resq)
    })
})
req.end()


let server = http.createServer(onClientRequest)
    server.listen(PORT)
    console.log('Server started listening in ' + PORT )


function onClientRequest(request, response)
{
    response.writeHead(200)
    let method = request.method
    let requrl = request.url

    if(method === `GET` && requrl === `/hi`)
    {
        response.write(`Hello on Get`)
    }
    else if(method === `POST` && requrl === `/hi`)
    {
        response.write(`Hello on Post`)
    }
    else 
    {
        response.write(`Nothing...`)
    }

    /*console.log(request.method)
    console.log(request.url)
    console.log('=======================================')*/
    //192.168.1.10
    response.end()
}