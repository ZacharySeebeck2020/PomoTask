import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightToBracket, faClock, faGear, faTasks } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from "next/router";

export default function Sidenav() {
    const router = useRouter();
    return (
        <aside className="w-64 h-screen fixed left-0" aria-label="Sidebar">
            <div className="overflow-y-auto py-4 px-3 bg-gray-800 h-full flex flex-col">

                <span className="flex items-center flex-col px-2.5 mb-5">
                    <img src="icon.png" className="h-20" alt="Flowbite Logo" />
                    <span className="text-xl font-semibold whitespace-nowrap dark:text-white">Pomotask</span>
                </span>

                <ul className="space-y-5 mt-10">
                    <li>
                        <a onClick={() => {router.push('/')}} className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                            <FontAwesomeIcon icon={faClock} className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"/>
                            <span className="flex-1 ml-3 whitespace-nowrap">Timer</span>
                            <span className="inline-flex justify-center items-center p-3 ml-3 h-3 text-sm font-medium text-blue-600 bg-blue-200 rounded-full dark:bg-blue-900 dark:text-blue-200">23:54</span>
                        </a>
                    </li>
                    <li>
                        <a onClick={() => {router.push('/tasks')}} className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                            <FontAwesomeIcon icon={faTasks} className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"/>
                            <span className="flex-1 ml-3 whitespace-nowrap">Tasks</span>
                        </a>
                    </li>
                    <li>
                        <a onClick={() => {router.push('/settings')}} className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                            <FontAwesomeIcon icon={faGear} className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"/>
                            <span className="flex-1 ml-3 whitespace-nowrap">Settings</span>
                        </a>
                    </li>
                </ul>

                {/* <div id="dropdown-cta" className="p-4 mt-6 bg-blue-50 rounded-lg dark:bg-blue-900 mt-auto mb-8" role="alert">
                    <div className="flex items-center mb-3">
                        <button type="button" className="ml-auto -mx-1.5 -my-1.5 bg-blue-50 text-blue-900 rounded-lg focus:ring-2 focus:ring-blue-400 p-1 hover:bg-blue-200 inline-flex h-6 w-6 dark:bg-blue-900 dark:text-blue-400 dark:hover:bg-blue-800" data-collapse-toggle="dropdown-cta" aria-label="Close">
                            <span className="sr-only">Close</span>
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                        </button>
                    </div>
                    <p className="mb-3 text-sm text-blue-900 dark:text-blue-400">
                        Preview the new Flowbite dashboard navigation! You can turn the new navigation off for a limited time in your profile.
                    </p>
                </div> */}

                <ul className="space-y-2 mt-auto">
                    <li>
                        <a href="#" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                            <FontAwesomeIcon icon={faArrowRightToBracket} className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"/>
                            <span className="flex-1 ml-3 whitespace-nowrap">Sign In</span>
                        </a>
                    </li> 
                </ul>
            </div>
        </aside>
    )
}
