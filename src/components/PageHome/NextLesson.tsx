import type { Lesson } from "../../context/BookingContext"
import { useTheme } from "../../context/ThemeContext";

const NextLesson = ({ todayLessons }: { todayLessons: Lesson[] }) => {
  const { themeColors } = useTheme();

  return (
          <div
              data-testid="next-lesson"
              className={`${themeColors.bgWidget} 
              shadow-lg rounded-lg p-5 text-sm 
              ${themeColors.text} ${themeColors.border} border`}
          >

            <h3 className={`text-base font-semibold mb-3 ${themeColors.text}`}>
              Today&apos;s Next Lesson
            </h3>
            {todayLessons.length > 0 ? (
              
              <div className={`space-y-1 ${themeColors.text}`}>
                <ul className="space-y-2">
                  {todayLessons.map((lesson) => (
                    <li key={lesson.id}>
                      <p className="font-semibold">
                        {lesson.time} – {lesson.instructor}
                      </p>
                      <p className="text-xs opacity-80">
                        {lesson.duration} min • {lesson.location}
                      </p>
                    </li>
                  ))}
                </ul>
                <p className={`text-xs mt-2 ${themeColors.text}`}>
                Be ready 5–10 minutes before start and bring your ID and
                driving logbook.
                </p>
                </div>) 
            
            : (
              <p className={`${themeColors.text} opacity-60`}>No lesson booked today.</p>

            )}
          </div>
  )
}

export default NextLesson;