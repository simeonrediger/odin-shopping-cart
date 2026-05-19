import styles from './PageLoader.module.css';
import Loader from './Loader/Loader.jsx';

export default function PageLoader() {
  return (
    <div className={styles.loaderContainer}>
      <Loader />
    </div>
  );
}
