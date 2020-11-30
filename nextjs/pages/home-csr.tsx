import { useState, useEffect } from 'react';
import Head from 'next/head';
import React from 'react';
import Layout from '../components/Layout';

export default function Home2() {
  const [movies, setMovies] = useState<Array<any>>();

  useEffect(() => {
    const fetchMovies = async () => {
      console.log('EWEWEWE');
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}movies`);
      const movies: any[] = await res.json();

      setMovies(movies);
    };

    fetchMovies();
  }, []);

  return (
    <Layout>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Welcome!</h1>
      <h2>Latest Movie</h2>
      <h2>Timestamp: {Date.now()}</h2>
      <ul>
        {!movies ? (
          <p>Loading...</p>
        ) : (
          movies.map((movie) => {
            return <li key={movie.id}>{movie.title}</li>;
          })
        )}
      </ul>
    </Layout>
  );
}
