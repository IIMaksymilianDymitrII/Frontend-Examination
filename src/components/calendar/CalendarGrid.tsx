import { useTheme } from "../../context/ThemeContext";
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isSameMonth,
  format,
} from "date-fns";
import CalendarDay from "./CalendarDay";
import type { Event } from "../../types/Event";

// interface CalendarGridProps {
//   currentDate: Date;
//   events: Event[];
//   setSelectedEvent: (event: Event) => void;
// }

//updated interface

interface CalendarGridProps {
  currentDate: Date;
  events: Event[];
  setSelectedEvent: (event: Event | null) => void;
  setSelectedDate: (date: string | null) => void;
}

const CalendarGrid: React.FC<CalendarGridProps> = ({
  currentDate,
  events,
  setSelectedEvent,
  setSelectedDate, // added prop
}) => {
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const firstDay = startOfWeek(monthStart, { weekStartsOn: 1 });
  const lastDay = endOfWeek(monthEnd, { weekStartsOn: 1 });

  const days: Date[] = []; // explicitly type as Date[]
  let day = firstDay;

  while (day <= lastDay) {
    days.push(day);
    day = addDays(day, 1);
  }

  const { themeColors } = useTheme();

  return (
    <div className={`rounded-xl border ${themeColors.border} ${themeColors.surface} overflow-hidden`} data-testid="calendar-grid">

      {/* Month Title */}
      {/* <div className="bg-blue-600 text-white py-3 text-center font-semibold text-lg"> */}
      <div
        className="
          py-3 text-center font-semibold text-lg
          bg-blue-600 text-white
          dark:bg-slate-800 dark:text-slate-100
        "
      >
        {format(monthStart, "MMMM yyyy")}
      </div>

      {/* Weekday headers */}
      {/* <div className="grid grid-cols-7 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200"> */}
      <div
        className="
          grid grid-cols-7
          bg-gray-100 text-gray-800
          dark:bg-slate-900 dark:text-slate-200
          border-b border-gray-200 dark:border-slate-700
        "
      >
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
          <div key={d} className="py-2 font-semibold text-sm text-center">
            {d}
          </div>
        ))}
      </div>

      {/* Days grid */}
      <div className="grid grid-cols-7">
        {/* {days.map((d, i) => (
          <CalendarDay
            key={i}
            day={d}
            events={events.filter((ev) => ev.date === format(d, "yyyy-MM-dd"))}
            isCurrentMonth={isSameMonth(d, monthStart)}
            onEventClick={setSelectedEvent}
          />
        ))} */}

        {/* Updated to pass setSelectedDate */}
        {days.map((d, i) => {
          const dateString = format(d, "yyyy-MM-dd");
          const dayEvents = events.filter((ev) => ev.date === dateString);

          return (
            <CalendarDay
              key={i}
              day={d}
              events={dayEvents}
              isCurrentMonth={isSameMonth(d, monthStart)}
              onEventClick={(ev) => setSelectedEvent(ev)}
              onDateClick={() => setSelectedDate(dateString)}
            />
          );
        })}

      </div>
    </div>
  );
};

export default CalendarGrid;
