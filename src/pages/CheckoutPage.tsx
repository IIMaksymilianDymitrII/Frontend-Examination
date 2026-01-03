import { useState} from "react";
import { useTheme } from "../context/ThemeContext";
import GoogleLogo from "../assets/Google__G__logo.svg.png";
import AppleLogo from "../assets/AppleLogo.png";
import { useBooking } from "../context/BookingContext";
import { useNavigate } from "react-router-dom";

const isValidCardNumber = (number: string) => /^[0-9]{16}$/.test(number);
const isValidCVV = (cvv: string) => /^[0-9]{3}$/.test(cvv);
const isValidValidUntil = (date: string) => {
  if (!date) return false;
  const [year, month] = date.split("-").map(Number);
  const expiry = new Date(year, month - 1);
  const now = new Date();
  expiry.setMonth(expiry.getMonth() + 1);
  expiry.setDate(0);
  return expiry >= now;
};

const CheckoutPage = () => {
  const storedUser = localStorage.getItem("user"); // ok
  const loggedInUser = storedUser ? JSON.parse(storedUser) : null; // ok
  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;

  const { themeColors } = useTheme(); // ok
  const navigate = useNavigate(); // add more navigation if needed

  // form state - for new summary step
  // const [step, setStep] = useState(loggedInUser ? 1 : 0);
  const [step, setStep] = useState(0);
  const [coupon, setCoupon] = useState(""); // added for discount code
  const [emailError, setEmailError] = useState(false); // ok
  const [error, setError] = useState(false); // ok

  const [cardNumberError, setCardNumberError] = useState(false); //ok
  const [cvvError, setCvvError] = useState(false); // ok
  const [validUntilError, setValidUntilError] = useState(false); // ok

  const [formData, setFormData] = useState(() => ({
    email: loggedInUser?.email ?? "",
    firstName: loggedInUser?.name ?? "",
    lastName: loggedInUser?.lastname ?? "",
    cardNumber: "",
    cvv: "",
    validUntil: "",
  }));

  const { completePurchase, cart, discountAmount, applyDiscount } = useBooking(); // ok. added discountAmount, applyDiscount

  // calculate totals
  const subtotal = cart.reduce((sum, l) => sum + l.price, 0);
  const tax = subtotal * 0.25;
  const total = subtotal + tax - discountAmount; // updated total with discountAmount

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "email" && value.includes("@") && value.includes("."))
      setEmailError(false);
    if ((name === "firstName" || name === "lastName") && value.trim())
      setError(false);

    if (name === "cardNumber" && isValidCardNumber(value))
      setCardNumberError(false);
    if (name === "cvv" && isValidCVV(value)) setCvvError(false);
    if (name === "validUntil" && isValidValidUntil(value))
      setValidUntilError(false);
  };
  
  // formData is initialized with the logged-in user's values above to avoid calling setState inside an effect

  const steps = [
    <section className={`p-4 w-[auto] h-[600px] ${themeColors.bgWidget} border ${themeColors.border} rounded-xl mt-[200px]`}
        >
          <h1 className="text-2xl font-semibold mb-4">Order Summary</h1>

          <ul className="space-y-2">
            {cart.map((l) => (
              <li key={l.id} className="flex justify-between">
                <span>
                  {l.title} – {l.date} {l.time} {l.location} {l.duration} minutes with {l.instructor}
                </span>
                <span>{l.price} kr</span>
              </li>
            ))}
          </ul>

          <hr className="my-3" />

          <p>Subtotal: {subtotal} kr</p>
          <p>Tax: {tax} kr</p>
          {discountAmount > 0 && (
            <p className="text-green-600">
              Discount: -{discountAmount} kr
            </p>
          )}
          <p className="font-semibold">Total: {total} kr</p>

          <div className="flex gap-2 mt-4">
            <input
              placeholder="Discount code"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              className={`rounded-xl pl-2 h-8 ${themeColors.elevated} border`}
            />
            <button
              onClick={() => applyDiscount(coupon, subtotal + tax)}
              className="bg-indigo-600 text-white px-4 rounded-xl"
            >
              Apply
            </button>
          </div>

          <div className="flex justify-between mt-6">
            <button
              onClick={() => navigate("/schedules")}
              className="underline font-semibold"
            >
              Add more items to cart
            </button>

            <button
              onClick={() => navigate("/cart")}
              className="underline font-semibold"
            >
              Back to Cart
            </button>

            <button
              onClick={() => setStep(isLoggedIn ? 2 : 1)}
              className="bg-green-700 rounded-xl px-6 py-2 font-semibold"
            >
              Proceed to Checkout
            </button>
          </div>
        </section>,

    <section
      className={`p-3 flex flex-col w-[400px] gap-2 ${themeColors.bgWidget} border ${themeColors.border} rounded-xl h-fit mt-[250px]`}
    >
      <p className="font-semibold">Email Address</p>
      <input
        className={`rounded-xl pl-2 h-8 ${themeColors.elevated} ${themeColors.border} border`}
        placeholder="Email Address"
        name="email"
        value={formData.email}
        onChange={handleChange}
      />
      <p className="font-semibold">Name</p>
      <input
        className={`rounded-xl pl-2 h-8 ${themeColors.elevated} ${themeColors.border} border`}
        placeholder="Name"
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
      />
      <p className="font-semibold">Last name</p>
      <input
        className={`rounded-xl pl-2 h-8 ${themeColors.elevated} ${themeColors.border} border`}
        placeholder="Last name"
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
      />
      <button
        className="bg-blue-600 hover:bg-blue-700 w-fit self-center rounded-xl px-4 py-2 font-semibold mt-3"
        onClick={() => {
          if (!formData.email.includes("@") || !formData.email.includes(".")) {
            setEmailError(true);
            return;
          }
          if (!formData.firstName.trim() || !formData.lastName.trim()) {
            setError(true);
            setEmailError(false);
            return;
          }
          setEmailError(false);
          setError(false);
          setStep(2);
        }}
      >
        Next
      </button>
      {emailError && (
        <div className="bg-red-700 text-white rounded-xl px-3 font-bold w-fit self-center mt-3">
          <p>Please Enter a Valid Email Address</p>
        </div>
      )}
      {error && (
        <div className="bg-red-700 text-white rounded-xl px-3 font-bold w-fit self-center mt-3">
          <p>Please Enter your Name & Last name</p>
        </div>
      )}
    </section>,

    <section
      className={`p-4 flex flex-col w-[400px] gap-2 ${themeColors.bgWidget} border ${themeColors.border} rounded-xl mt-[250px] h-fit`}
    >
      <h1 className="font-semibold text-2xl self-center">Card Payment</h1>

      <p className="font-semibold">Card Number</p>
      <input
        className={`rounded-xl pl-2 h-8 ${themeColors.elevated} ${themeColors.border} border`}
        type="text"
        name="cardNumber"
        maxLength={16}
        value={formData.cardNumber}
        onChange={handleChange}
      />
      {cardNumberError && (
        <p className="text-red-700 font-bold">Card Number must be 16 digits</p>
      )}

      <div className="flex gap-2 mt-2">
        <div>
          <p className="font-semibold">CVV</p>
          <input
            className={`rounded-xl pl-2 h-8 ${themeColors.elevated} ${themeColors.border} border`}
            type="text"
            name="cvv"
            maxLength={3}
            value={formData.cvv}
            onChange={handleChange}
          />
          {cvvError && (
            <p className="text-red-700 font-bold">CVV must be 3 digits</p>
          )}
        </div>
        <div>
          <p className="font-semibold">Valid Until</p>
          <input
            className={`rounded-xl pl-2 h-8 ${themeColors.elevated} ${themeColors.border} border`}
            type="month"
            name="validUntil"
            value={formData.validUntil}
            onChange={handleChange}
          />
          {validUntilError && (
            <p className="text-red-700 font-bold">
              Card expiration date is invalid or expired
            </p>
          )}
        </div>
      </div>

      <button
        className="bg-green-700 hover:bg-green-600 w-full self-center rounded-xl px-4 py-2 font-semibold mt-3"
        onClick={() => {
          let hasError = false;

          if (!isValidCardNumber(formData.cardNumber)) {
            setCardNumberError(true);
            hasError = true;
          }
          if (!isValidCVV(formData.cvv)) {
            setCvvError(true);
            hasError = true;
          }
          if (!isValidValidUntil(formData.validUntil)) {
            setValidUntilError(true);
            hasError = true;
          }

          if (hasError) return;
          completePurchase();
          setStep(3);
        }}
      >
        Complete Purchase
      </button>

      <hr className="my-3" />
      <ul className="flex justify-center items-center gap-2">
        <li>
          <button>
            <div className="bg-white flex items-center justify-center gap-2 font-bold text-xl text-black h-10 rounded-xl w-[180px] p-3">
              <img src={AppleLogo} alt="Apple Logo" className="w-3.5" />
              Pay
            </div>
          </button>
        </li>
        <li>
          <button>
            <div className="bg-white flex items-center justify-center gap-2 font-bold text-xl text-black h-10 rounded-xl w-[180px] p-3">
              <img src={GoogleLogo} alt="Google Logo" className="w-5" />
              Pay
            </div>
          </button>
        </li>
      </ul>
    </section>,

    <section className="flex flex-col items-center text-center flex-1 mt-[250px]">
      <h1 className="font-bold text-4xl p-3">Thank You for your Purchase</h1>
      <p>Your Receipt will be sent via Email</p>
    </section>,
  ];

  return (
    <main className={`max-h-screen flex justify-center ${themeColors.text}`}>
      {steps[step]}
    </main>
  );
};

export default CheckoutPage;
