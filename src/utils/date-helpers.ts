/* eslint-disable */
import { Price, Time } from '@/interfaces/Services';
import { nanoid } from 'nanoid';
import { ro } from 'date-fns/locale';
import format from 'date-fns/format';
import addMinutes from 'date-fns/addMinutes';
import zonedTimeToUtc from 'date-fns-tz/zonedTimeToUtc';
import endOfHour from 'date-fns/endOfHour';
import isWeekend from 'date-fns/isWeekend';
import eachDayOfInterval from 'date-fns/eachDayOfInterval';
import eachHourOfInterval from 'date-fns/eachHourOfInterval';
import isToday from 'date-fns/isToday';
import getDate from 'date-fns/getDate';
import getDay from 'date-fns/getDay';
import getHours from 'date-fns/getHours';
import getMinutes from 'date-fns/getMinutes';
import addDays from 'date-fns/addDays';
import differenceInMinutes from 'date-fns/differenceInMinutes';
import addMonths from 'date-fns/addMonths';
import getMonth from 'date-fns/getMonth';

const currentHour = getHours(new Date());

export const monthNames = ['Ian', 'Feb', 'Mar', 'Iun', 'Iul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
export const weekDayNames = ['Dum', 'Lun', 'Mar', 'Mie', 'Joi', 'Vin', 'Sam'];

export const getMonthDays = (days: any) => {
  const localDays = days;
  return localDays.map((day: any) => {
    const dayName = weekDayNames[getDay(new Date(day.date))];
    return {
      ...day,
      name: dayName,
      value: day.date.slice(-2),
      id: nanoid(),
    };
  });
};

export const getNextMonth = () => eachDayOfInterval({
  start: currentHour > 20
    ? addDays(zonedTimeToUtc(new Date(), 'Europe/Bucharest'), 1)
    : zonedTimeToUtc(new Date(), 'Europe/Bucharest'),
  end: addDays(zonedTimeToUtc(new Date(), 'Europe/Bucharest'), 30),
}).map(item => ({
  value: getDate(item),
  name: weekDayNames[getDay(item)],
  id: nanoid(),
  date: item,
}));

export const getNextHours = (prices: Price[], date: Date) => {
  const filteredPrices = prices.filter(({ weekend }) => isWeekend(date) === weekend);
  const hoursArray: Date[] = [];

  if (isToday(date) && currentHour < 22 && currentHour > 7) {
    const startDate = zonedTimeToUtc(new Date(), 'Europe/Bucharest');
    const endDate = zonedTimeToUtc(new Date().setHours(22), 'Europe/Bucharest');
    const currentHour = getHours(startDate);

    eachHourOfInterval({
      start: startDate,
      end: endDate,
    })
      .filter(item => getHours(new Date(item)) > currentHour)
      .forEach((item) => {
        hoursArray.push(item);
        if (getHours(new Date(item)) < 22) {
          hoursArray.push(addMinutes(new Date(item), 30));
        }
      });
  } else {
    const startDate = new Date(date).setHours(7);
    const endDate = new Date(date).setHours(22);
    eachHourOfInterval({
      start: startDate,
      end: endDate,
    }).forEach(function (item) {
      hoursArray.push(item);
      if (getHours(new Date(item)) < 22) {
        hoursArray.push(addMinutes(new Date(item), 30));
      }
    });
  }
  return hoursArray
    .filter((hour) => {
      const difference = differenceInMinutes(hour, new Date());
      return difference >= 60;
    })
    .map((hour) => {
      const hourInterval = filteredPrices
        .filter(({ start_time: startTime, end_time: endTime }: any) => {
          const time = getHours(new Date(hour));
          return ((time >= parseInt(startTime, 10)) && (time <= parseInt(endTime, 10)));
        })[0];
      const price = hourInterval?.price;
      return {
        date: hour,
        price,
        hour: getHours(new Date(hour)),
        minute: getMinutes(new Date(hour)),
        id: nanoid(),
      };
    });
};

export const getDifferenceInMinutes = (date: any) => differenceInMinutes(new Date(date), new Date());

export const getHour = () => getHours(new Date());

export const getHourPrice = (selectedDate: Time, prices: Price[]) => {
  const { date, time } = selectedDate;
  const filteredPrices = prices.filter(({ weekend }) => isWeekend(new Date(date)) === weekend);
  const hourInterval = filteredPrices
    .filter(
      ({ start_time: startTime, end_time: endTime }: any) => (parseInt(time, 10) >= parseInt(startTime, 10)) && (parseInt(time, 10) <= parseInt(endTime, 10)),
    )[0];
  const { price } = hourInterval;
  return parseInt(price, 10);
};

export const getZonedDate = (date: any) => format(
  zonedTimeToUtc(new Date(date), 'Europe/Bucharest'),
  'iiii, dd MMM, yyyy',
  { locale: ro },
);

export const getNextM = () => {
  const nextMonth = addMonths(
    zonedTimeToUtc(new Date(), 'Europe/Bucharest'),
    1,
  );
  return getMonth(nextMonth);
}

export const getZonedDateTime = (date: any) => format(
  zonedTimeToUtc(new Date(date), 'Europe/Bucharest'),
  'iiii, dd MMM, hh:mm',
  { locale: ro },
);
