import { Fragment, useState } from "react";
// import { Link } from "react-router-dom";
import classes from "./HomePage.module.css";

const HomePage = () => {
  const [showStoreElement, setShowStoreElement] = useState(true);
  const [showHelpElement, setShowHelpElement] = useState(true);
  const [showCompanyElement, setShowCompanyElement] = useState(true);
  const [showFindElement, setShowFindElements] = useState(true);

  const showStores = () => {
    setShowStoreElement((prevState) => !prevState);
  };

  const showHelp = () => {
    setShowHelpElement((prevState) => !prevState);
  };

  const showCompany = () => {
    setShowCompanyElement((prevState) => !prevState);
  };

  const showFind = () => {
    setShowFindElements((prevState) => !prevState);
  };

  let storeIcon = "";
  let companyIcon = "";
  let helpIcon = "";
  let findIcon = "";

  if (showStoreElement) {
    storeIcon = "-";
  } else {
    storeIcon = "+";
  }

  if (showCompanyElement) {
    companyIcon = "-";
  } else {
    companyIcon = "+";
  }

  if (showHelpElement) {
    helpIcon = "-";
  } else {
    helpIcon = "+";
  }

  if (showFindElement) {
    findIcon = "-";
  } else {
    findIcon = "+";
  }

  return (
    <Fragment>
      <section className={classes.welcome_section}>
        <p className={classes.mainheading}>
          The store <span className={classes.word_heading}>for the</span>{" "}
          perfect scarfs
        </p>
      </section>

      <footer className={classes.footer}>
        <nav className={classes.footer_nav}>
          <ul className={classes.footer_element}>
            <li className={classes.footer__single}>
              <div className={classes.footer__title}>
                <p onClick={showStores}>Our stores</p>
                <p className={classes.view} onClick={showStores}>
                  {storeIcon}
                </p>
              </div>
              {showStoreElement && (
                <div>
                  <p>Kampala Branch</p>
                  <p>Wakiso Branch</p>
                </div>
              )}
            </li>
            <li className={classes.footer__single}>
              <div className={classes.footer__title}>
                <p onClick={showHelp}>Need Help</p>
                <p className={classes.view} onClick={showHelp}>
                  {helpIcon}
                </p>
              </div>
              {showHelpElement && (
                <div>
                  <p>Contact Us</p>
                </div>
              )}
            </li>
            <li className={classes.footer__single}>
              <div className={classes.footer__title}>
                <p onClick={showCompany}>The Company</p>
                <p className={classes.view} onClick={showCompany}>
                  {companyIcon}
                </p>
              </div>
              {showCompanyElement && (
                <div>
                  <p>About us</p>
                </div>
              )}
            </li>
            <li className={classes.footer__single}>
              <div className={classes.footer__title}>
                <p onClick={showFind}>Find Us On</p>
                <p className={classes.view} onClick={showFind}>
                  {findIcon}
                </p>
              </div>
              {showFindElement && (
                <div>
                  <p>Twitter</p>
                  <p>Facebook</p>
                </div>
              )}
            </li>
          </ul>
        </nav>
        <div>
          <li className={classes.footer__last}>
            <p>Copyright&copy; 2022 </p>
            <p>All Rights Reserved by Bobo Store</p>
          </li>
        </div>
      </footer>
    </Fragment>
  );
};

export default HomePage;
