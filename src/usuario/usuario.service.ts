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

    return "Deletou!"
}

export async function alter(id: number, usuario: Usuario) {

    const client = new Client();
    await client.connect();

    const sql = `UPDATE usuario SET ` +
                `nome = $1, ` +
                `email = $2, ` +
                `password = $3, ` + 
                `admin = $4 ` +
                `WHERE id = $5`;

    const res = await client.query(sql, [usuario.nome, usuario.email, usuario.password, usuario.admin, id]);

    await client.end();

    return "Alterou!"
}