import type { Event } from "../types/Event";

// Sample scheduled events data
const scheduleEvents: Event[] = [
    { id: 1, date: "2025-12-03", time: "10:00", title: "City Traffic", instructor: "Anna", location: "Stockholm City", price: 1200, duration: 60 },
    { id: 2, date: "2025-12-03", time: "10:00", title: "City Traffic", instructor: "Niklas", location: "Stockholm City", price: 1200, duration: 60 },
    { id: 3, date: "2025-12-03", time: "14:00", title: "Mock Test", instructor: "Jonas", location: "Huddinge", price: 1000, duration: 60 },
    { id: 4, date: "2025-12-03", time: "14:00", title: "Mock Test", instructor: "Sam", location: "Huddinge", price: 1000, duration: 60 },
    { id: 5, date: "2025-12-05", time: "16:00", title: "Highway Practice", instructor: "Sara", location: "E4 Stockholm", price: 600, duration: 90 },
    { id: 6, date: "2025-12-05", time: "16:00", title: "Country Road", instructor: "Josefin", location: "E4 Oslo", price: 800, duration: 90 },
    { id: 7, date: "2025-12-07", time: "09:00", title: "Parking Training", instructor: "Anna", location: "Veddesta", price: 700, duration : 45 },
    { id: 8, date: "2025-12-07", time: "09:00", title: "Parking Training", instructor: "Niklas", location: "Jakobsberg", price : 700, duration : 45 },
    { id: 9, date: "2025-12-09", time: "13:00", title: "Mock Test", instructor: "Jonas", location: "Järfälla", price: 1000, duration: 60 },
    { id: 10, date: "2025-12-09", time: "13:00", title: "Mock Test", instructor: "Sam", location: "Upplands Väsby", price: 1000, duration: 60 },
    { id: 11, date: "2025-12-12", time: "12:00", title: "City Traffic", instructor: "Sara", location: "Södermalm", price: 1200, duration: 60 },
    { id: 12, date: "2025-12-14", time: "11:00", title: "Driving Lesson", instructor: "Anna", location: "Kista", price: 1500, duration: 60 },
    { id: 13, date: "2025-12-16", time: "11:00", title: "Driving Lesson", instructor: "Anna", location: "Kista", price: 1500, duration: 60 },
    { id: 14, date: "2025-12-18", time: "15:00", title: "Driving Lesson", instructor: "Jonas", location: "Sollentuna", price: 1500, duration : 60 },
    { id: 15, date: "2025-12-20", time: "10:00", title: "Motorway Lesson", instructor: "Anna", location : "E18" , price : 900 , duration : 90 },
    { id: 16, date: "2025-12-22", time: "16:00", title: "Night Driving", instructor: "Sara", location: "Järfälla", price: 1200, duration: 60 },
    { id: 17, date: "2025-12-25", time: "09:00", title: "Driving Lesson", instructor: "Anna", location: "Flemingsberg", price: 1500, duration: 60 },
    { id: 18, date: "2025-12-26", time: "18:00", title: "Driving Lesson", instructor: "Anna", location: "Flemingsberg", price: 1500, duration: 60 },
    { id: 19, date: "2025-12-26", time: "19:00", title: "Driving Lesson", instructor: "Anna", location: "Flemingsberg", price: 1500, duration: 45 },
    { id: 20, date: "2025-12-27", time: "15:00", title: "Parallel Parking", instructor: "Jonas", location: "Sundbyberg", price: 800, duration: 45 },
    { id: 21, date: "2025-12-27", time: "18:00", title: "All Parking", instructor: "Jonas", location: "Sundbyberg", price: 800, duration: 45 },
    { id: 22, date: "2025-12-29", time: "14:00", title: "Mock Test", instructor: "Sara", location: "Bromma", price: 1000, duration: 60 },
    { id: 23, date: "2025-12-29", time: "16:00", title: "Mock Test", instructor: "Sara", location: "Bromma", price: 1000, duration : 60 },

        // ===== JANUARY 2026 =====

    // Week 1
    { id: 24, date: "2026-01-05", time: "10:00", title: "Driving Lesson", instructor: "Anna", location: "Kista", price: 1500, duration: 60 },
    { id: 25, date: "2026-01-06", time: "14:00", title: "City Traffic", instructor: "Sara", location: "Södermalm", price: 1200, duration: 60 },
    { id: 26, date: "2026-01-07", time: "09:00", title: "Driving Lesson", instructor: "Jonas", location: "Sollentuna", price: 1500, duration: 60 },
    { id: 27, date: "2026-01-08", time: "13:00", title: "Mock Test", instructor: "Anna", location: "Järfälla", price: 1000, duration: 60 },
    { id: 28, date: "2026-01-09", time: "15:00", title: "Mock Test", instructor: "Sara", location: "Bromma", price: 1000, duration: 60 },

    // Week 2
    { id: 29, date: "2026-01-12", time: "10:00", title: "Highway Practice", instructor: "Sara", location: "E4 Stockholm", price: 900, duration: 90 },
    { id: 30, date: "2026-01-13", time: "14:00", title: "Driving Lesson", instructor: "Anna", location: "Kista", price: 1500, duration: 60 },
    { id: 31, date: "2026-01-14", time: "09:00", title: "Driving Lesson", instructor: "Jonas", location: "Solna", price: 1500, duration: 60 },
    { id: 32, date: "2026-01-15", time: "13:00", title: "Mock Test", instructor: "Jonas", location: "Upplands Väsby", price: 1000, duration: 60 },
    { id: 33, date: "2026-01-16", time: "15:00", title: "Mock Test", instructor: "Anna", location: "Kista", price: 1000, duration: 60 },

    // Week 3
    { id: 34, date: "2026-01-19", time: "10:00", title: "City Traffic", instructor: "Sara", location: "Södermalm", price: 1200, duration: 60 },
    { id: 35, date: "2026-01-20", time: "14:00", title: "Driving Lesson", instructor: "Anna", location: "Flemingsberg", price: 1500, duration: 60 },
    { id: 36, date: "2026-01-21", time: "09:00", title: "Driving Lesson", instructor: "Jonas", location: "Sollentuna", price: 1500, duration: 60 },
    { id: 37, date: "2026-01-22", time: "13:00", title: "Mock Test", instructor: "Sara", location: "Bromma", price: 1000, duration: 60 },
    { id: 38, date: "2026-01-23", time: "15:00", title: "Mock Test", instructor: "Jonas", location: "Järfälla", price: 1000, duration: 60 },

    // Week 4
    { id: 39, date: "2026-01-26", time: "10:00", title: "Highway Practice", instructor: "Anna", location: "E18", price: 900, duration: 90 },
    { id: 40, date: "2026-01-27", time: "14:00", title: "Driving Lesson", instructor: "Sara", location: "Solna", price: 1500, duration: 60 },
    { id: 41, date: "2026-01-28", time: "09:00", title: "Driving Lesson", instructor: "Jonas", location: "Sollentuna", price: 1500, duration: 60 },
    { id: 42, date: "2026-01-29", time: "13:00", title: "Mock Test", instructor: "Anna", location: "Kista", price: 1000, duration: 60 },
    { id: 43, date: "2026-01-30", time: "15:00", title: "Mock Test", instructor: "Sara", location: "Bromma", price: 1000, duration: 60 },

  ];

  export default scheduleEvents;