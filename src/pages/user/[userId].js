// pages/user/[userId].js

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import axios from 'axios';
import UserProfile from '../../components/UserProfile';

const UserProfilePage = () => {
  const router = useRouter();
  const { userId } = router.query;

  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Function to fetch user data from the Unsplash API using the userId
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`https://api.unsplash.com/users/${userId}`, {
          headers: {
            Authorization: 'Client-ID LgXK-QUjCcCd6Da5-58Bt4f2RQLO6gRCgNlRhVxrY3k', // Replace with your provided client_id
          },
        });

        setUserData(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch user profile. Please try again later.');
        setLoading(false);
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  return (
    <div>
      <Head>
        <title>User Profile</title>
        <meta name="description" content="User Profile" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>        
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <UserProfile userData={userData} />
        )}
      </main>

      {/* Add any other necessary styles here */}
      <style jsx>{`
        /* Add custom styles here if needed */
      `}</style>
    </div>
  );
};

export default UserProfilePage;
