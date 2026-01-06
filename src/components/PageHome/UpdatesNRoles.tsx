
import { useTheme } from "../../context/ThemeContext";

const UpdatesNRoles = () => {
  const { themeColors } = useTheme();
  return (
        <section className={` ${themeColors.bgWidget} shadow rounded-lg p-6 ${themeColors.text} ${themeColors.border} border`}>
          <h2 className={`text-lg font-semibold mb-3 ${themeColors.text}`}>
            Driving Rules & Updates
          </h2>

          <ul className={`space-y-2 text-sm ${themeColors.text}`}>
            <li>
              • New rule: Use of mobile phone must be strictly hands-free while
              driving.
            </li>
            <li>• Updated speed enforcement cameras on motorways.</li>
            <li>
              • Winter tire requirement extended until April in some regions.
            </li>
          </ul>

          <h3 className={`text-lg font-semibold mt-4 mb-3 ${themeColors.text}`}>
            Updates from school administration
          </h3>
          <ul className={`space-y-2 text-green-600 text-sm ${themeColors.text}`}>
            <li>
              • Reminder: Bring your ID and driving logbook to every lesson.
            </li>
            <li>
              • Holiday schedule updated – check the Schedules page for details.
            </li>
            <li>
              • Form January, 2026, students will have 02 (two) "Mock Tests" on Saturdays. And there will be no lessons on Sundays.
            </li>
            <li>
              • Winter and student discounts are available. 
            </li>
            <li className={'space-y-2 text-orange-500 text-sm ${themeColors.text}'}>
              • STUDENT10 → 10% discount & WINTER20 → 20% discount on all packages booked before January 15, 2026. Don't forget to use these codes before Check Out.
            </li>
          </ul>

          <h3 className={`text-md font-semibold mt-4 mb-2 ${themeColors.text}`}>Important Links</h3>

          <ul className="text-blue-600 dark:text-blue-400 text-sm space-y-1">
            <li>
              <a
                href="https://transportstyrelsen.se"
                target="_blank"
                className="underline"
              >
                Apply for Handledare (supervisor) course – Transportstyrelsen
              </a>
            </li>
            <li>
              <a
                href="https://trafikverket.se"
                target="_blank"
                className="underline"
              >
                Book Driving Test (Körprov) – Trafikverket
              </a>
            </li>
            <li>
              <a
                href="https://korkortsportalen.se"
                target="_blank"
                className="underline"
              >
                Driving License Portal – Körkortsportalen
              </a>
            </li>
          </ul>
        </section>
  )
}

export default UpdatesNRoles