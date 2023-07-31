// components/UserProfile.js

import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from '../styles/UserProfile.module.css';
import Head from 'next/head';
import insta from "../img/insta.png"
import twitter from "../img/twitter.png";
import Link from 'next/link';
import Home from "./homepage";

const UserProfile = ({ userData }) => {
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(false);
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
    <div className={styles.userProfileContainer}>
    <div className={styles.userInfo}>
      <div className={styles.profileImageContainer}>
        <div className={styles.profileImageWrapper}>
          <Image
            src={userData.profile_image.large}
            alt={userData.alt_description}
            width={128}
            height={128}
            objectFit="cover"
            className={styles.profileImage}
          />
        </div>
      </div>
      <h1>{userData.name}</h1>
      <p>{userData.location}</p>
      <p>{userData.bio || 'No bio available.'}</p>
      <div style={{display:'flex', flexDirection:'row', gap:'20px'}}>
      <Link target="_blank" href={`https://www.instagram.com/${userData.instagram_username}/`}>
      <Image src={insta} alt='instagram' width={30} height={30}/>
    </Link>
    <Link target="_blank" href={`https://twitter.com/${userData.twitter_username}/`}>
      <Image src={twitter} alt='twitter' width={30} height={30}/>
    </Link>
      </div>
    </div>
    <div className={styles.photoGrid}>
      {userData.photos.map((photo) => (
        <div key={photo.id} className={styles.photoItem}>
          <Image
            src={photo.urls.regular}
            alt={photo.alt_description}
            width={300}
            height={200}
            objectFit="cover"
          />
        </div>
      ))}
    </div>
  </div>
  <p style={{fontSize:'2rem', fontWeight:'bolder', textAlign:'center'}}>Other User Uploads</p>
  <Home/>
  </div>
  );
};

export default UserProfile;
