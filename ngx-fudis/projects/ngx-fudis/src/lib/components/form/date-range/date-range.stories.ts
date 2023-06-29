import { Component, Signal, importProvidersFrom } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormControl, Validators } from '@angular/forms';
import { StoryFn, Meta, applicationConfig, moduleMetadata } from '@storybook/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BehaviorSubject } from 'rxjs';
import { DateRangeComponent } from './date-range.component';
import { FudisTranslationConfig } from '../../../types/forms';
import { FudisTranslationConfigService } from '../../../utilities/config.service';

@Component({
	selector: 'example-language-change-component',
	template: `<fudis-button [label]="_label" (handleClick)="changeLanguage()"></fudis-button>`,
})
class LanguageChangeComponent {
	_label = 'Change language';

	_config: Signal<FudisTranslationConfig>;

	requiredText = new BehaviorSubject<string>('Required');

	closeLabel = new BehaviorSubject<string>('Close calendar');

	constructor(private _configService: FudisTranslationConfigService) {
		this._config = this._configService.getConfig();

		this._configService.setConfig({
			appLanguage: 'en',
			requiredText: this.requiredText,
			datepicker: { closeLabel: this.closeLabel },
		});
	}

	changeLanguage(): void {
		if (this._config().appLanguage === 'en') {
			this._label = 'Vaihda kieli';
			this.requiredText.next('Pakollinen');
			this.closeLabel.next('Sulje kalenteri');

			this._configService.setConfig({
				appLanguage: 'fi',
			});
		} else {
			this._label = 'Change language';
			this.requiredText.next('Required');
			this.closeLabel.next('Close calendar');
			this._configService.setConfig({
				appLanguage: 'en',
			});
		}
	}
}

export default {
	title: 'Components/Form/Date Range',
	component: DateRangeComponent,
	decorators: [
		moduleMetadata({
			declarations: [LanguageChangeComponent],
			imports: [ReactiveFormsModule, FormsModule],
		}),
		applicationConfig({
			providers: [importProvidersFrom(BrowserAnimationsModule)],
		}),
	],
	argTypes: {},
} as Meta;

const html = String.raw;

const Template: StoryFn<DateRangeComponent> = () => ({
	props: {
		firstControlStartDate: new FormControl<Date | null>(null, Validators.required),
		firstControlEndDate: new FormControl<Date | null>(null, Validators.required),
		secondControlStartDate: new FormControl<Date | null>(null, Validators.required),
		secondControlEndDate: new FormControl<Date | null>(null, Validators.required),
		minDate: new Date('2023-05-01'),
		maxDate: new Date('2023-05-31'),
		groupErrorMsg: {
			startDate: {
				required: 'Start date is required',
				matDatepickerParse: 'Start date is not a proper date',
			},
			endDate: {
				required: 'End date is required',
				matDatepickerParse: 'End date is not a proper date',
			},
		},
	},
	template: html`
		<example-language-change-component />
		<fudis-date-range
			[groupErrorMsg]="groupErrorMsg"
			[controlStartDate]="firstControlStartDate"
			[controlEndDate]="firstControlEndDate"
			[label]="'Date range selection'"
			[helpText]="'Some help text here'" />
		<fudis-date-range
			[minDate]="minDate"
			[maxDate]="maxDate"
			[groupErrorMsg]="groupErrorMsg"
			[controlStartDate]="secondControlStartDate"
			[controlEndDate]="secondControlEndDate"
			[label]="'Date range selection'"
			[helpText]="'Some help text here'" />
	`,
});

export const DateRange = Template.bind({});
