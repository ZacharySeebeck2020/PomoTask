import { faClockRotateLeft, faForward, faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProgressBar from "@ramonak/react-progress-bar";
export default function Footer() {
    return (
        <footer className="inline-flex fixed bottom-0 dark:bg-gray-800 h-16" style={{width: 'calc(100vw - 17rem)'}}>
            <div className="w-5/6 my-auto">
                <ProgressBar 
                    completed={100} 
                    customLabel="23:54 Remaining"
                    labelClassName="mr-4"
                    labelColor="rgb(4, 41, 58)"
                    bgColor="#ECB365"
                    baseBgColor='#04293A'
                />
            </div>
            <div className="flex w-1/6 justify-between mx-8">
                <span className="my-auto text-sm">1 of 4 sessions.</span>
                <div className="my-auto flex flex-row">
                    <span className="rounded-full border-2 my-auto border-white-100 py-1 px-2 mx-2 text-2xs"><FontAwesomeIcon icon={faClockRotateLeft} /></span>
                    <span className="rounded-full border-2 border-lightBlue text-lightBlue py-2 px-3 mx-2 text-2xs"><FontAwesomeIcon icon={faPlay} /></span>
                    <span className="rounded-full border-2 my-auto border-white-100 py-1 px-2 mx-2 text-2xs"><FontAwesomeIcon icon={faForward} /></span>
                </div>
            </div>
        </footer>
    )
}