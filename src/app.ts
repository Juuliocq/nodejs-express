import express from 'express'
import pg from 'pg'
import { router } from './router'

async function main() {
    const app = express();
    const port = 3000;

    app.use(express.json());
    app.use(express.urlencoded());

    const { Client } = pg
    const client = new Client()
    await client.connect()

    const res = await client.query('SELECT $1::text as message', ['Hello world!'])
    console.log(res.rows[0].message) // Hello world!
    await client.end()

    app.get('/', (req, res) => {
        res.send('H777LO')
    })

    app.use('/api/v1', router);

    app.listen(port, () => {
        console.log(`Executing on port ${port}`)
    })
}

main()