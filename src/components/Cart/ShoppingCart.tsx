import { useBooking } from "../../context/BookingContext"
import Lesson from "./Lesson"
import CountPrice from "./CountPrice"

const ShoppingCart = () => {
  const {cart, removeFromCart} = useBooking()
  return (

      <section
        className={`max-w-5xl mx-auto grid md:grid-cols-3 gap-6 
        animate-[slideIn_0.3_ease-out] `}
      >
        <section 
          className={`md:col-span-2 max-h-[700px] overflow-y-auto [&::-webkit-scrollbar-thumb]:bg-green-300 `}>
        <ul className="grid gap-3" > 


        { cart.map((lesson) => (
          <Lesson 
          date={lesson.date} 
          time={lesson.time} 
          instructor={lesson.instructor} 
          title={lesson.title} 
          location={lesson.location} 
          duration={lesson.duration}
          id={lesson.id} 
          remove={removeFromCart} 
          price={lesson.price}/>
        ))

        }
        </ul>
        </section>
        <CountPrice/>
      </section>
  )
}

export default ShoppingCart