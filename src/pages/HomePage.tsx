import { useBooking } from "../context/BookingContext";
import { useTheme } from "../context/ThemeContext";
import WeatherForcast from "../components/PageHome/WeatherForcast";
import DrivingQuote from "../components/PageHome/DrivingQuote";
import UpdatesNRoles from "../components/PageHome/UpdatesNRoles";
import NextLesson from "../components/PageHome/NextLesson";
import UpcommingEvent from "../components/PageHome/UpcommingEvent";
import NextAvailableLesson from "../components/PageHome/NextAvailableLesson";

const HomePage: React.FC = () => {
  const { todayLessons, nextAvailableThisWeek } = useBooking();
  const { themeColors } = useTheme();
  return (
    <main className={`min-h-screen ${themeColors.bg}`}>
      <div className={`max-w-5xl mx-auto px-4 py-6 space-y-6`}>

        <section className={`grid md:grid-cols-3 gap-6 
          animate-[slideIn_0.3s_ease-out] ${themeColors.text}`}>
          <DrivingQuote />
          <WeatherForcast />
        </section>
        <UpdatesNRoles />
        <section className={`grid md:grid-cols-3 gap-6 animate-[slideIn_0.3s_ease-out] ${themeColors.text}`}>
          <NextLesson todayLessons={todayLessons || []} />
          <UpcommingEvent  />
          <NextAvailableLesson nextAvailableThisWeek={nextAvailableThisWeek} />
        </section>
      </div>
    </main>
  );
};

export default HomePage;
