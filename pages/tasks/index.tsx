import { faCheck, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { useDb } from "../../context/DbProvider";

export default function Index() {
    const {db, loading: dbLoading} = useDb();

    useEffect(() => {
        if (!dbLoading) {
            console.log(db.pomodoro);
        }
    }, [db, dbLoading])

    return (
        <div className="flex flex-col">
            <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700 mb-16">
                <ul className="flex -mb-px overflow-x-auto">
                    <li className="mr-2">
                        <a href="#" className="inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300">PomoTask</a>
                    </li>
                    <li className="mr-2">
                        <a href="#" className="inline-block p-4 text-blue-600 rounded-t-lg border-b-2 border-blue-600 active dark:text-blue-500 dark:border-blue-500" aria-current="page">FC Utilities</a>
                    </li>
                    <li className="mr-2">
                        <a href="#" className="inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300">Azera</a>
                    </li>
                    <li className="mr-2">
                        <a href="#" className="inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300">RYO Dist</a>
                    </li>
                </ul>
            </div>

            <div className="flex flex-row">
                <div className="mx-auto flex justify-center items-center w-2/6">
                    <div className="h-auto w-96 bg-lightBlue rounded-lg p-4">
                        <p className="text-xl font-semibold mt-2 text-white">Tasks</p>
                        <ul className="my-4 h-[60vh] overflow-y-auto scrollbar pr-2">
                            <li className=" mt-4" id="1">
                                <div className="flex gap-2">
                                    <div className="w-full h-12 bg-[#e0ebff] rounded-[7px] flex justify-start items-center px-3">
                                        <input className="input h-10 text-white w-full mr-6" placeholder="Add New Task"></input>
                                        <span id="check1" className="ml-auto bg-green-400 w-9 h-7 bg-white rounded-full border border-white transition-all cursor-pointer hover:border-[#36d344] flex justify-center items-center">
                                            <FontAwesomeIcon className="text-white" icon={faPlus} />
                                        </span>
                                    </div>
                                </div>
                            </li>
                            <li className=" mt-4" id="1">
                                <div className="flex gap-2">
                                    <div className="w-full h-12 bg-[#e0ebff] rounded-[7px] flex justify-start items-center px-3">
                                        <span id="check1" className="bg-green-300 w-7 h-7 bg-white rounded-full border border-white transition-all cursor-pointer hover:border-[#36d344] flex justify-center items-center">
                                            <FontAwesomeIcon className="text-white" icon={faCheck} />
                                        </span>
                                        <span className="line-through text-sm ml-4 text-[#5b7a9d] font-semibold">take out the trash</span>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="flex flex-col w-4/6 mr-16">
                    <div>
                        
                    </div>
                </div>
            </div>

        </div>
    )
}