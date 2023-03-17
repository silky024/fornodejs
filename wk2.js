const http = require('http')
const https = require('https')
const PORT = process.env.PORT || 9817
const option = {
    host: `orapiweb.pttor.com`,//`<SRTING>`,
    port: 443, //<INT>
    method: `POST`, //`<STRING>`
    path: `/api/oilprice/search`, //`<STRING>`
    headers: {'Content-Type': 'application/json; charset=utf-8'}
    
}

let payload = {
    provinceId : 1,
    districtId : null,
    year: 2021,
    month: 2,
    pageSize:20,
    pageIndex:0
}
payload = JSON.stringify(payload)
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
req.write(payload)
req.end()
function convertStringtoJSON(data)
{
    try{
        return JSON.parse(data)
    }catch(excp){
        return data
    }
}
