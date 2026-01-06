import React from "react";
import { useTheme } from "../../context/ThemeContext";

interface Props {
  value: string;
  onChange: (v: string) => void;
}

const ScheduleSearch: React.FC<Props> = ({ value, onChange }) => {
  const { themeColors } = useTheme();
  return(
  <input
    type="text"
    placeholder="Search by class or instructor..."
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className={`w-full p-2 mb-4 rounded border ${themeColors.border} ${themeColors.surface} ${themeColors.text}`}

  />);
};

export default ScheduleSearch;

