import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ErrorSummaryService } from './error-summary.service';

@Component({
	selector: 'fudis-error-summary',
	templateUrl: './error-summary.component.html',
	styleUrls: ['./error-summary.component.scss'],
})
export class ErrorSummaryComponent implements OnInit, AfterViewInit {
	@ViewChild('focusTarget') focusTarget: ElementRef;

	/**
	 * FieldSet parent element of this ErrorSummaryComponent
	 */
	@Input() parentComponent: HTMLFieldSetElement | undefined;

	/**
	 * Help text displayed in Error Summary before listing individual errors.
	 */
	@Input() helpText: string | null | undefined;

	/**
	 * Additional text for screen readers added before help text. E.g. "Attention". Comparable for "alert" icon included in Error Summary.
	 */
	@Input() screenReaderHelpText: string | null | undefined;

	constructor(private errorSummaryService: ErrorSummaryService) {}

	visibleErrorList: any = [];

	getErrors(): void {
		this.errorSummaryService.getVisibleErrors().subscribe((errorsFromService) => {
			this.visibleErrorList = [];
			Object.keys(errorsFromService).forEach((item) => {
				if (this.parentComponent?.querySelector(`#${item}`)) {
					const { label } = errorsFromService[item];

					Object.values(errorsFromService[item].errors).forEach((error: any) => {
						this.visibleErrorList.push({ id: item, message: `${label}: ${error}` });
					});
				}
			});

			this.focusToErrorSummary();
		});
	}

	ngOnInit(): void {
		this.getErrors();
	}

	focusToErrorSummary(): void {
		if (this.focusTarget && this.visibleErrorList.length > 0) {
			(this.focusTarget.nativeElement as HTMLDivElement).focus();
		}
	}

	ngAfterViewInit(): void {
		this.focusToErrorSummary();
	}
}
