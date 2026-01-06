import React from "react";
import scheduleEvents from "../data/scheduleEvents";
import { useSchedule } from "../hooks/useSchedule";

import ScheduleSearch from "../components/PageSchedule/ScheduleSearch";
import ScheduleCalendar from "../components/PageSchedule/ScheduleCalendar";
import ScheduleEventSection from "../components/PageSchedule/ScheduleEventSection";

import { useTheme } from "../context/ThemeContext";

const SchedulePage: React.FC = () => {
  const { themeColors } = useTheme();

  const {
    currentDate,
    setCurrentDate,
    selectedEvent,
    setSelectedEvent,
    selectedDate,
    setSelectedDate,
    searchQuery,
    setSearchQuery,
    filteredEvents,
  } = useSchedule(scheduleEvents);

  return (
    <main className={`min-h-screen ${themeColors.bg} p-4`}>
      <div className="max-w-5xl mx-auto space-y-6">

        <ScheduleCalendar
          currentDate={currentDate}
          setCurrentDate={setCurrentDate}
          events={scheduleEvents}
          setSelectedEvent={setSelectedEvent}
          setSelectedDate={setSelectedDate}
        />

        <ScheduleSearch
          value={searchQuery}
          onChange={setSearchQuery}
        />

        <ScheduleEventSection
          events={filteredEvents}
          selectedDate={selectedDate || undefined}
          selectedEvent={selectedEvent}
          setSelectedEvent={setSelectedEvent}
        />
      </div>
    </main>
  );
};

export default SchedulePage;
