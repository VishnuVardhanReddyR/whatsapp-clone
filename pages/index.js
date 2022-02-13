import Head from 'next/head'
import Sidebar from '../components/Sidebar';

export default function Home() {
  return (
    <div className="">
      <Head>
        <title>WhatsPlus</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Sidebar />
    </div>
  )
}
