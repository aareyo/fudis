import { AfterContentInit, Component, Input, OnInit, Signal, ViewEncapsulation, effect } from '@angular/core';
import {
	MatDateFormats,
	MAT_NATIVE_DATE_FORMATS,
	MAT_DATE_FORMATS,
	DateAdapter,
	MAT_DATE_LOCALE,
} from '@angular/material/core';

import { FormControl } from '@angular/forms';

import { DatepickerCustomDateAdapter, FudisDateInputFormat } from './datepicker-custom-date-adapter';
import { InputBaseDirective } from '../../../directives/form/input-base/input-base.directive';
import { checkRequiredAttributes } from '../../../utilities/form/errorsAndWarnings';
import { FudisFormConfig, FudisInputWidth } from '../../../types/forms';
import { FudisConfigService } from '../../../utilities/config.service';

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

@Component({
	selector: 'fudis-datepicker[id][label]',
	templateUrl: './datepicker.component.html',
	styleUrls: ['./datepicker.component.scss'],
	encapsulation: ViewEncapsulation.None,
	providers: [
		{
			provide: DateAdapter,
			useClass: DatepickerCustomDateAdapter,
			deps: [MAT_DATE_LOCALE],
		},
		{ provide: MAT_DATE_FORMATS, useValue: FUDIS_DATE_FORMATS },
	],
})
export class DatepickerComponent extends InputBaseDirective implements AfterContentInit, OnInit {
	constructor(private readonly _adapter: DateAdapter<Date>, private _configService: FudisConfigService) {
		super();

		this._defaultConfig = this._configService.getConfig();

		effect(() => {
			this.changeDatepickerLanguage(this._defaultConfig());

			console.log('effect');
		});
	}

	/**
	 * FormControl for the input.
	 */
	@Input({ required: true }) control: FormControl<Date | null>;

	/**
	 * Available sizes for the datepicker - defaults to medium.
	 */
	@Input() size: FudisInputWidth = 'md';

	/**
	 * Allowed range for minimun date
	 */
	@Input() minDate: Date | null;

	/**
	 * Allowed range for maximum date
	 */
	@Input() maxDate: Date | null;

	private _defaultConfig: Signal<FudisFormConfig>;

	ngOnInit(): void {
		checkRequiredAttributes(this.id, this.requiredText, this.control, undefined, this.ignoreRequiredCheck);
	}

	ngAfterContentInit(): void {
		this.changeDatepickerLanguage(this._defaultConfig());
	}

	changeDatepickerLanguage(juttu: FudisFormConfig): void {
		this._defaultConfig = this._configService.getConfig();
		console.log(juttu.language);

		this._adapter.setLocale(this.updateLocale(this._defaultConfig().language));
		console.log('changing');
	}

	updateLocale(lang: string): string {
		switch (lang) {
			case 'en':
				return 'en-GB';
			case 'fi':
				return 'fi-FI';
			case 'sv':
				return 'sv-SE';
			default:
				return 'en-GB';
		}
	}
}
