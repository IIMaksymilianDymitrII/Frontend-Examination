import EventList from "../calendar/EventList";
import EventModal from "../calendar/EventModal";
import type { Event } from "../../types/Event";
import { useBooking } from "../../context/BookingContext";
import { mapEventToLesson } from "../../utils/mapEventToLesson";

interface Props {
  events: Event[];
  selectedDate?: string;
  selectedEvent: Event | null;
  setSelectedEvent: (e: Event | null) => void;
}

const ScheduleEventSection: React.FC<Props> = ({
  events,
  selectedDate,
  selectedEvent,
  setSelectedEvent,
}) => {
  const { addToCart } = useBooking();

  return (
    <>
      <EventList
        events={events}
        selectedDate={selectedDate}
        onEventClick={setSelectedEvent}
        addToCart={(ev) => addToCart(mapEventToLesson(ev))}
      />
      <EventModal
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
      />
    </>
  );
};

export default ScheduleEventSection;
