import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { getFeedPhotos } from '../utils/unsplashApi';
import styles from '../styles/index.module.css';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Username_CTA from "../pages/user/Username_CTA";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Link from 'next/link';

const Home = () => {
  const [val] = useState(Math.floor(Math.random() * 60))
  const [photos, setPhotos] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [isFetching, setIsFetching] = useState(false);
  const endOfListRef = useRef(null);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await getFeedPhotos(10 * page);
        setPhotos(response);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch photos. Or Rate Limit Exceeded. Please try again later');
        setLoading(false);
      }
    };

    fetchPhotos();
  }, [page]);

  const handleObserver = (entries) => {
    const target = entries[0];
    if (target.isIntersecting && !isFetching) {
      setIsFetching(true);
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: '20px',
      threshold: 1.0,
    });

    const targetNode = endOfListRef.current;
    if (targetNode) {
      observer.observe(targetNode);
    }

    return () => {
      if (targetNode) {
        observer.unobserve(targetNode);
      }
    };
  });

  useEffect(() => {
    const fetchMorePhotos = async () => {
      try {
        const response = await getFeedPhotos(10 * page);
        setPhotos((prevPhotos) => [...prevPhotos, ...response]);
        setIsFetching(false);
      } catch (err) {
        setError('Failed to fetch more photos. Please try again later.');
        setIsFetching(false);
      }
    };

    if (page > 1) {
      fetchMorePhotos();
    }
  }, [page]);

  return (
    <div>
      <Head>
        <title>Pratibimb</title>
        <meta name="description" content="Pratibimb" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <div className={styles.photoFeed}>
            {photos.map((photo, index) => {
              const username = photo.user?.username || Username_CTA[Math.floor(Math.random() * val)].content;
              return (
                <div key={photo.id} className={styles.photoItem}>
                  <div className={styles.imageContainer}>
                    <Image
                      src={photo.urls.regular}
                      alt={photo.alt_description}
                      width={300}
                      height={200}
                      objectFit="cover"
                    />
                  </div>
                  <div className={styles.photoInfo}>
                    <div className={styles.likesContainer}>
                      <FavoriteBorderIcon style={{ color: 'red', marginRight: '5px' }} />
                      <p>{photo.likes}</p>
                    </div>
                    <div className={styles.likesContainer} style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <p>Location: {photo.location?.name || 'Unknown'}</p>
                      {photo.user ? (
                        <Link href={`/user/${username}`}>
                          <AccountCircleIcon style={{ color: 'blue', marginRight: '5px' }} />
                          {/* <p>{username}</p> */}
                      </Link>
                      ) : (
                        <Link href={`/user/${username}`}>
                        <AccountCircleIcon style={{ color: 'blue', marginRight: '5px' }} />
                        {/* <p>{username}</p> */}
                    </Link>
                      )}
                    </div>
                  </div>
                  {index === photos.length - 1 && <div ref={endOfListRef}></div>}
                </div>
              );
            })}
          </div>
        )}
      </main>
      <style jsx>{`
        .photo-feed {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 20px;
        }
        .photo-item {
          border: 1px solid #ccc;
          border-radius: 5px;
          padding: 10px;
        }
        .photo-info {
          margin-top: 10px;
          font-size: 14px;
        }
      `}</style>
    </div>
  );
};

export default Home;
