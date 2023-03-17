const http = require('http')
const https = require('https')
//const nreq = require('./lib/NReq') //hw
const PORT = process.env.PORT || 9818
const option = {
    host: `covid19.ddc.moph.go.th`,//`<SRTING>`,
    port: 443, //<INT>
    method: `GET`, //`<STRING>`
    path: `/api/Cases/today-cases-all` //`<STRING>`
}
const option1 = {
    host: `orapiweb.pttor.com`,//`<SRTING>`,
    port: 443, //<INT>
    method: `POST`, //`<STRING>`
    path: `/api/oilprice/search`, //`<STRING>`
    headers: {'Content-Type': 'application/json; charset=utf-8'}
    
}

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

let payload = {
    provinceId : 1,
    districtId : null,
    year: 2021,
    month: 2,
    pageSize:20,
    pageIndex:0
}
payload = JSON.stringify(payload)

let req1 = https.request(option1,(resp) =>
{
    let respdata = ``
    resp.on(`data`,(chunk)=>{
        respdata += chunk.toString()
    })
    resp.on(`end`,function(){
        console.log(respdata)
        let resq1 = convertStringtoJSON(respdata)
        console.log(resq1)
    })
})
req1.write(payload)
req1.end()

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
    else if(method === `GET` && requrl === `/api/open/today`)//******************** */
    {
        response.writeHead(443, (`Location`,`covid19.th-stat.com`+ req.url) )

    }//***************************************************************************** */
    else 
    {
        response.write(`Nothing...`)
    }
    response.end()
}
function convertStringtoJSON(data)
{
    try{
        return JSON.parse(data)
    }catch(excp){
        return data
    }
}