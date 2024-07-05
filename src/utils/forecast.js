const request = require('request')

const forecast = (c1,c2,callback) => {
    const url = 'http://api.weatherapi.com/v1/forecast.json?key=a6665feefb1242eca14173151240207&q=' + c1 + ',' + c2 +'&days=1'
    request({url, json : true},(error,{body}={}) => {
        if(error){
            callback('unable to connect to da weather server',undefined)
        }  
        else if(body.error){
            callback('unable to find da location',undefined)
        }
        else{
            callback(undefined,body.current.condition.text + ', da temp is ' + body.current.temp_c + ' . Chances of rain is ' + body.current.humidity)
        }
    })
}

module.exports = forecast