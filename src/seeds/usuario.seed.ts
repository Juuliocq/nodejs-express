import { Client } from 'pg'
import { fakerPT_BR as faker } from '@faker-js/faker'

async function main() {
    const client = new Client();
    await client.connect();

    const sql = `INSERT INTO usuario (nome, email, password, admin) VALUES($1, $2, $3, $4) RETURNING *`

    for (let i = 0; i < 10; i++) {
        const randomFirstName = faker.person.firstName();
        const randomLastName = faker.person.lastName();
        const randomName = `${randomFirstName} ${randomLastName}`;
        const randomEmail = faker.internet.email({ firstName: randomFirstName, lastName: randomLastName, allowSpecialCharacters: false});
        const randomPassword = faker.internet.password();
        const randomAdmin = faker.datatype.boolean();

        const res = await client.query(sql, [randomName, randomEmail, randomPassword, randomAdmin]);
        console.log(`${res.rows[0].id} ${res.rows[0].nome}`)
    }

    await client.end();
}

main();