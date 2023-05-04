import { Component } from '@angular/core';

import { FormBuilder, FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IFudisRadioButtonOption } from 'projects/ngx-fudis/src/lib/types/forms';

import { StoryFn, Meta, moduleMetadata } from '@storybook/angular';
import { RadioButtonGroupComponent } from './radio-button-group.component';
import { RadioButtonComponent } from './radio-button/radio-button.component';
import { BodyTextComponent } from '../../typography/body-text/body-text.component';
import { ErrorMessageComponent } from '../error-message/error-message.component';

const getDefaultValue = (options: IFudisRadioButtonOption[]): string | boolean | undefined => {
	const checkedValue = options.find((item) => item.checked);
	return checkedValue?.value;
};
@Component({
	selector: 'example-radio-button-group',
	template: `
		<form [formGroup]="mainFormGroup">
			<fudis-radio-button-group
				style="margin-bottom: 1rem;"
				[id]="'fruit-selection'"
				[legend]="'Choose your preferred fruit'"
				[helpText]="'Fruits are important for your health.'"
				[errorMsg]="{ required: 'You must choose a fruit!' }"
				*ngIf="mainFormGroup"
				[control]="mainFormGroup.controls['first']"
				[options]="fruitOptions"></fudis-radio-button-group>
			<fudis-body-text *ngIf="mainFormGroup.controls['first'].value"
				>Option chosen: {{ mainFormGroup.controls['first'].value }}</fudis-body-text
			>
			<fudis-body-text *ngIf="!mainFormGroup.controls['first'].value"
				>No value chosen for the second :(</fudis-body-text
			>
			<fudis-radio-button-group
				style="margin-top: 2rem;"
				[id]="'pet-selection'"
				[legend]="'Choose a pet'"
				[helpText]="'We all should have a pet.'"
				[errorMsg]="{ required: 'You must choose a pet!' }"
				*ngIf="mainFormGroup"
				[control]="mainFormGroup.controls['second']"
				[options]="petOptions"></fudis-radio-button-group>
			<fudis-body-text *ngIf="!mainFormGroup.controls['second'].value"
				>No value chosen for the second :(</fudis-body-text
			>
			<fudis-body-text *ngIf="mainFormGroup.controls['second'].value"
				>Option chosen: {{ mainFormGroup.controls['second'].value }}</fudis-body-text
			>
			<fudis-radio-button-group
				style="margin-top: 2rem; margin-bottom: 1rem;"
				[id]="'boolean-selection'"
				[legend]="'Choose a truth'"
				[helpText]="'We all perceive truth individually.'"
				[errorMsg]="{ required: 'You must choose a truth' }"
				*ngIf="mainFormGroup"
				[control]="mainFormGroup.controls['third']"
				[options]="booleanOptions"></fudis-radio-button-group>
			<fudis-body-text
				*ngIf="mainFormGroup.controls['third'].value !== false && mainFormGroup.controls['third'].value !== true"
				>No truth chosen. :(</fudis-body-text
			>
			<fudis-body-text *ngIf="mainFormGroup.controls['third'].value === false || mainFormGroup.controls['third'].value"
				>Option chosen: {{ mainFormGroup.controls['third'].value }}</fudis-body-text
			>
		</form>
	`,
})
class RadioButtonGroupExampleComponent {
	/**
	 * Options for testing purposes
	 */
	fruitOptions: IFudisRadioButtonOption[] = [
		{ value: 'apple', viewValue: 'Apple', id: 'fruit-1', name: 'fruit' },
		{ value: 'fair-trade-banana', viewValue: 'Fair Trade Banana', id: 'fruit-2', name: 'fruit', checked: true },
		{ value: 'cherry', viewValue: 'Cherry', id: 'fruit-3', name: 'fruit' },
	];

	petOptions: IFudisRadioButtonOption[] = [
		{ value: 'platypus', viewValue: 'Platypus', id: 'pet-1', name: 'animal' },
		{ value: 'otter', viewValue: 'Otter', id: 'pet-2', name: 'animal' },
		{ value: 'capybara', viewValue: 'Capybara', id: 'pet-3', name: 'animal' },
	];

	booleanOptions: IFudisRadioButtonOption[] = [
		{ value: false, viewValue: 'False', id: 'boolean-1', name: 'booleans' },
		{ value: true, viewValue: 'True', id: 'boolean-2', name: 'booleans' },
	];

	mainFormGroup: FormGroup = this.formBuilder.group({
		first: new FormControl(getDefaultValue(this.fruitOptions), Validators.required),
		second: new FormControl(getDefaultValue(this.petOptions), Validators.required),
		third: new FormControl(null, Validators.required),
	});

	constructor(private formBuilder: FormBuilder) {}
}

export default {
	title: 'Components/Form/RadioButtonGroup',
	component: RadioButtonGroupComponent,
	subcomponents: {
		RadioButtonGroupComponent,
		RadioButtonComponent,
		BodyTextComponent,
		ErrorMessageComponent,
	},
	decorators: [
		moduleMetadata({
			declarations: [RadioButtonGroupExampleComponent],
			imports: [ReactiveFormsModule, FormsModule],
		}),
	],
} as Meta;

export const RadioButtonGroup: StoryFn = () => ({
	template: `
			<example-radio-button-group></example-radio-button-group>
	`,
});
