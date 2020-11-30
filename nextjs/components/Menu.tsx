import Link from 'next/link';
import styles from './Menu.module.scss';

const Menu = () => {
  return (
    <div className={styles.menu_wrapper}>
      <Link href="/">
        <a className={styles.menu}>Home</a>
      </Link>
      <Link href="/products?foo=bar&name=nauval">
        <a className={styles.menu}>Products</a>
      </Link>
      <Link href="/products/[category]" as={'/products/notebook-category'}>
        <a className={styles.menu}> Notebook Category</a>
      </Link>
    </div>
  );
};

export default Menu;
