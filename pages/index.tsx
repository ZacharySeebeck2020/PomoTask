import { faFortAwesome } from '@fortawesome/free-brands-svg-icons';
import { faCaretDown, faCheck, faClockRotateLeft, faForward, faPause, faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Head from 'next/head'
import Image from 'next/image'
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css';
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className="w-full h-full flex flex-row justify-center">
      <div className="mx-auto flex justify-center items-center min-h-screen">
        <div className="h-auto w-96 bg-lightBlue rounded-lg p-4">
          <div className="mt-3 text-sm text-[#8ea6c8] flex justify-between items-center">
            <p className="set_date">Selected Project</p>
            <p className="set_time">Time Today Spent (00:00)</p>
          </div>
          <p className="text-xl font-semibold mt-2 text-white">Pomotask</p>
          <ul className="my-4 h-[60vh] overflow-y-auto scrollbar pr-2">
            <li className=" mt-4" id="1">
              <div className="flex gap-2">
                <div className="w-full h-12 bg-[#e0ebff] rounded-[7px] flex justify-start items-center px-3"> 
                  <span id="check1" className="bg-green-300 w-7 h-7 bg-white rounded-full border border-white transition-all cursor-pointer hover:border-[#36d344] flex justify-center items-center" onclick="checked(1)">
                    <FontAwesomeIcon className="text-white" icon={faCheck}/>
                  </span> 
                  <span className="line-through text-sm ml-4 text-[#5b7a9d] font-semibold">take out the trash</span> 
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className="ml-auto mx-auto w-50 h-full flex flex-col justify-center">
        <select className="select w-full max-w-xs mx-auto mb-5">
          <option disabled selected>Select Active Project</option>
          <option>Pomotask</option>
          <option>FC Util</option>
        </select>
        <div className="mx-auto w-96">
          <CircularProgressbarWithChildren
            value={95}
            styles={buildStyles({
              strokeLinecap: 'round',
              textSize: '20px',
              pathTransitionDuration: 0.5,
              pathColor: `#ECB365`,
              textColor: '#fff',
              trailColor: '#04293A',
              backgroundColor: '#04293A',
            })}
          >
            <div className="flex flex-col text-center">
              <strong className="text-5xl">23:54</strong>
              <span className="text-2xl uppercase font-bold mt-5">Focus</span>
            </div>
          </CircularProgressbarWithChildren >
        </div>
        <div className="mx-auto mt-5 flex flex-row justify-between">
          <span className="rounded-full border-2 my-auto border-white-100 py-2 px-3 mx-2"><FontAwesomeIcon icon={faClockRotateLeft} /></span>
          <span className="rounded-full border-2 border-lightBlue text-lightBlue py-4 px-5 mx-2"><FontAwesomeIcon icon={faPlay} /></span>
          <span className="rounded-full border-2 my-auto border-white-100 py-2 px-3 mx-2"><FontAwesomeIcon icon={faForward} /></span>
        </div>
        <div className="mx-auto mt-5 flex flex-col text-center text-sm">
          <span>1 of 4</span>
          <span>sessions</span>
        </div>
      </div>
    </div>
  )
}
