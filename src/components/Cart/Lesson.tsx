import { useTheme } from "../../context/ThemeContext";

interface LessonProps {
  id: string;
  title: string;
  date: string;
  time: string;
  instructor: string;
  location?: string;
  duration: number;
  price: number;
  remove: (id: string) => void;
}

const Lesson = ({
  id,
  title,
  date,
  time,
  instructor,
  location,
  duration,
  price,
  remove,
}: LessonProps) => {
  const { themeColors } = useTheme();
  return (
    <li
      data-testid="cart-item"
      className={`flex justify-between w-full ${themeColors.bgWidget} shadow-lg border ${themeColors.border} 
        rounded-lg p-5 `}
    >
      <div>
        <h2 className="text-xl font-semibold pb-2 ">{title}</h2>
        <div className={`${themeColors.textMuted}`}>
          <p>Instructor: {instructor}</p>
          <p>Location: {location}</p>
          <p>Date: {date}</p>
          <p>Time: {time} </p>
          <p>Duration: {duration} minutes</p>
        </div>
      </div>
      <div className="grid grid-row-2 content-between ">
        <p className="font-semibold text-lg">{price} kr</p>
        <button onClick={() => remove(id)} className={`hover:text-gray-400`}>
          Remove
        </button>
      </div>
    </li>
  );
};

export default Lesson;
