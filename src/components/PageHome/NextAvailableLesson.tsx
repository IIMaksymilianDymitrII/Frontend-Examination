import type { Lesson } from "../../context/BookingContext";
import { useTheme } from "../../context/ThemeContext";

const NextAvailableLesson = ({
  nextAvailableThisWeek,
}: {
  nextAvailableThisWeek: Lesson[];
}) => {
  const { themeColors } = useTheme();
  return (
    <div
  className={`${themeColors.bgWidget} shadow-lg rounded-lg p-5 text-sm ${themeColors.text} ${themeColors.border} border`}
>

      <h3 className={`text-base font-semibold mb-3 ${themeColors.text}`}>
        Next Available Driving Slots
      </h3>
      {nextAvailableThisWeek.length > 0 ? (
        <ul className={`space-y-2 ${themeColors.text}`}>
          {nextAvailableThisWeek.slice(0, 4).map((slot) => (
            <li
              key={slot.id}
              className={`flex justify-between ${themeColors.text}`}
            >
              <div>
                <div className={`font-semibold ${themeColors.text}`}>
                  {slot.date} – {slot.time}
                </div>
                <div className={`text-xs ${themeColors.text}`}>
                  <span>{slot.duration} min with {slot.instructor}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className={`${themeColors.text}`}>
          No free slots this week – check Classes page.
        </p>
      )}
    </div>
  );
};

export default NextAvailableLesson;
