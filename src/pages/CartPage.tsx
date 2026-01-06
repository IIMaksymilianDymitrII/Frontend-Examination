import { useTheme } from "../Context/ThemeContext";
import { useBooking } from "../Context/BookingContext";
import ShoppingCart from "../components/Cart/ShoppingCart";

const CartPage = () => {
  const { cart} = useBooking();
  const { themeColors } = useTheme();

  return (
    <main className={`max-h-screen ${themeColors.text} `}>
      <section className="">
        <div className={`p-3 flex justify-center items-center `}>
          <h1 className="text-3xl font-semibold p-10">Your Shopping Cart</h1>
        </div>
      </section>
      {cart.length === 0 ? <p className="flex justify-center items-center text-4xl h-[500px]">Your Cart is Empty</p> : <ShoppingCart />}
    </main>
  );
};

export default CartPage;
