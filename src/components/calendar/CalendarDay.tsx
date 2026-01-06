import { useMemo } from "react";
import { format } from "date-fns";
import CalendarEvent from "./CalendarEvent";
import type { Event } from "../../types/Event";
import { useTheme } from "../../context/ThemeContext";
import { useBooking } from "../../context/BookingContext";

interface CalendarDayProps {
  day: Date;
  events: Event[];
  isCurrentMonth: boolean;
  onEventClick: (event: Event) => void;
  onDateClick: () => void; // added prop
}

const CalendarDay: React.FC<CalendarDayProps> = ({
  day,
  events,
  isCurrentMonth,
  onEventClick,
  onDateClick, // added prop
}) => {
  const { themeColors } = useTheme();
  const {purchasedLessons} = useBooking()

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const dayDate = new Date(day);
  dayDate.setHours(0, 0, 0, 0);

  const isPastDate = dayDate < today;

  const visibleEvents = useMemo(() => {
    const now = new Date();
    
    return events.filter((ev) => {
      const eventDateTime = new Date(`${ev.date}T${ev.time}`);
      return (eventDateTime > now && !purchasedLessons.includes(String(ev.id)));
    });
  }, [events, purchasedLessons]);
    // !purchasedLessons.includes(String(ev.id)));
  // }, [events, purchasedLessons]);

  return (
    <div 
      // onClick={() => {
      //   if (events.length > 0) onEventClick(events[0]);
      // }}
      // className={`h-28 p-1 border dark:border-gray-700 text-left relative overflow-hidden 
      // ${isCurrentMonth ? "bg-white dark:bg-gray-800" : "bg-gray-100 dark:bg-gray-700 text-gray-400"}`}

      // className={`h-28 p-2 border ${themeColors.border}
      // ${isCurrentMonth ? themeColors.surface : themeColors.elevated}`}
      // onClick={onDateClick}
     data-testid="calendar-day"
      onClick={!isPastDate ? onDateClick : undefined} // only allow click for non-past dates
      className={`h-28 p-2 border ${themeColors.border}
      ${isCurrentMonth ? themeColors.surface : themeColors.elevated}
      ${isPastDate ? "cursor-not-allowed opacity-50" : "cursor-pointer"}
      `}
    >
      {/* <div className="text-xs font-semibold">{format(day, "d")}</div> */}
      <div
        className={`text-xs font-semibold ${
          isCurrentMonth ? themeColors.text : themeColors.textMuted
        }`}
      >
        {format(day, "d")}
      </div>


      <div className="mt-1 space-y-1 overflow-hidden">
        {visibleEvents.map((ev) => (
          <CalendarEvent 
            key={ev.id} 
            event={ev} 
            // onClick={onEventClick} 
            onClick={(e) => {
              e.stopPropagation(); // Prevent date click
              onEventClick(ev);
            }}/>
        ))}
      </div>
    </div>
  );
};

export default CalendarDay;
