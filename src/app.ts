console.log("HELLO WOLD CARALH$#@#O")

import express from 'express'
const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send('H777LO')
})

app.listen(port, () => {
    console.log(`Executing on port ${port}`)
})