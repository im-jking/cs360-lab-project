import Header from "../Header";

export default function Products() {
  return (
    <>
      <Header />
      <h1>Products</h1>
      <p>
        Available products will go here, list and cart object should be stored
        globally to ensure the cart object is visible on multiple pages and
        still available at checkout. Items should be visible as cards onscreen
        (responsive layout) and open a modal when "Item Details" is selected.
      </p>
    </>
  );
}
