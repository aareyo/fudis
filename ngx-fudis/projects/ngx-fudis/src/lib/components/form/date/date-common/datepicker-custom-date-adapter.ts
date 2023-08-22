/* eslint-disable class-methods-use-this */
import { Injectable } from '@angular/core';
import { NativeDateAdapter } from '@angular/material/core';
import { FudisDateInputFormat } from '../../../../types/forms';

@Injectable()
export class DatepickerCustomDateAdapter extends NativeDateAdapter {
	/**
	 * Original file:
	 * https://github.com/angular/components/blob/main/src/material/core/datetime/native-date-adapter.ts
	 */

	override parse(value: any): Date | null {
		// Split input value by non number values. E. g. 25/5/1977 or 25.5.1977 --> [25,5,1977]
		const valueAsArray = value.split(/[^\d+]+/).filter(Number);

		// Parse input and return new Date(YYYY-MM-DD)
		if (valueAsArray.length === 3) {
			return new Date(`${valueAsArray[2]}-${valueAsArray[1]}-${valueAsArray[0]}`);
		}

		// If no year is provided, assume it is current year
		if (valueAsArray.length === 2) {
			const currentYear = new Date().getFullYear();
			return new Date(`${valueAsArray[1]}-${valueAsArray[0]}-${currentYear}`);
		}

		if (typeof valueAsArray[0] === 'number') {
			return new Date(valueAsArray[0]);
		}

		return null;
	}

	override format(date: Date, displayFormat: Object): string {
		if (!this.isValid(date)) {
			throw Error('NativeDateAdapter: Cannot format invalid date.');
		}

		const dtf = new Intl.DateTimeFormat(this.selectLanguage(displayFormat), { ...displayFormat, timeZone: 'utc' });

		return this._formatInputToDate(dtf, date);
	}

	/**
	 * Change the calendar starting day of the week from default 0 (Sunday) to 1 (Monday)
	 */
	override getFirstDayOfWeek(): number {
		return 1;
	}

	/**
	 * Determines from displayFormat value if the Date value
	 * is coming from the input field or from the date picker calendar.
	 * This ensures, that visible input value is always in Finnish DD.MM.YYYY format,
	 * but calendar uses HTML lang in other context.
	 */
	selectLanguage(displayFormat: Object): string {
		if (Object.prototype.valueOf.call(displayFormat) === FudisDateInputFormat) {
			return 'fi-FI';
		}
		return this.locale;
	}

	private _formatInputToDate(dtf: Intl.DateTimeFormat, date: Date) {
		// Passing the year to the constructor causes year numbers <100 to be converted to 19xx.
		// To work around this we use `setUTCFullYear` and `setUTCHours` instead.
		const d = new Date();
		d.setUTCFullYear(date.getFullYear(), date.getMonth(), date.getDate());
		d.setUTCHours(date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds());

		return dtf.format(d);
	}
}
