import CalendarHeader from "../calendar/CalendarHeader";
import CalendarGrid from "../calendar/CalendarGrid";
import type { Event } from "../../types/Event";

interface Props {
  currentDate: Date;
  setCurrentDate: (d: Date) => void;
  events: Event[];
  setSelectedEvent: (e: Event | null) => void;
  setSelectedDate: (d: string | null) => void;
}

const ScheduleCalendar: React.FC<Props> = ({
  currentDate,
  setCurrentDate,
  events,
  setSelectedEvent,
  setSelectedDate,
}) => (
  <>
    <CalendarHeader
      currentDate={currentDate}
      setCurrentDate={setCurrentDate}
    />
    <CalendarGrid
      currentDate={currentDate}
      events={events}
      setSelectedEvent={setSelectedEvent}
      setSelectedDate={setSelectedDate}
    />
  </>
);

export default ScheduleCalendar;
