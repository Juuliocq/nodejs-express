import { Client } from "pg";
import { Usuario } from "./usuario.interface";

export async function findAll() {

    const client = new Client();
    await client.connect();

    const res = await client.query("SELECT * FROM usuario");

    await client.end();

    return res.rows;
}

export async function findById(id: number) {

    const client = new Client();
    await client.connect();

    const res = await client.query(`SELECT * FROM usuario WHERE id = $1`, [id]);

    await client.end();

    return res.rows[0];
}

export async function create(usuario: Usuario) {

    const client = new Client();
    await client.connect();

    const sql = `INSERT INTO usuario (nome, email, password, admin) VALUES($1, $2, $3, $4) RETURNING id`

    const res = await client.query(sql, [usuario.nome, usuario.email, usuario.password, usuario.admin]);

    await client.end();

    return res.rows[0];
}

export async function deleta(id: number) {

    const client = new Client();
    await client.connect();

    const sql = `DELETE FROM usuario WHERE id = $1`;

    const res = await client.query(sql, [id]);

    await client.end();

    return res.rowCount > 0 ? 'Usuário excluído com sucesso!' : 'Usuário não encontrado!';
}

export async function update(usuario: Usuario) {

    if (!usuario.id) {
        return 'Usuário não encontrado! Informe o id do usuário que deseja alterar!'
    }

    const client = new Client();
    await client.connect();

    const sql = `UPDATE usuario SET ` +
                `nome = $1, ` +
                `email = $2, ` +
                `password = $3, ` + 
                `admin = $4 ` +
                `WHERE id = $5 RETURNING *;`;

    const res = await client.query(sql, [usuario.nome, usuario.email, usuario.password, usuario.admin, usuario.id]);

    await client.end();

    return res.rows[0];
}

export async function updateAdmin(id: number, admin: boolean) {

    if (!id) {
        return 'Usuário não encontrado! Informe o id do usuário que deseja alterar!'
    }

    const client = new Client();
    await client.connect();

    const res = await client.query(`UPDATE usuario SET admin = $1 WHERE id = $2 RETURNING id;`, [admin, id]);

    await client.end();

    return res.rows[0];
}