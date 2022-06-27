import { NextApiResponse } from "next";
import prisma from "../../../../../../lib/prisma";
import { Task } from "../../../../../../types/db";
import ApiErrorHandler from "../../../../../../util/ApiErrorHandler";

export default async function TaskHandler(
    req: {query: {pid: string, tid: string}, body: Task, method: string}, 
    res: NextApiResponse
) {
    const {
        query: { pid, tid },
        body,
        method,
    } = req;

    switch (method) {
        case 'GET':
            // Get data from your database
            const task: Task = await prisma.task.findFirst({
                where: {
                    id: tid,
                    projectId: pid,
                }
            })

            if (!task) {
                return res.status(404).send({
                    task: {},
                    message: "Task not found",
                })
            }

            return res.status(200).send({
                task,
                message: 'Success'
            })
            break
        case 'PUT':
            // Update data in your database
            try {
                const updatedTask: Task = await prisma.task.update({
                    where: {
                        id: tid
                    },
                    data: body
                });
                
                return res.status(200).send({
                    task: updatedTask,
                    message: 'Success'
                })
            } catch (err) {
                ApiErrorHandler(err, res, 'task');
            }

            break
        default:
            res.setHeader('Allow', ['GET', 'PUT'])
            res.status(405).end(`Method ${method} Not Allowed`)
    }
}