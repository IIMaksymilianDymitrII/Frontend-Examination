import { format, addMonths, subMonths } from "date-fns";
import { useTheme } from "../../context/ThemeContext";

interface CalendarHeaderProps {
  currentDate: Date;
  setCurrentDate: (date: Date) => void;
  darkMode?: boolean;
  toggleDarkMode?: () => void;
}

const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  currentDate,
  setCurrentDate,
  darkMode,
  toggleDarkMode,
}) => {
  const { themeColors } = useTheme();

  return (
    <div className="flex items-center justify-between mb-4">
      {/* Prev / Next Buttons */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setCurrentDate(subMonths(currentDate, 1))}
          className={`px-3 py-1 rounded border ${themeColors.border} ${themeColors.elevated} ${themeColors.text} hover:${themeColors.bgHover}`}

        >
          ← Prev
        </button>

        {/* <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100"> */}
        <h2 className={`text-xl font-semibold ${themeColors.text}`} data-testid="calendar-month">
          {format(currentDate, "MMMM yyyy")}
        </h2>

        <button
          onClick={() => setCurrentDate(addMonths(currentDate, 1))}
          className={`px-3 py-1 rounded border ${themeColors.border} ${themeColors.elevated} ${themeColors.text} hover:${themeColors.bgHover}`}
          data-testid="calendar-next"
        >
          Next →
        </button>
      </div>

      {/* Optional dark mode toggle */}
      {toggleDarkMode && (
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
        >
          {darkMode ? "☀️" : "🌙"}
        </button>
      )}
    </div>
  );
};

export default CalendarHeader;
