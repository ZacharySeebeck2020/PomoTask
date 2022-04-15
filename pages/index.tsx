import Head from 'next/head'
import Image from 'next/image'
import { CircularProgressbar } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css';
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div style={{ width: 200, height: 200 }}>
      <h3>Hi!</h3>
      <CircularProgressbar value={66} text="66%"/>
    </div>
  )
}
