import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

// components
import Aiwriter from '../components/Aiwriter'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>My AI Writer | AI Blow Writer | Summarizer</title>
        <meta name="description" content="AI writer helps you generate high quality article for any topics. Let's you summarise articles" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Aiwriter />
    </div>
  )
}

export default Home
