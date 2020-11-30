import Layout from '../../components/Layout';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { useState } from 'react';
import styles from './Login.module.scss';

interface Values {
  title: string;
  release_date: Date;
}

const Login = () => {
  const { register, handleSubmit, errors } = useForm<Values>();
  const [errorAPI, setErrorAPI] = useState('');
  const router = useRouter();

  return (
    <Layout>
      <div>
        <form
          onSubmit={handleSubmit(async (values) => {
            let res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}auth/local`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(values),
            });

            let user = await res.json();
            if (user?.statusCode === 400) {
              setErrorAPI(`Invalid email or password`);
            } else {
              Cookies.set('usr', { jwt: user.jwt, role: user.user.role.type });
              router.push('/');
            }
          })}
        >
          <label>Identifier</label>
          <br />
          {errorAPI !== '' ? <p className={styles.danger}>{errorAPI}</p> : false}
          <br />
          <input type="text" name="identifier" ref={register} />
          <br />
          <label>Password</label>
          <br />
          <input type="text" name="password" ref={register} />
          <br />
          <button type="submit">Save</button>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
