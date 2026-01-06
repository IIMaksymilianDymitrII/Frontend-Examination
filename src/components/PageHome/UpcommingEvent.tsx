
import { useTheme } from "../../context/ThemeContext";

const UpcommingEvent = () => {
  const { themeColors } = useTheme();
  return (
          <div className={` ${themeColors.bgWidget} shadow-lg rounded-lg p-5 text-sm ${themeColors.text} ${themeColors.border} border`}>
            <h3 className={`text-base font-semibold mb-3 ${themeColors.text}`}>
              Upcoming Events
            </h3>
            <ul className={`space-y-2 list-disc list-inside ${themeColors.text}`}>
              <li>Mock driving test – every Saturday 10:00</li>
              <li>Christmas break: 23 Dec – 2 Jan</li>
              <li>Winter offer: 5x 2-hour lessons package</li>
            </ul>
            <p className={`text-xs mt-3 ${themeColors.text}`}>
              Talk to your instructor to plan mock tests before your real
              driving exam.
            </p>
          </div>
  )
}

export default UpcommingEvent