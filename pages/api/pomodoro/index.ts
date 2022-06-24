import { NextApiRequest, NextApiResponse } from "next";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";
import prisma from "../../../lib/prisma";
import { Pomodoro, User } from "../../../types/db";
import ApiErrorHandler from "../../../util/ApiErrorHandler";

export default async function PomodoroHandler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const {
        body,
        method,
    } = req;

    const session: Session = await getSession({ req });

    switch (method) {

        case 'GET':
            // Get data from your database
            const pomodoro: Pomodoro = await prisma.pomodoro.findFirst({
                where: {
                    userId: session.user.id
                }
            })

            if (!pomodoro) {
                return res.status(404).send({
                    pomodoro: {},
                    message: "Pomodoro not found",
                })
            }

            return res.status(200).send({
                pomodoro,
                message: 'Success'
            })
            break
        case 'PUT':
            // Update data in your database
            try {
                const updatedPomodoro: Pomodoro = await prisma.pomodoro.update({
                    where: {
                        userId: session.user.id
                    },
                    data: body,
                });

                return res.status(200).send({
                    pomodoro: updatedPomodoro,
                    message: 'Success'
                })
            } catch (err) {
                ApiErrorHandler(err, res, 'pomodoro');
            }

            break
        default:
            res.setHeader('Allow', ['GET', 'PUT'])
            res.status(405).end(`Method ${method} Not Allowed`)
    }
}