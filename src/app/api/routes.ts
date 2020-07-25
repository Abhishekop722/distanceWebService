import userCtrl from "../controllers/user";
import orderCtrl from "../controllers/order";
import itemCtrl from "../controllers/item";
import { Request, Response } from "express";

export default (app: any) => {

    app.post("/loginWithPassword", async (req: Request, res: Response) => {
        let { body } = req;
        let response = await userCtrl.loginWithPassword(body);
        res.json(response);
    });
    app
        .route("/user")
        .post(async (req: Request, res: Response) => {
            let { body } = req;
            let response = await userCtrl.add(body);
            res.json(response);
        });
    app
        .route("/order")
        .get(async (req: Request, res: Response) => {
            let { query } = req;
            let response = await orderCtrl.list(query);
            res.json(response);
        })
        .post(async (req: Request, res: Response) => {
            let { body } = req;
            let response = await orderCtrl.add(body);
            res.json(response);
        });
    app
        .route("/item")
        .get(async (req: Request, res: Response) => {
            let { query } = req;
            let response = await itemCtrl.list(query);
            res.json(response);
        })
        .post(async (req: Request, res: Response) => {
            let { body } = req;
            let response = await itemCtrl.add(body);
            res.json(response);
        });
};



