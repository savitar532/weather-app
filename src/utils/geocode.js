const request = require('request')

const geocode = (address,callback) => {
    const url = 'https://api.mapbox.com/search/geocode/v6/forward?q=' + encodeURIComponent(address) + '&access_token=pk.eyJ1IjoibmlraXRoZDIzNSIsImEiOiJjbHk0cWRmbGswMmhiMmtwbTljMXg3YnhsIn0._paqdczziXgVq255M1xkSA'

    request({url, json : true}, (error,{body})=>{
        if(error){
            callback('unable to connect to da location services!!',undefined)
        }
        else if(body.features.length === 0){
            callback('unable to find da location',undefined)
        }
        else{
            callback(undefined, {
                latitude: body.features[0].geometry.coordinates[1],
                longitude: body.features[0].geometry.coordinates[0],
                location: body.features[0].properties.full_address
            })
        }
    })  
}

module.exports = geocode  