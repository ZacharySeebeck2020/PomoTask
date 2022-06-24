import { NextApiRequest, NextApiResponse } from "next";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";
import prisma from "../../../lib/prisma";
import { User } from "../../../types/db";
import ApiErrorHandler from "../../../util/ApiErrorHandler";

export default async function TaskHandler(
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
            const user: User = await prisma.user.findFirst({
                where: {
                    id: session.user.id
                },
                include: {
                    projects: {
                        include: {
                            tasks: true
                        }
                    },
                    activeProject: {
                        include: {
                            tasks: true
                        }
                    },
                    pomodoro: true
                }
            })

            if (!user) {
                return res.status(404).send({
                    user: {},
                    message: "User not found",
                })
            }

            return res.status(200).send({
                user,
                message: 'Success'
            })
            break
        case 'PUT':
            // Update data in your database
            try {
                const updatedUser: User = await prisma.user.update({
                    where: {
                        id: session.user.id
                    },
                    data: body,
                    include: {
                        projects: {
                            include: {
                                tasks: true
                            }
                        },
                        activeProject: {
                            include: {
                                tasks: true
                            }
                        },
                        pomodoro: true
                    }
                });

                return res.status(200).send({
                    user: updatedUser,
                    message: 'Success'
                })
            } catch (err) {
                ApiErrorHandler(err, res, 'user');
            }

            break
        default:
            res.setHeader('Allow', ['GET', 'PUT'])
            res.status(405).end(`Method ${method} Not Allowed`)
    }
}