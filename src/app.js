const express = require('express')
const path = require('path')
const app = express()
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const cors = require('cors')

app.use(cors({}))
//define path for express config
const publicDirectoryPath = path.join(__dirname,'../public') 
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine (and views location if needed)
app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to server
app.use(express.static(publicDirectoryPath ))

app.get('',(req,res)=>{ 
    res.render('index',{
        title: 'WEATHER',
        name: 'savitar'

    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'ABOUT ME',
        name: 'savitar'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title: "HELP",
        msg: 'bayapadaku sodhara',
        name: 'savitar'
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error: 'address not provided gg'
        })
    }
    geocode(req.query.address, (error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({
                error
            })
    
        }
    
        forecast(latitude,longitude, (error,forecastdata)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast: forecastdata,
                location: location,
                address: req.query.address
        })        }
    )
    
    })    

})
app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error: "search not provided"
        })
    }
    console.log(req.query.search )
    res.send({
        products : []
    })
})
app.get('/help/*',(req,res)=>{
    res.render('404',{
         title: '404',
         name: 'savitar',
         errorMessage: 'help article not found'
    })
})
app.get('*',(req,res)=>{
    res.render('404',{
         title: '404',
         name: 'savitar',
         errorMessage: 'page not found'
    })
})
app.listen(3000,()=>{
    console.log("da server is up")
})