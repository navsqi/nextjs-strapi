import { InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import Cookies from 'js-cookie';

export default function Home(props: InferGetStaticPropsType<typeof getStaticProps>) {
  // inisialisasi state
  const [jwt, setJwt] = useState('Not Authenticated');
  const [role, setRole] = useState('Not Authenticated');

  // use effect
  useEffect(() => {
    // get data from cookies
    const usr = Cookies.getJSON('usr'); // {jwt: xxx, role: xxx}
    // check if usr exists then store the jwt property
    const jwt = usr?.jwt;
    // check if usr exists then store the role property
    const role = usr?.role;

    if (jwt && role) {
      // store data to state
      setJwt(jwt);
      setRole(role);
    }
  }, []);

  return (
    <Layout>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Welcome!</h1>
      {jwt !== '' ? (
        <p>
          JWT: <pre>{jwt}</pre>
        </p>
      ) : (
        false
      )}
      {role !== '' ? <p>Role: {role}</p> : false}
      <h2>Latest Movie</h2>
      <h2>Timestamp: {Date.now()}</h2>
      <ul>
        {props.movies.map((movie) => {
          return (
            <li key={movie.id}>
              <Link href="/movies/[id]" as={`/movies/${movie.id}`}>
                <a>{movie.title}</a>
              </Link>
            </li>
          );
        })}
      </ul>
      <style jsx>
        {`
          pre {
            overflow: scroll;
          }
        `}
      </style>
    </Layout>
  );
}

export const getStaticProps = async () => {
  const res = await fetch('http://localhost:1337/movies/');
  const movies: any[] = await res.json();

  return { props: { movies } };
};
