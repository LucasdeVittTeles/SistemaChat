import { Link } from "react-router-dom";
import styles from "./header.module.css";
import { FaDiceD20 } from "react-icons/fa";

const Header = () => {
  return (
    <div className={styles.container}>
      <FaDiceD20 size={38} />
      <div className={styles.content}>
        <Link to={"/"} className={styles.links}>CRIAR<hr/></Link>
        <Link to={"/listingPage"} className={styles.links}>LISTAR<hr/></Link>
      </div>
    </div>
  );
};

export default Header;
