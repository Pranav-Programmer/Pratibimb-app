// pages/index.js

import Head from 'next/head';
import Home from '../components/homepage'; // Import the Home component from homepage.js
import UserProfilePage from "./user/[userId]";

const Index = () => {
  return (
    <div>
      <Head>
        <title>Pratibimb</title>
        <meta name="description" content="Pratibimb" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
      <h1 style={{textAlign:'center'}}>Pratibimb</h1>
        <Home />
        {/* <UserProfilePage /> */}
        {/* <p>Pranav Dharme</p> */}
      </main>
    </div>
  );
};

export default Index;
