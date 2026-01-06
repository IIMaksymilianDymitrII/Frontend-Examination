import { useState } from "react";
import type { Event } from "../types/Event";
import { format } from "date-fns";


export const useSchedule = (events: Event[]) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredEvents = events.filter((ev) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      ev.title.toLowerCase().includes(q) ||
      ev.instructor.toLowerCase().includes(q);

    const matchesDate = selectedDate ? ev.date === selectedDate : true;

    // NEW: only events in current calendar month
    const currentMonth = format(currentDate, "yyyy-MM");
    const eventMonth = ev.date.slice(0, 7); // yyyy-MM

    const matchesMonth = eventMonth === currentMonth;

    return matchesSearch && matchesDate && matchesMonth;
  });

  return {
    currentDate,
    setCurrentDate,
    selectedEvent,
    setSelectedEvent,
    selectedDate,
    setSelectedDate,
    searchQuery,
    setSearchQuery,
    filteredEvents,
  };
};
