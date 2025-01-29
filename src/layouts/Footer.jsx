import { Link } from "react-router-dom"
import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
        <Link to="https://www.linkedin.com/in/milad-akbari-developer/" target="_blank">Linkedin</Link>
        <p>توسعه داده شده توسط مهندس میلاد اکبری</p>
    </footer>
  )
}

export default Footer