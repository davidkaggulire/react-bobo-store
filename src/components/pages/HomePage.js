import { Fragment, useState } from "react";
import classes from "./HomePage.module.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { useNavigate } from "react-router-dom";
import logo from "./../../assets/paper.jpg";

const HomePage = () => {
  const [showStoreElement, setShowStoreElement] = useState(true);
  const [showHelpElement, setShowHelpElement] = useState(true);
  const [showCompanyElement, setShowCompanyElement] = useState(true);
  const [showFindElement, setShowFindElements] = useState(true);

  const navigate = useNavigate();

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

  const productRoute =() => {
    navigate("/products", true)
  }

  return (
    <Fragment>
      <section className={classes.welcome_section}>
        <div className={classes.title_section}>
          <img src={logo} className={classes.head_image} alt="start"/>
          <p className={classes.mainheading}>
            Bobo
          </p>

          <button onClick={productRoute} className={classes.shop_btn}>Shop Now</button>
          
        </div>
      </section>

      <div className={classes.title_carousel}>Featured products</div>

      <section className={classes.middle_section}>
        <div className={classes.carousel_wrapper}>
          <Carousel
            infiniteLoop
            autoPlay
            showArrows={true}
            showThumbs={false}
            showStatus={false}
            centerSlidePercentage="80"
            centerMode={false}
            className={classes.card_carousel}
          >
            <div className={classes.image_container}>
              <img
                src="https://images.pexels.com/photos/7119090/pexels-photo-7119090.jpeg?auto=compress&cs=tinysrgb&w=600"
                className={classes.carousel_image}
                alt="shoes"
              />
            </div>
            <div className={classes.image_container}>
              <img
                src="https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=600"
                className={classes.carousel_image}
                alt="bag"
              />
            </div>
            <div className={classes.image_container}>
              <img
                src="https://images.pexels.com/photos/945698/pexels-photo-945698.jpeg?auto=compress&cs=tinysrgb&w=600"
                className={classes.carousel_image}
                alt="hankie"
              />
            </div>
          </Carousel>
        </div>
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
