import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Layout from '../../components/Layout';

// 3) 🚀 Create component, destructuring props {movie}
const SingleMovie = ({ movie }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <Layout>
      <h1>{movie.title}</h1>
      <p>{movie.release_date}</p>
      <h3>Actors:</h3>
      <ol>
        {movie.actors.map((actor: Record<any, string | number>) => {
          return (
            <li key={actor.id}>
              {actor.first_name} {actor.last_name}
            </li>
          );
        })}
      </ol>
    </Layout>
  );
};

// 2) 🚀 Get all movies for create all paths
export const getStaticPaths = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}movies`);
  const movies: any[] = await res.json();
  const paths = movies.map((movie) => {
    return { params: { id: `${movie.id}` } };
  });

  return {
    paths,
    fallback: false,
  };
};

// 🚀 1) Get data movie by id
export const getStaticProps: GetStaticProps = async (context) => {
  const id = context.params?.id;

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}movies/${id}`);
  const movie: Record<any, string | number> | undefined = await res.json();

  return { props: { movie } };
};

export default SingleMovie;
