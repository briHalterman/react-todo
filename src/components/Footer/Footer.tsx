import styles from './Footer.module.css';

function Footer() {
  return (
    <footer className={styles.footer}>
      <p>© {new Date().getFullYear()} by Brittany Halterman.</p>
    </footer>
  );
}

export default Footer;