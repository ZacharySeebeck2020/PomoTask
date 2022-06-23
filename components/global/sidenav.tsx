import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightToBracket, faBars, faBell, faClock, faGear, faTasks } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from "next/router";
import { FormatTime } from "../../util/time";
import Notifier from '../../util/notifier'
import { useDb } from "../../context/DbProvider";
import { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Sidenav() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const {loading: dbLoading} = useDb();

    

    if (dbLoading || status == 'loading' || status == 'unauthenticated') return (<></>);

    return (
        <>
            <div className="md:hidden h-16 w-full bg-gray-800 fixed left-0 px-10 right-0 z-40 flex flex-row space-between">
                <FontAwesomeIcon onClick={() => {setIsOpen(!isOpen)}} icon={faBars} className="my-auto text-2xl"/>
                <span className="flex items-center justify-end flex-row h-full grow">
                    <span className="mr-2 text-xl font-semibold whitespace-nowrap text-white">Pomotask</span>
                    <img src="/icon.png" className="h-12" alt="Pomotask Logo" />
                </span>
            </div>

            <div className={`group`}>
                <aside className={`z-50 ${isOpen ? '' : '-translate-x-full'} md:translate-x-0 left-0 ease-in-out duration-300 w-4/6 h-full md:h-screen fixed md:w-16 md:hover:w-64`} aria-label="Sidebar">
                    <div className="overflow-y-auto py-4 px-3 bg-gray-800 h-full flex flex-col">
                        <span className="flex items-center flex-col px-2.5 mb-5">
                            <img src="/icon.png" className="h-20 md:h-5 md:group-hover:h-20" alt="Pomotask Logo" />
                            <span className="md:invisible md:group-hover:visible text-xl font-semibold whitespace-nowrap dark:text-white">Pomotask</span>
                        </span>

                        <ul className="space-y-5 mt-10">
                            <li>
                                <a onClick={() => {router.push('/'); setIsOpen(false);}} className={`cursor-pointer flex items-center p-2 text-base font-normal text-gray-900 rounded-full group-hover:rounded-lg dark:text-white hover:bg-gray-700 ${router.pathname == '/' ? 'bg-gray-700' : ''}`}>
                                    <FontAwesomeIcon icon={faClock} className="mx-auto flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"/>
                                    <span className="flex-1 ml-3 whitespace-nowrap block md:hidden md:group-hover:block">Timer</span>
                                </a>
                            </li>
                            <li>
                                <a onClick={() => {router.push('/tasks'); setIsOpen(false);}} className={`cursor-pointer flex items-center p-2 text-base font-normal text-gray-900 rounded-full group-hover:rounded-lg rounded-lg dark:text-white hover:bg-gray-700 ${router.pathname == '/tasks' ? 'bg-gray-700' : ''}`}>
                                    <FontAwesomeIcon icon={faTasks} className="mx-auto flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"/>
                                    <span className="flex-1 ml-3 whitespace-nowrap block md:hidden md:group-hover:block">Tasks</span>
                                </a>
                            </li>
                            <li>
                                <a onClick={() => {router.push('/settings'); setIsOpen(false);}} className={`cursor-pointer flex items-center p-2 text-base font-normal text-gray-900 rounded-full group-hover:rounded-lg rounded-lg dark:text-white hover:bg-gray-700 ${router.pathname == '/settings' ? 'bg-gray-700' : ''}`}>
                                    <FontAwesomeIcon icon={faGear} className="mx-auto flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"/>
                                    <span className="flex-1 ml-3 whitespace-nowrap block md:hidden md:group-hover:block">Settings</span>
                                </a>
                            </li>
                        </ul>

                        <ul className="space-y-2 mt-auto">
                            {(Notifier.CanUseNotifications() && !Notifier.HasPermission()) ? (
                                <li>
                                    <a onClick={() => {Notifier.RequestPermission()}} className={`cursor-pointer flex items-center p-2 text-base font-normal text-gray-900 rounded-full group-hover:rounded-lg rounded-lg dark:text-white hover:bg-gray-700 ${router.pathname == '/auth' ? 'bg-gray-700' : ''}`}>
                                        <FontAwesomeIcon icon={faBell} className="mx-auto flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"/>
                                        <span className="flex-1 ml-3 whitespace-nowrap block md:hidden md:group-hover:block">Enable Notifications</span>
                                    </a>
                                </li>
                            ) : (<></>)}

                            { status == 'authenticated' ? (
                                <li>
                                    <a onClick={() => {signOut()}} className={`cursor-pointer flex items-center p-2 text-base font-normal text-gray-900 rounded-full group-hover:rounded-lg rounded-lg dark:text-white hover:bg-gray-700`}>
                                        <img className="w-6 aspect-square rounded-full" src={session.user.image} alt=""/>
                                        <span className="flex-1 ml-3 whitespace-nowrap hidden group-hover:block">{session.user.name}</span>
                                    </a>
                                </li>  
                            ) : (
                                <li>
                                    <a onClick={() => {signIn('github')}} className={`cursor-pointer flex items-center p-2 text-base font-normal text-gray-900 rounded-full group-hover:rounded-lg rounded-lg dark:text-white hover:bg-gray-700`}>
                                        <FontAwesomeIcon icon={faArrowRightToBracket} className="mx-auto flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"/>
                                        <span className="flex-1 ml-3 whitespace-nowrap hidden group-hover:block">Sign In With Github</span>
                                    </a>
                                </li>                                 
                            )}

                        </ul>
                    </div>
                </aside>
                <div onClick={() => {setIsOpen(false)}} className={`overflow-hidden h-full fixed left-0 right-0 bottom-0 top-0 z-40 bg-navHiddenBack md:pointer-events-none ease-in-out duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'} opacity-100 md:opacity-0 md:group-hover:opacity-100`}></div>
            </div>
        </>
    )
}
