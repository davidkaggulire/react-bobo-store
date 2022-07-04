import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { cartActions } from "../../store/cart-slice";
import CartButton from "../Cart/CartButton";
import classes from "./ProductItem.module.css";

const ProductItem = (props) => {
  const { id, price, title, quantity, image, description } = props;
  const dispatch = useDispatch();

  const addToCartHandler = () => {
    dispatch(
      cartActions.addItemToCart({
        id,
        price,
        title,
        image,
        description,
      })
    );
  };

  return (
    <div className={classes.product}>
      <Link className={classes.link} to={`/products/${id}`}>
        <h2>{title}</h2>
      </Link>
      <div className={classes.product_image}>
        <img src={image} alt="product" className={classes.image}></img>
      </div>

      <div className={classes.info}>
        <p className={classes.quantity}>
          Quantity left:<span>{quantity}</span>
        </p>
        <p className={classes.price}>
          Price:<span>{price}</span>
        </p>
      </div>
      <div className={classes.btn}>
        <CartButton onClick={addToCartHandler} />
      </div>
    </div>
  );
};

export default ProductItem;
