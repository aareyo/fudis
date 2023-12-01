import { AfterViewInit, Component, Host, Input, OnChanges, OnDestroy, OnInit, Optional } from '@angular/core';

import { Observable, Subscription } from 'rxjs';
import { FudisErrorSummaryService } from '../../../services/form/error-summary/error-summary.service';
import { FudisFormErrorSummaryItem } from '../../../types/forms';
import { FudisTranslationService } from '../../../services/translation/translation.service';
import { FudisIdService } from '../../../services/id/id.service';
import { GuidanceComponent } from '../guidance/guidance.component';
import { InputBaseDirective } from '../../../directives/form/input-base/input-base.directive';

@Component({
	selector: 'fudis-error-message',
	templateUrl: './error-message.component.html',
	styleUrls: ['./error-message.component.scss'],
})
export class ErrorMessageComponent implements OnInit, OnChanges, OnDestroy, AfterViewInit {
	constructor(
		private _errorSummaryService: FudisErrorSummaryService,
		private _translationService: FudisTranslationService,
		private _idService: FudisIdService,
		@Host() @Optional() protected _parentGuidance: GuidanceComponent,
		@Host() @Optional() protected _parentInput: InputBaseDirective
	) {
		this._id = _idService.getNewId('error-message');
	}

	/*
	 * Error message to display
	 */
	@Input({ required: true }) message: Observable<string> | string | undefined;

	/**
	 * Error type from different keys in e. g. control.errors such as 'required' and 'minlength'
	 */
	@Input({ required: true }) type: string;

	/**
	 * Name of control this error is related to.
	 */
	@Input() controlName: string | undefined = undefined;

	/**
	 * If error is visible or not.
	 */
	@Input() visible: boolean = false;

	/**
	 * Visual variant of error message
	 */
	@Input() variant: 'body-text' | 'form-error' = 'form-error';

	/**
	 * Temporary warning as Form Error Message is been refactored from 'errorMsg' to be binded with FudisValidators and FudisFormGroupValidators
	 */
	@Input() deprecationWarning: boolean = false;

	@Input() isCustomError: boolean = true;

	parent: any;

	/**
	 * Error message to include in error summary item
	 */
	protected _currentMessage: string;

	protected _id: string;

	/**
	 * Has error been created and sent forward
	 */
	private _errorSent: boolean = false;

	/**
	 * Error label to include in error summary item
	 */
	private _currentLabel: string | undefined = undefined;

	private _subscribtion: Subscription;

	ngOnInit(): void {
		if (this.message && typeof this.message !== 'string') {
			this._subscribtion = this.message.subscribe((value: string) => {
				this._currentMessage = value;
				this.createError();
			});
		}

		if (this.deprecationWarning) {
			// eslint-disable-next-line no-console
			console.warn(
				`Component with id of '${this._parentGuidance?.for}' and label of '${this._parentGuidance?.inputLabel}' received form error messages from 'errorMsg' input. This will be removed in version Fudis v1.0.0, as error message logic will be binded straight with FudisValidators and FudisFormGroupValidators.`
			);
		}

		this.createError();
	}

	ngAfterViewInit(): void {
		setTimeout(() => {
			if (typeof this.message !== 'string' && !this.message) {
				this.throwError();
			}
		}, 1000);
	}

	createError(): void {
		console.log(this.message);
		console.log('alallalala', this.parent);

		if (typeof this.message === 'string') {
			this._currentMessage = this.message;
		}

		if (this._parentGuidance?.for) {
			this._currentLabel = this._parentGuidance?.inputLabel;

			const newError: FudisFormErrorSummaryItem = {
				id: this._parentGuidance?.for,
				error: this._currentMessage,
				label: this._currentLabel,
				type: this.type,
				controlName: this.controlName,
				language: this._translationService.getLanguage(),
			};
			this._errorSummaryService.addNewError(newError);
			this._errorSent = true;
		}
	}

	ngOnChanges(): void {
		if (this._errorSent) {
			this.createError();
		}
	}

	ngOnDestroy(): void {
		if (this._errorSent) {
			this._errorSummaryService.removeError({
				id: this._parentGuidance?.for,
				type: this.type,
				controlName: this.controlName,
			});
		}

		if (this._subscribtion) {
			this._subscribtion.unsubscribe();
		}
	}

	throwError(): void {
		if (this.controlName) {
			// eslint-disable-next-line no-console
			console.warn(
				`Fudis component with id of '${this._parentGuidance?.for}' and control name of '${this.controlName}' is missing error message for error type of: '${this.type}'`
			);
		} else {
			// eslint-disable-next-line no-console
			console.warn(
				`Fudis component with id of '${this._parentGuidance?.for}' is missing error message for error type of: '${this.type}'`
			);
		}
	}
}
