import exp from "constants";
import { createDateWithoutTime, getDateString, getFirstDayOfCurrentMonth, getFirstDayOfMonth } from "../dates";

describe('getFirstDayOfMonth', () => {
    test('should return the first day of the given month', () => {
      const date = new Date('2022-03-15');
      const firstDay = getFirstDayOfMonth(date);
      expect(getDateString(firstDay)).toEqual('2022-03-01');
    });
  });
  
  describe('getFirstDayOfCurrentMonth', () => {
    test('should return the first day of the current month', () => {
      const firstDay = getFirstDayOfCurrentMonth();
      const currentDate = new Date();
      const expectedFirstDay =  new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
      expect(firstDay).toEqual(createDateWithoutTime(expectedFirstDay));
    });
  });