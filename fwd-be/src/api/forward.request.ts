import {Request, Response} from 'express';
import authorizedRequest from './authorizedRequest';

export default class ForwardRequest {
  static post(req: Request, res: Response) {
    console.log(req.body);
    authorizedRequest.post(req.url, req.body).then((response) =>  {
      res.status(response.status).send(response.data)
    }).catch((error) => {
      res.status(400).send(error);
    });
  }
}