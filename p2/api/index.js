require('dotenv').config()
const express = require('express')
const app = express()
const axios = require('axios')

// GET do APOD da Nasa
app.get('/apod', async(req, res) => {
    const nasaClient = axios.create({
        baseURL: 'https://api.nasa.gov/planetary'
    })

    const data_tempo = req.query
    const params = {
        api_key: process.env.NASA_API_KEY
    }

    if (data_tempo.start_date && data_tempo.end_date) {
        if (data_tempo.start_date === data_tempo.end_date) {
            params.date = data_tempo.start_date
        } else {
            params.start_date = data_tempo.start_date
            params.end_date = data_tempo.end_date
        }
    } else if (data_tempo.date) {
        params.date = data_tempo.date
    }

    const result = await nasaClient.get('/apod', { params })
     return res.json(result.data)
    console.log(result.data)
    })

// GET das Imagens da Nasa
app.get('/search', async(req, res) => {
    const nasaClientSemChave = axios.create({
        baseURL: 'https://images-api.nasa.gov'
    })
    const termoBusca = req.query.query
    const result = await nasaClientSemChave.get('/search', {
        params: {
            q: termoBusca,
            media_type: 'image'
        }
    })
    console.log(result.data)
    return res.json(result.data)

})


const port = 3000
app.listen(port, () => {
    console.log(`API rodando em htttp://localhost: ${port}`)
})