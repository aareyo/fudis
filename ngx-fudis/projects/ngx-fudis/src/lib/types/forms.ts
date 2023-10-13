import { FormControl } from '@angular/forms';
import { MatDateFormats, MAT_NATIVE_DATE_FORMATS } from '@angular/material/core';
import { FudisLanguageAbbr } from './miscellaneous';

export type FudisInputSize = 'sm' | 'md' | 'lg';

export interface FudisCheckboxOption {
	/** Unique id for single checkbox option */
	id?: string;
	/** Name for the group of checkboxes */
	groupName?: string;
	/** Underlying value of the option */
	controlName: string;
	/** Value that is shown in the UI */
	label: string;
	/** Is option selected */
	value?: boolean | null | undefined;
}

export interface FudisRadioButtonOption {
	/** Unique id for single radio button option */
	id: string;
	/** Name for the group of radio buttons */
	name: string;
	/** Underlying value of the option */
	value: string | boolean | null;
	/** Value that is shown in the UI */
	viewValue: string;
	/** Is option selected */
	checked?: boolean;
}

export type FudisFormErrors = {
	required?: string;
	minlength?: string;
	maxlength?: string;
	min?: string;
	max?: string;
	email?: string;
	pattern?: string;
	matDatepickerMin?: string;
	matDatepickerMax?: string;
	matDatepickerParse?: string;
	[key: string]: string | undefined;
};

export type FudisFormGroupErrors = {
	atLeastOneRequired?: string;
	[key: string]: FudisFormErrors | any;
};

export interface FudisDropdownOption {
	/** Underlying value of the option */
	value: any;
	/** Value that is shown in the UI */
	viewValue: string;
	/** Is option disabled in the dropdown */
	disabled?: boolean;
	/** To store additional data */
	[key: string]: any;
}

export type FudisFormErrorSummaryItem = {
	id: string;
	label: string;
	error: string;
	type: string;
	controlName: string | undefined;
	language: FudisLanguageAbbr;
};

export type FudisFormErrorSummaryObject = {
	[id: string]: {
		id: string;
		errors: FudisFormErrorSummaryObjectItemErrors;
		label: string;
		language: FudisLanguageAbbr;
	};
};

export type FudisFormErrorSummarySection = {
	id: string;
	title: string;
};

export type FudisErrorSummaryParent = {
	formId: string | null | undefined;
	parentElement: HTMLFormElement;
};

export type FudisFormErrorSummaryList = {
	id: string;
	message: string;
};

export type FudisFormErrorSummaryObjectItemErrors = {
	[errorType: string]: string;
};

export type FudisDropdownLanguageOption =
	| { value: 'finnish'; viewValue: 'FI' }
	| { value: 'swedish'; viewValue: 'SV' }
	| { value: 'english'; viewValue: 'EN' }
	| { value: FudisLanguageAbbr; viewValue: string };

export interface FudisInputWithLanguageOptionsFormGroup {
	[language: string]: FormControl<string | null>;
}

export type FudisCheckboxControl = FormControl<boolean | null | undefined>;
export interface FudisCheckboxGroupFormGroup {
	[key: string]: FormControl<boolean | null | undefined>;
}

export interface FudisDateRangeItem {
	control: FormControl<Date | null>;
	label: string;
	helpText?: string;
	errorMsg?: FudisFormErrors;
	minDate?: Date | null;
	maxDate?: Date | null;
	tooltip?: string;
}

export const FudisDateInputFormat = {
	dateInput: 'DD.MM.YYYY',
	monthYearLabel: 'MMM YYYY',
};

export const FUDIS_DATE_FORMATS: MatDateFormats = {
	...MAT_NATIVE_DATE_FORMATS,
	parse: {
		dateInput: 'DD.MM.YYYY',
	},
	display: {
		...MAT_NATIVE_DATE_FORMATS.display,
		dateInput: FudisDateInputFormat as Intl.DateTimeFormatOptions,
	},
};

export type FudisFormErrorSummaryLink = 'router' | 'href';
