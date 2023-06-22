import { AfterContentInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { FudisDropdownOption, FudisInputWidth } from '../../../types/forms';
import { InputBaseDirective } from '../../../directives/form/input-base/input-base.directive';
import { checkRequiredAttributes } from '../../../utilities/form/errorsAndWarnings';
import { IdService } from '../../../utilities/id-service.service';

export type AutocompleteInputSize = 'sm' | 'md' | 'lg';

@Component({
	selector: 'fudis-autocomplete',
	templateUrl: './autocomplete.component.html',
	styleUrls: ['./autocomplete.component.scss'],
})
export class AutocompleteComponent extends InputBaseDirective implements OnInit, AfterContentInit {
	constructor(private _idService: IdService) {
		super();
	}

	@ViewChild('fudisAutocompleteInput') autocompleteInput: ElementRef;

	@ViewChild('scrollViewport') scrollViewport: CdkVirtualScrollViewport;

	/**
	 * FormControl for the input.
	 */
	@Input({ required: true }) control: FormControl<FudisDropdownOption | null>;

	/**
	 * Option list
	 */
	@Input({ required: true }) options: FudisDropdownOption[];

	/**
	 * Internal filtered options derived from options Input
	 */
	filteredOptions: Observable<FudisDropdownOption[]>;

	/**
	 * Available sizes for the autocomplete - defaults to large.
	 */
	@Input() size: FudisInputWidth = 'lg';

	/**
	 * Aria-label for close icon which clears the input
	 */
	@Input({ required: true }) clearFilterText: string;

	/**
	 * Option whether the dropdown options are shown only after three charactes (search) or if options are displayed when focusing the search input even without typing (dropdown)
	 */
	@Input() variant: 'search' | 'dropdown' = 'search';

	/**
	 * Internal formControl to check if typed text matches with any of the options' viewValue
	 */
	autocompleteFormControl = new FormControl<string | null>('');

	/** Internal id to generate unique id */
	protected _id: string;

	ngOnInit(): void {
		this._id = this.id ?? this._idService.getNewId('autocomplete');
		checkRequiredAttributes(this._id, this.requiredText, this.control, undefined, this.ignoreRequiredCheck);
	}

	ngAfterContentInit() {
		if (this.control.value) {
			this.autocompleteFormControl.patchValue(this.control.value.viewValue);
		}
		this.checkFilteredOptions();
	}

	checkFilteredOptions() {
		if (this.variant === 'search') {
			this.filteredOptions = this.autocompleteFormControl.valueChanges.pipe(
				map((value) => {
					this.updateControlValue(value);
					// Start filtering after three characters
					if (value && value.length > 2 && !this.control.value) {
						return this._filter(value);
					}
					return [];
				})
			);
		}
		if (this.variant === 'dropdown') {
			this.filteredOptions = this.autocompleteFormControl.valueChanges.pipe(
				startWith(''),
				map((value) => {
					this.updateControlValue(value);
					if ((value || value === '') && !this.control.value) {
						return this._filter(value);
					}
					return [];
				})
			);
		}
	}

	updateControlValue(value: string | null): void {
		if (!value) {
			this.control.patchValue(null);
		} else {
			const optionValue = this.options.find((option) => {
				return option.viewValue.toLowerCase() === value.toLowerCase() ? option : null;
			});

			if (optionValue) {
				this.control.patchValue(optionValue);
			} else {
				this.control.patchValue(null);
			}
		}
	}

	/**
	 * Filter options when user inputs text
	 */
	private _filter(value: string): FudisDropdownOption[] {
		if (value || value === '') {
			const filterValue = value.toLowerCase();
			const filteredOptions = this.options.filter((option) => option.viewValue.toLowerCase().includes(filterValue));

			if (this.scrollViewport?.elementRef?.nativeElement) {
				this.scrollViewport.elementRef.nativeElement.style.height = `${filteredOptions.length * 2.5}rem`;
			}
			return filteredOptions;
		}
		return [];
	}

	/**
	 * Clear any written or selected value in the autocomplete field
	 */
	clearFilter(): void {
		// Clear input field and control value
		this.control.setValue(null);
		this.autocompleteFormControl.setValue(null);

		this.checkFilteredOptions();

		// After clearing set focus back to input field
		this.autocompleteInput.nativeElement.focus();
	}

	autocompleteBlur(event: Event): void {
		this.control.markAsTouched();
		if (this.control.valid && this.control.value) {
			this.autocompleteFormControl.patchValue(this.control.value.viewValue);
		}
		this.handleBlur.emit(event);
	}
}
