const path = require('path')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const express = require('express')
const hbs = require('hbs')


const app = express()

//Define Path for Express Config
const publicDirPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Set handlebars & views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirPath))

app.get('',(req, res) => {
    res.render('index', {
        title:'Weather',
        name: 'Vinay Mohan Kuriyal'
    })
})

app.get('/about',(req, res) => {
    res.render('about', {
        title:'About Me',
        name: 'Vinay Mohan Kuriyal'
    })
})

app.get('/help',(req, res) => {
    res.render('help', {
        topic:'NodeJS',
        title:'Help',
        name: 'Vinay Mohan Kuriyal'
    })
})

app.get('/weather',(req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must Provide a search criteria'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error) {
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error ) {
                return res.send({ error })
            }
            res.send({
                forecast: forecastData, location,
                address: req.query.address
            })
        })
    })
})




app.get('/products', (req, res) => {

    if(!req.query.search) {
        return res.send({
            error: 'You must Provide a search criteria'
        })
    }
    console.log(req.query)
    res.send({
        products:[]
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title:'404',
        name:'Vinay Mohan Kuriyal',
        errormessage:'Help Article Not Found'
    })
})

app.get('*',(req, res) => {
    res.render('404', {
        title:'404',
        name:'Vinay Mohan Kuriyal',
        errormessage:'Page Not Found'
    })

})

app.listen(3000, ()=> {
    console.log('Server is up on port 3000')
})