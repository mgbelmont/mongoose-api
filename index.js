const express = require('express')
const mongoose = require('mongoose')
const Koder = require('./koderModel')

const server = express()
server.use(express.json())

const DB_USER = 'marykodemia'
const DB_PASSWORD = 'Q450DOyJW4GFqgEp'
const DB_HOST = 'cluster0.bcs1k.mongodb.net'
const DB_NAME = 'kodemia'

const url = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`


server.get('/koders', async (request, response)=>{
    const genderFilter = request.query.gender
    console.log(genderFilter)
    var allKoders
   
    genderFilter ? allKoders = await Koder.find({gender:genderFilter}) : allKoders = await Koder.find({})
    
    response.json({
        message: 'koders',
        success: true,
        data:{
            koders: allKoders
        }
    })
})

server.post('/koders', async(request, response) =>{
    console.log('entra a post koders', request.body)
    const name = request.body.name
    const lastName = request.body.lastName
    const gender = request.body.gender
    const age = request.body.age
    
    await Koder.create({ 
        name:name,
        lastName: lastName,
        gender: gender,
        age: age
    })
    .then((data)=>{
        console.log('se agrego el koder')
    })
    .catch((error)=>{
        console.error('existe un error', error)
    })
    

    response.json({
        message: 'Koder agregado',
        success: true,
    })

    
})




mongoose.connect(url,{useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
    //aqui ya estamos conectados a la DB
    server.listen(8080, ()=>{
        console.log('server is listening')
    })
})
.catch((error)=>{
    console.error('error: ', error)
})
