export interface Event {
  id: number;
  date: string; // YYYY-MM-DD
  time: string;
  title: string;
  instructor: string;
  location?: string;
  price: number;
  duration: number; // duration in minutes
  notes?: string;
}
