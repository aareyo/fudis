import {
	Component,
	EventEmitter,
	ElementRef,
	Input,
	OnInit,
	Output,
	Signal,
	ViewChild,
	ViewEncapsulation,
	effect,
	HostListener,
} from '@angular/core';
import { InputBaseDirective } from '../../directives/form/input-base/input-base.directive';
import { FudisDropdownOption, FudisInputWidth } from '../../types/forms';
import { FudisIdService } from '../../utilities/id-service.service';
import { FudisDropdownMenuItemService } from '../dropdown-menu/dropdown-menu-item/dropdown-menu-item.service';
import { FudisTranslationService } from '../../utilities/translation/translation.service';

@Component({
	selector: 'fudis-autocomplete-multi-select',
	templateUrl: './autocomplete-multi-select.component.html',
	styleUrls: ['./autocomplete-multi-select.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class AutocompleteMultiSelectComponent extends InputBaseDirective implements OnInit {
	constructor(
		private _idService: FudisIdService,
		private _clickService: FudisDropdownMenuItemService,
		_translationService: FudisTranslationService
	) {
		super(_translationService);

		this._menuStatus = this._clickService.getMenuStatus();

		effect(() => {
			this.closeMenu(this._menuStatus());

			this._openAriaLabel = this._translations().AUTOCOMPLETE.MULTISELECT.OPEN_DROPDOWN;
			this._closeAriaLabel = this._translations().AUTOCOMPLETE.MULTISELECT.CLOSE_DROPDOWN;
			this._noResultsFound = this._translations().AUTOCOMPLETE.MULTISELECT.NO_RESULTS;
			this._removeItemText = this._translations().AUTOCOMPLETE.MULTISELECT.REMOVE_ITEM;
		});
	}

	@ViewChild('autocompleteMultiSelectWrapper') wrapper: ElementRef;

	@ViewChild('autocompleteInput') input: ElementRef;

	/**
	 * Dropdown options to display
	 */
	@Input({ required: true }) options: FudisDropdownOption[] = [];

	/**
	 * Available sizes for the multi-select - defaults to large.
	 */
	@Input() size: FudisInputWidth = 'lg';

	/**
	 * Array of selected dropdown options which user is clicking. Can also be used to set preselected options.
	 */
	@Input() selectedOptions: FudisDropdownOption[] = [];

	/**
	 * Output for option click
	 */
	@Output() optionChange = new EventEmitter<FudisDropdownOption[]>();

	/**
	 * Internal property for toggle dropdown visibility
	 */
	protected _toggleOn: boolean;

	/**
	 * Internal property for listening menu toggle Signal
	 */
	private _menuStatus: Signal<boolean>;

	/**
	 * Internal property for icon-only button aria-label when opening dropdown
	 */
	protected _openAriaLabel: string;

	/**
	 * Internal property for icon-only button aria-label when closing dropdown
	 */
	protected _closeAriaLabel: string;

	/**
	 * Internal property label for situations where no results with current filters were found
	 */
	protected _noResultsFound: string;

	/**
	 * Internal property to indicate deleting item chip aria-label
	 */
	protected _removeItemText: string;

	/**
	 * Internal variable for user input filtering
	 */
	protected _filterText: string = '';

	/**
	 * Internal variable for results filtered from options
	 */
	protected _results: FudisDropdownOption[] = [];

	@HostListener('window:keydown.arrowDown', ['$event'])
	@HostListener('window:keydown.arrowUp', ['$event'])
	@HostListener('window:keydown.Escape', ['$event'])
	handleKeyDown(event: KeyboardEvent) {
		event.preventDefault();
		const dropdownMenuElement = this.wrapper.nativeElement.children[2];

		const wrapperInput = this.wrapper.nativeElement.querySelector(
			'.fudis-autocomplete-multi-select__input-wrapper__input'
		);

		const checkboxInput = dropdownMenuElement?.querySelector('.fudis-dropdown-menu-item__checkbox__input');

		if (wrapperInput === document.activeElement && checkboxInput) {
			checkboxInput.focus();
		} else if (wrapperInput !== document.activeElement) {
			this.handleCheckboxFocus(event);
		}
	}

	handleCheckboxFocus(event: any) {
		const parent = event.target.closest('fudis-dropdown-menu-item');

		// eslint-disable-next-line default-case
		switch (event.key) {
			case 'ArrowDown':
				event.preventDefault();
				parent?.nextElementSibling?.querySelector('input').focus();
				break;
			case 'ArrowUp':
				event.preventDefault();
				parent?.previousElementSibling?.querySelector('input').focus();
				break;
			case 'Escape':
				this.input.nativeElement.focus();
		}
	}

	@HostListener('document:click', ['$event.target'])
	handleWindowClick(targetElement: HTMLElement) {
		// Close dropdown-menu if click is outside of the autocomple-multi-select component
		if (targetElement && !this.wrapper.nativeElement.contains(targetElement)) {
			this._toggleOn = false;
		}
		this._clickService.setMenuStatus(this._toggleOn);
	}

	ngOnInit(): void {
		this._id = this.id ?? this._idService.getNewId('autocompleteMultiSelect');
		this._results = [...this.options];
	}

	closeMenu(menuStatus: boolean): void {
		if (!menuStatus) {
			this._toggleOn = false;
		}
	}

	handleInputFocus(event: FocusEvent): void {
		if ((event.relatedTarget as HTMLElement)?.classList.contains('fudis-dropdown-menu-item__checkbox__input')) {
			this._toggleOn = false;
		} else {
			this._toggleOn = true;
		}
		this._clickService.setMenuStatus(this._toggleOn);
	}

	handleButtonClick(): void {
		this._toggleOn = !this._toggleOn;
		this._clickService.setMenuStatus(this._toggleOn);
	}

	handleDeleteItem(): void {
		if (this.selectedOptions.length === 0) {
			this.input.nativeElement.focus();
		}
	}

	selectItem(item: FudisDropdownOption): void {
		if (this.isChecked(item)) {
			this.removeItem(item);
		} else {
			this.selectedOptions.push(item);
		}
		this.optionChange.emit(this.selectedOptions);
	}

	removeItem(item: FudisDropdownOption): void {
		this.selectedOptions = this.selectedOptions.filter((option) => item.viewValue !== option.viewValue);
		this.optionChange.emit(this.selectedOptions);

		if (this.selectedOptions.length === 0) {
			this.input.nativeElement.focus();
		}
	}

	isChecked(item: FudisDropdownOption): boolean {
		return this.selectedOptions.some((e) => e.viewValue === item.viewValue);
	}

	doSearch(event: any): void {
		if (event.key !== 'Escape') {
			this._toggleOn = true;
			this._clickService.setMenuStatus(this._toggleOn);
		}

		this._filterText = event.target.value;

		this._results = this.options.filter((option) =>
			option.viewValue.toLowerCase().includes(this._filterText.toLowerCase())
		);
	}
}
