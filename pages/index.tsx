import Head from 'next/head'
import Image from 'next/image'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css';
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className="w-full h-full flex flex-col">
      <div className="mx-auto w-1/6">
        <CircularProgressbar 
          value={66} 
          text="66%"
          styles={buildStyles({
            // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
            strokeLinecap: 'round',
        
            // Text size
            textSize: '16px',
        
            // How long animation takes to go from one percentage to another, in seconds
            pathTransitionDuration: 0.5,
        
            // Colors
            pathColor: `rgb(30, 58, 138)`,
            textColor: '#fff',
            trailColor: '#d6d6d6',
            backgroundColor: '#3e98c7',
          })}
        />
      </div>

    </div>
  )
}
