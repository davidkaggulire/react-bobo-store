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
      "https://images.pexels.com/photos/6633371/pexels-photo-6633371.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: "p2",
    price: 5,
    title: "Socks",
    description:
      "Socks that match any wear",
    quantity: 10,
    image:
      "https://images.pexels.com/photos/4715341/pexels-photo-4715341.jpeg?auto=compress&cs=tinysrgb&w=600",
  },

  {
    id: "p3",
    price: 5,
    title: "Laces",
    description:
      "Gentle laces for any wear",
    quantity: 10,
    image:
      "https://images.pexels.com/photos/7119090/pexels-photo-7119090.jpeg?auto=compress&cs=tinysrgb&w=600",
  },

  {
    id: "p4",
    price: 5,
    title: "TShirts",
    description:
      "TShirts",
    quantity: 10,
    image:
      "https://images.pexels.com/photos/6604551/pexels-photo-6604551.jpeg?auto=compress&cs=tinysrgb&w=600",
  },

  {
    id: "p5",
    price: 5,
    title: "Bags",
    description:
      "Bags for women",
    quantity: 10,
    image:
      "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=600",
  },

  {
    id: "p6",
    price: 5,
    title: "Handkerchiefs",
    description:
      "The perfect Handkerchiefs",
    quantity: 10,
    image:
      "https://images.pexels.com/photos/945698/pexels-photo-945698.jpeg?auto=compress&cs=tinysrgb&w=600",
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
