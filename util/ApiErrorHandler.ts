import { Prisma } from "@prisma/client";
import { NextApiResponse } from "next";

async function ApiErrorHandler(err: Error, res: NextApiResponse, objName: string) {
    switch (err.constructor) {
        case Prisma.PrismaClientValidationError:
            res.status(400).send({
                [objName]: {},
                message: err.message
            });
            break;
        case Prisma.PrismaClientKnownRequestError:
            res.status(400).send({
                [objName]: {},
                message: err.message
            });
            break;
        default:
            res.status(500).send({
                [objName]: {},
                message: err.message
            });
            break;
    }
}

export default ApiErrorHandler;