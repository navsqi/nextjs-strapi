import Layout from '../../components/Layout';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

interface Values {
  title: string;
  release_date: Date;
}

const CreateMovie = () => {
  const { register, handleSubmit, errors } = useForm<Values>();
  const router = useRouter();

  return (
    <Layout>
      <div>
        <form
          onSubmit={handleSubmit(async (values) => {
            await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}movies`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjA2NzMzMDc0LCJleHAiOjE2MDkzMjUwNzR9._cUCZblZi47K8WqdQBbI0clK74ZwWvMlUJ1kbhxPdgw',
              },
              body: JSON.stringify(values),
            });

            router.push('/');
          })}
        >
          <label>Title</label>
          <br />
          <input type="text" name="title" ref={register} />
          <br />
          <label>Release date</label>
          <br />
          <input type="date" name="release_date" ref={register} />
          <br />
          <button type="submit">Save</button>
        </form>
      </div>
    </Layout>
  );
};

export default CreateMovie;
