import express, { Request, Response, json } from "express";
import { create, deleta, findAll, findById, update, updateAdmin } from "./usuario/usuario.service";

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

router.route('/usuario').patch(async (req: Request, res: Response) => {
    res.send(await update(req.body));
})

router.route('/usuario/:id').patch(async (req: Request, res: Response) => {
    res.send(await update(req.body));
})

router.route('/usuario/:id').put(async (req: Request, res: Response) => {
    res.send(await updateAdmin(+req.params.id, req.body.admin));
})