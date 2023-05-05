import ProductItem from "./ProductItem";
import classes from "./Products.module.css";
const list = [
  {
    title: "Test",
    price: 6,
    description: "This is a first product - amazing!",
  },
  {
    title: "phone",
    price: 5000,
    description: "this is the best phone in the world",
  },
  {
    title: "Book",
    price: 500,
    description: "this is the best Book in the world",
  },
  {
    title: "laptop",
    price: 500000,
    description: "this is the best laptop in the world",
  },
];
const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {list.map((e) => {
          return (
            <ProductItem
              key={e.title}
              title={e.title}
              price={e.price}
              description={e.description}
            />
          );
        })}
      </ul>
    </section>
  );
};

export default Products;
