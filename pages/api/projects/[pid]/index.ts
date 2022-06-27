import { NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";
import { Project, Task } from "../../../../types/db";
import ApiErrorHandler from "../../../../util/ApiErrorHandler";

export default async function ProjectHandler(
    req: {query: {pid: string}, body: Task, method: string}, 
    res: NextApiResponse
) {
    const {
        query: { pid },
        body,
        method,
    } = req;

    switch (method) {
        case 'GET':
            // Get data from your database
            const project: Project = await prisma.project.findFirst({
                where: {
                    id: pid,
                }
            })

            if (!project) {
                return res.status(404).send({
                    project: {},
                    message: "Project not found",
                })
            }

            return res.status(200).send({
                project,
                message: 'Success'
            })
            break
        case 'PUT':
            // Update data in your database
            try {
                const updatedProject: Project = await prisma.project.update({
                    where: {
                        id: pid
                    },
                    data: body
                });
                
                return res.status(200).send({
                    project: updatedProject,
                    message: 'Success'
                })
            } catch (err) {
                ApiErrorHandler(err, res, 'project');
            }

            break
        default:
            res.setHeader('Allow', ['GET', 'PUT'])
            res.status(405).end(`Method ${method} Not Allowed`)
    }
}