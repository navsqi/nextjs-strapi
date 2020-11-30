import { useRouter } from 'next/router';
import Layout from '../../components/Layout';

const Products = () => {
  const router = useRouter();

  return (
    <Layout>
      <h1>Products</h1>
    </Layout>
  );
};

export default Products;
