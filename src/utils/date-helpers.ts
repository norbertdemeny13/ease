import { nanoid } from 'nanoid';
import addMinutes from 'date-fns/addMinutes';
import zonedTimeToUtc from 'date-fns-tz/zonedTimeToUtc';
import isWeekend from 'date-fns/isWeekend';
import eachDayOfInterval from 'date-fns/eachDayOfInterval';
import eachHourOfInterval from 'date-fns/eachHourOfInterval';
import isToday from 'date-fns/isToday';
import getDate from 'date-fns/getDate';
import getDay from 'date-fns/getDay';
import getHours from 'date-fns/getHours';
import getMinutes from 'date-fns/getMinutes';
import addDays from 'date-fns/addDays';

export const monthNames = ['Ian', 'Feb', 'Mar', 'Iun', 'Iul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
export const weekDayNames = ['Dum', 'Lun', 'Mar', 'Mie', 'Joi', 'Vin', 'Sam'];

export const getNextMonth = () => eachDayOfInterval({
  start: zonedTimeToUtc(new Date(), 'Europe/Bucharest'),
  end: addDays(zonedTimeToUtc(new Date(), 'Europe/Bucharest'), 30),
}).map(item => ({
  value: getDate(item),
  name: weekDayNames[getDay(item)],
  id: nanoid(),
  date: item,
}));

export const getNextHours = (prices: any[], date: any) => {
  const filteredPrices = prices.filter(({ weekend }) => isWeekend(date) === weekend);
  const hoursArray: any[] = [];
  if (isToday(date)) {
    const startDate = zonedTimeToUtc(new Date(), 'Europe/Bucharest');
    const endDate = zonedTimeToUtc(new Date().setHours(21), 'Europe/Bucharest');
    const currentHour = getHours(startDate);
    eachHourOfInterval({
      start: startDate,
      end: endDate,
    })
      .filter(item => getHours(new Date(item)) > currentHour)
      .forEach((item, index) => {
        if (index === 0) {
          hoursArray.push(addMinutes(new Date(item), 30));
        }
        hoursArray.push(item);
        if (getHours(new Date(item)) < 21 && index !== 0) {
          hoursArray.push(addMinutes(new Date(item), 30));
        }
      });
  } else {
    const startDate = new Date(date).setHours(7);
    const endDate = new Date(date).setHours(21);
    eachHourOfInterval({
      start: startDate,
      end: endDate,
    }).forEach((item) => {
      hoursArray.push(item);
      if (getHours(new Date(item)) < 21) {
        hoursArray.push(addMinutes(new Date(item), 30));
      }
    });
  }
  return hoursArray.map((hour) => {
    const hourInterval = filteredPrices
      .filter(({ start_time: startTime, end_time: endTime }: any) => {
        const time = getHours(new Date(hour));
        return ((time >= parseInt(startTime, 10)) && (time <= parseInt(endTime, 10)));
      })[0] as any;
    const { price } = hourInterval;
    return {
      date: hour,
      price,
      hour: getHours(new Date(hour)),
      minute: getMinutes(new Date(hour)),
      id: nanoid(),
    };
  });
};

export const getHour = () => getHours(new Date());
