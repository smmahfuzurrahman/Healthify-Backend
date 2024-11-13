// import cron from 'node-cron';
// import moment from 'moment-timezone';
// import { TMedicine } from './medicine.interface';
// import { io } from '../../../server';

// // Set Bangladesh Time Zone
// const BD_TIMEZONE = 'Asia/Dhaka';

// export const scheduleMedicineAlarms = (medicine: TMedicine) => {
//   const { time, days, name, userId } = medicine;

//   // Convert the time to Bangladesh time zone
//   const [hour, minute] = moment.tz(time, 'HH:mm', BD_TIMEZONE).format('HH:mm').split(':').map(Number);

//   // Schedule the task for each day
//   days.forEach((day) => {
//     const dayOfWeek = getCronDay(day);

//     // Cron job: 'minute hour day-of-month month day-of-week'
//     const cronTime = `${minute} ${hour} * * ${dayOfWeek}`;

//     cron.schedule(cronTime, () => {
//       console.log(`Scheduled alarm for ${name} at ${time} on ${day} (BD Time)`);
//       // Emit alarm event to the frontend through Socket.IO
//       io.to(userId.toString()).emit('medicine-alarm', {
//         message: `It's time to take your medicine: ${name}`,
//         time,
//         day,
//       });
//     }, {
//       timezone: BD_TIMEZONE // Set the cron job to run in Bangladesh Time Zone
//     });
//   });
// };

// // Convert day name to cron day-of-week (0 = Sunday, 6 = Saturday)
// export const getCronDay = (day: string): number => {
//   const daysOfWeek: { [key: string]: number } = {
//     sunday: 0,
//     monday: 1,
//     tuesday: 2,
//     wednesday: 3,
//     thursday: 4,
//     friday: 5,
//     saturday: 6,
//   };
//   return daysOfWeek[day.toLowerCase()];
// };

import cron from 'node-cron';
import moment from 'moment-timezone';
import { TMedicine } from './medicine.interface';
import { io } from '../../../server';
import nodemailer from 'nodemailer';

// Set Bangladesh Time Zone
const BD_TIMEZONE = 'Asia/Dhaka';

// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail', // Replace with your email service
  auth: {
    user: 'smmahfuz787@gmail.com', // Replace with your email
    pass: 'qqrt eggi avpq sqzb', // Replace with your email password or an app-specific password
  },
});

export const scheduleMedicineAlarms = (medicine: TMedicine, email: string) => {
  const { time, days, name, userId} = medicine; // Assuming email is a field in TMedicine

  // Convert the time to Bangladesh time zone
  const [hour, minute] = moment.tz(time, 'HH:mm', BD_TIMEZONE).format('HH:mm').split(':').map(Number);

  // Schedule the task for each day
  days.forEach((day) => {
    const dayOfWeek = getCronDay(day);

    // Cron job: 'minute hour day-of-month month day-of-week'
    const cronTime = `${minute} ${hour} * * ${dayOfWeek}`;

    cron.schedule(cronTime, () => {
      const message = `It's time to take your medicine: ${name}`;
      console.log(`Scheduled alarm for ${name} at ${time} on ${day} (BD Time)`);
      
      // Emit alarm event to the frontend through Socket.IO
      io.to(userId.toString()).emit('medicine-alarm', {
        message,
        time,
        day,
      });

      // Send email notification
      if (email) {
        const mailOptions = {
          from: 'smmahfuz787@gmail.com', // Replace with your email
          to: email,
          subject: `Please Take Your Medication Now ${name}`,
          text: message, // Fallback for email clients that do not support HTML
          html: `
            <div style="font-family: Arial, sans-serif; color: #333;">
              <h2 style="color: #4CAF50; text-align: center;">⏰ Medicine Reminder</h2>
              <p>Dear user,</p>
              <p>This is a friendly reminder that it's time to take your medication:</p>
      
              <div style="background-color: #f9f9f9; padding: 15px; border: 1px solid #ddd; border-radius: 5px; margin: 20px 0;">
                <p style="font-size: 18px; margin: 0;"><strong>Medicine:</strong> ${name}</p>
                <p style="font-size: 18px; margin: 0;"><strong>Time:</strong> ${time}</p>
                <p style="font-size: 18px; margin: 0;"><strong>Day:</strong> ${day}</p>
              </div>
      
              <p>Please ensure to take your medication on time to stay healthy.</p>
      
              <p style="margin-top: 30px; font-size: 14px; color: #888;">
                If you have any questions, please contact us at <a href="mailto:support@example.com">support@example.com</a>.
              </p>
              <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
              <p style="font-size: 12px; color: #888; text-align: center;">
                © ${new Date().getFullYear()} Medicine Reminder App. All rights reserved.
              </p>
            </div>
          `,
        };
      
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            return console.error(`Failed to send email to ${email}:`, error);
          }
          console.log(`Email sent to ${email}:`, info.response);
        });
      }
      
    }, {
      timezone: BD_TIMEZONE // Set the cron job to run in Bangladesh Time Zone
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
