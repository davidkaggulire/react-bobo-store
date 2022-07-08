import { Fragment } from "react";
import classes from "./Products.module.css";
import ProductItem from "./ProductItem";

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

const Products = () => {
  return (
    <Fragment>
      <h4 className={classes.product__title}>FEATURED PRODUCTS</h4>
      <section className={classes.section_product}>
        {DUMMY_PRODUCTS.map((product) => (
          <ProductItem
            key={product.id}
            id={product.id}
            title={product.title}
            price={product.price}
            description={product.description}
            quantity={product.quantity}
            image={product.image}
          />
        ))}
      </section>
    </Fragment>
  );
};

export default Products;
