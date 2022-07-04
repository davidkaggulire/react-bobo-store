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
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ipsum faucibus vitae aliquet nec. Feugiat in fermentum posuere urna. Facilisis magna etiam tempor orci eu lobortis elementum nibh. Sit amet tellus cras adipiscing enim eu turpis egestas pretium. Augue lacus viverra vitae congue eu consequat ac felis. Nec feugiat in fermentum posuere urna nec tincidunt praesent. Nunc sed augue lacus viverra vitae congue. Id diam maecenas ultricies mi. Ipsum faucibus vitae aliquet nec ullamcorper sit amet risus nullam.",
    image:
      "https://images.pexels.com/photos/1436134/pexels-photo-1436134.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: "p2",
    price: 5,
    title: "Socks",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt",
    quantity: 10,
    image:
      "https://images.pexels.com/photos/2658451/pexels-photo-2658451.jpeg?auto=compress&cs=tinysrgb&w=600",
  },

  {
    id: "p3",
    price: 5,
    title: "Laces",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt",
    quantity: 10,
    image:
      "https://images.pexels.com/photos/1808398/pexels-photo-1808398.jpeg?auto=compress&cs=tinysrgb&w=600",
  },

  {
    id: "p4",
    price: 5,
    title: "Tees",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt",
    quantity: 10,
    image:
      "https://images.pexels.com/photos/2681741/pexels-photo-2681741.jpeg?auto=compress&cs=tinysrgb&w=600",
  },

  {
    id: "p5",
    price: 5,
    title: "Bags",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt",
    quantity: 10,
    image:
      "https://images.pexels.com/photos/7255442/pexels-photo-7255442.jpeg?auto=compress&cs=tinysrgb&w=600",
  },

  {
    id: "p6",
    price: 5,
    title: "Wristbands",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt",
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
