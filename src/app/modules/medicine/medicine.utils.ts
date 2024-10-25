
import cron from 'node-cron';
import { TMedicine } from './medicine.interface';
import { io } from '../../../server';

export const scheduleMedicineAlarms = (medicine: TMedicine) => {
  const { time, days, name, userId } = medicine;
  const [hour, minute] = time.split(':').map(Number);

  // Schedule the task for each day
  days.forEach((day) => {
    const dayOfWeek = getCronDay(day);

    // Cron job: 'minute hour day-of-month month day-of-week'
    const cronTime = `${minute} ${hour} * * ${dayOfWeek}`;

    cron.schedule(cronTime, () => {
      console.log(`Scheduled alarm for ${name} at ${time} on ${day}`);
      // Emit alarm event to the frontend through Socket.IO
      io.to(userId.toString()).emit('medicine-alarm', {
        message: `It's time to take your medicine: ${name}`,
        time,
        day,
      });
    });
  });
};

// Convert day name to cron day-of-week (0 = Sunday, 6 = Saturday)
export const getCronDay = (day: string): number => {
  const daysOfWeek: { [key: string]: number } = {
    sunday: 0,
    monday: 1,
    tuesday: 2,
    wednesday: 3,
    thursday: 4,
    friday: 5,
    saturday: 6,
  };
  return daysOfWeek[day.toLowerCase()];
};

