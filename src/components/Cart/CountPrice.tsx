import { useTheme } from "../../context/ThemeContext";
import { useBooking } from "../../context/BookingContext";
import { useNavigate } from "react-router-dom";

const CountPrice = () => {
  const { cart } = useBooking();
  const { themeColors } = useTheme();
  
  const nav = useNavigate()

  const totalPrice = cart.reduce((sum, lesson) => {
    const price = lesson.price;
    return sum + price;
  }, 0);

  const tax = totalPrice * 0.25;
  const subtotal = totalPrice - tax;
  const { clearCart } = useBooking();

  return (
    <section
      className={`${themeColors.bgWidget} col-span-1 h-full max-h-[160px] self-center shadow-lg 
        rounded-lg p-6 flex flex-col justify-center py-24
        border ${themeColors.border}
         ${themeColors.text} `}
    >
      <div className="pb-1">
        <div className="flex justify-between">
          <p>Subtotal: </p>
          <p> {subtotal} kr</p>
        </div>
        <div className="flex justify-between">
          <p>Tax:</p>
          <p>{tax} kr</p>
        </div>
      </div>
      <hr />
      <div className="flex justify-between font-semibold pt-1">
      <h3>Estimate Total: </h3>
      <h3>{totalPrice} kr</h3>
      </div>
      <button
        onClick={() => nav("/checkout")}
        className="px-3 py-1 text-md font-semibold rounded
           bg-green-600 text-white hover:bg-green-700
            focus:ring-2 focus:ring-green-400 mt-2"
      >
        Checkout
      </button>

      {/* // Empty cart button */}
      <button
        onClick={clearCart}
        className="
          mt-2 px-3 py-1 text-sm font-semibold rounded
          border border-red-500 text-red-500
          hover:bg-red-500 hover:text-white
          focus:ring-2 focus:ring-red-400
        "
      >
        Empty Cart
      </button>
    </section>
  );
};

export default CountPrice;
