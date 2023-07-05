import { Signal, signal } from '@angular/core';
import { FudisFormErrorSummaryObject, FudisFormErrorSummaryItem } from '../../../types/forms';

export class FudisErrorSummaryService {
	private _currentErrorList: FudisFormErrorSummaryObject = {};

	private _signalCurrentErrorList = signal<FudisFormErrorSummaryObject>({});

	private _signalDynamicCurrentErrorList = signal<FudisFormErrorSummaryObject>({});

	getVisibleErrors(): Signal<FudisFormErrorSummaryObject> {
		return this._signalCurrentErrorList.asReadonly();
	}

	getDynamicErrors(): Signal<FudisFormErrorSummaryObject> {
		return this._signalDynamicCurrentErrorList.asReadonly();
	}

	// eslint-disable-next-line class-methods-use-this
	private defineErrorId(id: string, controlName: string | undefined): string {
		return controlName ? `${id}_${controlName}` : id;
	}

	public addNewError(newError: FudisFormErrorSummaryItem): void {
		let currentErrors = this._currentErrorList;

		const errorId = this.defineErrorId(newError.id, newError.controlName);

		if (!currentErrors[errorId]) {
			currentErrors = {
				...currentErrors,
				[errorId]: {
					id: newError.id,
					errors: { [newError.type]: newError.error },
					label: newError.label,
				},
			};
		} else {
			currentErrors = {
				...currentErrors,
				[errorId]: {
					id: newError.id,
					errors: { ...currentErrors[errorId].errors, [newError.type]: newError.error },
					label: newError.label,
				},
			};
		}

		this._currentErrorList = currentErrors;
	}

	public removeError(error: { id: string; controlName: string | undefined; type: string }): void {
		const currentErrors = this._currentErrorList;

		const errorId = error.controlName ? `${error.id}_${error.controlName}` : error.id;

		delete currentErrors[errorId].errors[error.type];

		this._currentErrorList = currentErrors;

		this._signalDynamicCurrentErrorList.set(currentErrors);
	}

	public reloadErrors(delay: number = 0): void {
		setTimeout(() => {
			this._signalCurrentErrorList.set(this._currentErrorList);
			this._signalDynamicCurrentErrorList.set(this._currentErrorList);
		}, delay);
	}
}
