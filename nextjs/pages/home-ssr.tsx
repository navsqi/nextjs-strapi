import { InferGetServerSidePropsType, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import React from 'react';
import Layout from '../components/Layout';

export default function Home2(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
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
        {props.movies.map((movie) => {
          return <li key={movie.id}>{movie.title}</li>;
        })}
      </ul>
    </Layout>
  );
}

export const getServerSideProps = async () => {
  const res = await fetch('http://localhost:1337/movies/');
  const movies: any[] = await res.json();

  return { props: { movies } };
};
