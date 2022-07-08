import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { cartActions } from "../../store/cart-slice";
import CartButton from "../Cart/CartButton";
import classes from "./ProductDetail.module.css";

const DUMMY_PRODUCTS = [
  {
    id: "p1",
    price: 6,
    title: "Scarf",
    quantity: 100,
    description:
      "Warm comfy scarfs",
    image:
      "https://images.pexels.com/photos/1436134/pexels-photo-1436134.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: "p2",
    price: 5,
    title: "Socks",
    description:
      "Socks that match any wear",
    quantity: 10,
    image:
      "https://images.pexels.com/photos/2658451/pexels-photo-2658451.jpeg?auto=compress&cs=tinysrgb&w=600",
  },

  {
    id: "p3",
    price: 5,
    title: "Laces",
    description:
      "Gentle laces for any wear",
    quantity: 10,
    image:
      "https://images.pexels.com/photos/1808398/pexels-photo-1808398.jpeg?auto=compress&cs=tinysrgb&w=600",
  },

  {
    id: "p4",
    price: 5,
    title: "Tees",
    description:
      "Tees for women",
    quantity: 10,
    image:
      "https://images.pexels.com/photos/2681741/pexels-photo-2681741.jpeg?auto=compress&cs=tinysrgb&w=600",
  },

  {
    id: "p5",
    price: 5,
    title: "Bags",
    description:
      "Bags for women",
    quantity: 10,
    image:
      "https://images.pexels.com/photos/7255442/pexels-photo-7255442.jpeg?auto=compress&cs=tinysrgb&w=600",
  },

  {
    id: "p6",
    price: 5,
    title: "Wristbands",
    description:
      "The perfect wristbands",
    quantity: 10,
    image:
      "https://images.pexels.com/photos/1619801/pexels-photo-1619801.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
];

const ProductDetail = () => {
  const productParams = useParams();
  const dispatch = useDispatch();

  const { productId } = productParams;

  const product = DUMMY_PRODUCTS.find((item) => item.id === productId);
  // console.log(product);

  const addItemToCartHandler = () => {
    dispatch(
      cartActions.addItemToCart({
        id: product.id,
        price: product.price,
        title: product.title,
        image: product.image,
        description: product.description,
      })
    );
  };

  return (
    <section className={classes.shopping}>
      <h3>Product Details</h3>
      <div className={classes.cart_item}>
        <img src={product.image} alt="cart item" />
        <div className={classes.details}>
          <h2>{product.title}</h2>
          <p className={classes.description}>{product.description}</p>
          <p>
            Quantity:{" "}
            <span className={classes.span_qty}>{product.quantity}</span>
          </p>
          <div className={classes.actions}>
            <CartButton onClick={addItemToCartHandler} />
          </div>
        </div>
        <p>
          Price: <span className={classes.span_price}>{product.price}</span>
        </p>
      </div>
      <div></div>
    </section>
  );
};

export default ProductDetail;
