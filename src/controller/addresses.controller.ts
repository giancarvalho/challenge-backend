import { Request, Response } from "express";
import * as AddressesServices from "../services/addresses.service";
import BadRequest from "../utils/BadRequestError";

async function resolveDistances(req: Request, res: Response) {
  try {
    const { addresses } = req.body;

    if (!addresses) return res.sendStatus(400);

    const result = await AddressesServices.resolveDistances(addresses);

    return res.send(result);
  } catch (error) {
    if (error instanceof BadRequest)
      return res.status(error.code).send(error.message);

    return res.sendStatus(500);
  }
}

export { resolveDistances };
