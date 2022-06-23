import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { AdapterUser } from "next-auth/adapters";
import PomodoroDefault from './defaults/pomodoro';
import ProjectDefault from "./defaults/project";
import TaskDefault from "./defaults/task";

/** @return { import("next-auth/adapters").Adapter } */
export default function CustomNextAuthAdapter(client: PrismaClient, options = {}) {
    const prismaAdapter = PrismaAdapter(client);
    return {
        async createUser(user) {
            const prismaUser: AdapterUser = await prismaAdapter.createUser(user)
            
            await client.pomodoro.create({
                data: {
                    ...PomodoroDefault,
                    user: {
                        connect: {
                            id: prismaUser.id
                        }
                    }
                }
            });
            
            await client.project.create({
                data: {
                    ...ProjectDefault,
                    user: {
                        connect: {
                            id: prismaUser.id
                        }
                    },
                    tasks: {
                        create: {
                            ...TaskDefault,
                        }
                    }
                }
            })
            
            return prismaUser;
        },
        getUser: prismaAdapter.getUser,
        getUserByEmail: prismaAdapter.getUserByEmail,
        getUserByAccount: prismaAdapter.getUserByAccount,
        updateUser: prismaAdapter.updateUser,
        deleteUser: prismaAdapter.deleteUser,
        linkAccount: prismaAdapter.linkAccount,
        unlinkAccount: prismaAdapter.unlinkAccount,
        createSession: prismaAdapter.createSession,
        getSessionAndUser: prismaAdapter.getSessionAndUser,
        updateSession: prismaAdapter.updateSession,
        deleteSession: prismaAdapter.deleteSession,
        createVerificationToken: prismaAdapter.createVerificationToken,
    }
}