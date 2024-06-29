import express, { Request, Response, json } from "express";
import { alter, create, deleta, findAll, findById } from "./usuario/usuario.service";

export const router = express.Router();

router.route('/usuario').get(async (req: Request, res: Response) => {
    res.send(await findAll());
})

router.route('/usuario/:id').get(async (req: Request, res: Response) => {
    //+ faz a conversão para int
    const id = +req.params.id;
    res.send(await findById(id));
})

router.route('/usuario').post(async (req: Request, res: Response) => {
    res.send(await create(req.body));
})

router.route('/usuario/:id').delete(async (req: Request, res: Response) => {
    res.send(await deleta(+req.params.id));
})

router.route('/usuario/:id').patch(async (req: Request, res: Response) => {
    res.send(await alter(+req.params.id, req.body));
})