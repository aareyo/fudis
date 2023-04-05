import { Component } from '@angular/core';
import { FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
	selector: 'app-root',
	template: `
		<!--The content below is only a placeholder and can be replaced.-->
		<fudis-heading tag="h1" size="xl">Welcome to Fudis sandbox </fudis-heading>

		<form class="basic-flex-box">
			<fudis-datepicker
				[control]="datePickerControl"
				[id]="'unique-datepicker-id-1'"
				requiredText="Required"
				[errorMsg]="{ required: 'Selected date is missing.' }"
				label="Select a date"
				helpText="Please select your favourite date."></fudis-datepicker>
			<fudis-heading tag="h2" size="l">Text area and button</fudis-heading>
			<fudis-text-area
				[control]="textAreaControl"
				id="unique-text-area-id-1"
				label="Pakollinen textarea, tällä on myös aika pitkä label"
				[maxLength]="20"
				helpText="Voit kirjoittaa tähän monia kivoja juttuja, mutta max 20 kirjainta">
			</fudis-text-area>
			<fudis-grid columns="1fr 1fr">
				<fudis-button data-theme="sisu" type="submit" label="Lähetä"></fudis-button>
				<fudis-button data-theme="sisu" label="Eiku" variant="secondary"></fudis-button>
				<fudis-button icon="delete" data-theme="sisu" label="Poista" variant="tertiary"> </fudis-button>
				<fudis-button icon="delete" data-theme="sisu" label="Poista" [disabled]="true"> </fudis-button>
			</fudis-grid>
		</form>
		<fudis-notification variant="danger" ariaVariantText="Varoitus!">Whoops! Some error happened.</fudis-notification>
		<fudis-expandable title="Title for expandable">
			<ng-template fudisExpandableHeaderButtons>
				<fudis-button data-theme="sisu" type="submit" label="Lähetä"></fudis-button>
				<fudis-button data-theme="sisu" label="Eiku" variant="secondary"></fudis-button>
			</ng-template>
			<ng-template fudisExpandableContent>
				<fudis-heading tag="h3" size="m">This is heading inside an expandable</fudis-heading>
				<fudis-body-text>This is body text inside an expandable</fudis-body-text>
			</ng-template>
		</fudis-expandable>
		<fudis-heading tag="h3" fudisTooltip tooltip="This is a tooltip on a heading!" [tooltipPosition]="'below'">
			<fudis-link data-theme="sisu" href="#" linkTitle="Link inside a heading"></fudis-link>
		</fudis-heading>
		<fudis-body-text>
			Fudis icon with a toggling tooltip
			<fudis-icon
				icon="info-circle-fill"
				tooltip="Tooltip on a icon!"
				[tooltipToggle]="true"
				[tooltipPosition]="'right'"></fudis-icon>
		</fudis-body-text>
	`,
	styleUrls: ['./app.scss'],
})
export class AppComponent {
	title = 'dev';

	validatorsForDatepicker = [Validators.required];

	textAreaControl: FormControl = new FormControl('');

	datePickerControl: FormControl = new FormControl('', this.validatorsForDatepicker);

	constructor(private formBuilder: FormBuilder) {}
}
