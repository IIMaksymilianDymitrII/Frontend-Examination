
import { useTheme } from "../../context/ThemeContext";

const DrivingQuote = () => {
  const { themeColors } = useTheme();
  return (
          <div
          data-testid="driving-quote"
           className={`md:col-span-2 ${themeColors.bgWidget} shadow-lg rounded-lg p-6 flex flex-col justify-center ${themeColors.text} ${themeColors.border} border`}>
            <h1 className={`text-4xl font-semibold mb-3 ${themeColors.text}`}>
              Build real confidence behind the wheel
            </h1>
            <p className={`text-lg leading-relaxed ${themeColors.text}`}>
              Private driving practice is where students repeat, make mistakes
              and improve – in their own tempo. Our role is to guide you with
              structured lessons, clear feedback and realistic mock tests so
              that every kilometer you drive takes you closer to a safe and
              confident driving licence.
            </p>
            <p className={`mt-4 text-lg ${themeColors.text}`}>
              Together we plan lessons, book the right times and focus on
              exactly what you need – from basic control to complicated city
              traffic.
            </p>
          </div>
  )
}

export default DrivingQuote;