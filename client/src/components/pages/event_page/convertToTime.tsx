//Our DB holds times stored as integers, so we need a function to convert the time integers to a DateTime type (for math)... here it is
export default function ConvertToTime(time: number): Date {
    // Convert the time to a string and pad it with leading zeros if necessary
    const timeString = time.toString().padStart(4, '0');
  
    // Extract the hours and minutes from the time string
    const hours = Number(timeString.substring(0, 2));
    const minutes = Number(timeString.substring(2, 4));
  
    // Create a new Date object with the current date and the extracted hours and minutes
    const currentDate = new Date();
    const dateTime = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate(),
      hours,
      minutes
    );
    return dateTime;
  };