import type { Event } from "../../types/Event";

interface CalendarEventProps {
  // event: {
  //   id: string | number;
  //   title: string;
  //   time: string;
  //   instructor: string;
  // };

  event: Event;
  onClick: (e: React.MouseEvent) => void;
}

// const instructorColors: { [key: string]: string } = {
//   Anna: "bg-green-600",
//   Jonas: "bg-blue-600",
//   Sara: "bg-purple-600",
//   Default: "bg-gray-500",
// };

const CalendarEvent: React.FC<CalendarEventProps> = ({ event, onClick }) => {
  const instructorColor =
    event.instructor.includes("Anna") ? "bg-green-600" :
    event.instructor.includes("Jonas") ? "bg-blue-600" :
    event.instructor.includes("Sara") ? "bg-purple-600" :
    "bg-gray-500";
    
  return (
    <button
      data-testid="calendar-event"
      onClick={onClick}
      className={`${instructorColor} w-full text-left px-1 py-0.5 rounded text-white text-xs hover:opacity-90 overflow-hidden`}
    >
      {event.time} - {event.title}
    </button>
    
  );
};

export default CalendarEvent;
