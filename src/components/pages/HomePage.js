import { Fragment } from "react";
import { Link } from "react-router-dom";
import classes from "./HomePage.module.css";

const HomePage = () => {
  return (
    <Fragment>
      <section className={classes.welcome_section}>
        <div className={classes.one}>
          <p className={classes.mainheading}>Bobo Scarf Line</p>
        </div>

        <div className={classes.image}>
          <img
            src="https://images.pexels.com/photos/7080389/pexels-photo-7080389.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt="start"
          />
        </div>
      </section>

      <footer className={classes.footer}>
        <nav className={classes.footer_nav}>
          <ul className={classes.footer_element}>
            <li>About us</li>
            <li>
              <Link to="/products">Products</Link>
            </li>
            <li>Contact us</li>
          </ul>
        </nav>
      </footer>
    </Fragment>
  );
};

export default HomePage;
