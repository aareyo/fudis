import {
  AfterContentInit,
  Component,
  ContentChild,
  ElementRef,
  Inject,
  Input,
  OnInit,
  ViewChild,
  ViewEncapsulation,
  effect,
} from '@angular/core';
import { distinctUntilChanged } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { untilDestroyed } from '../../../../utilities/untilDestroyed';
import { FudisIdService } from '../../../../services/id/id.service';
import { FudisTranslationService } from '../../../../services/translation/translation.service';
import { FudisDateRangeItem } from '../../../../types/forms';
import {
  EndDateErrorDirective,
  StartDateErrorDirective,
} from '../../../../directives/content-projection/content/content.directive';

@Component({
  selector: 'fudis-date-range',
  templateUrl: './date-range.component.html',
  styleUrls: ['./date-range.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DateRangeComponent implements OnInit, AfterContentInit {
  constructor(
    @Inject(DOCUMENT) private _document: Document,
    private _idService: FudisIdService,
    private _translationService: FudisTranslationService,
  ) {
    effect(() => {
      this._startDateInvalid =
        this._translationService.getTranslations()().DATEPICKER.VALIDATION.START_DATE_INVALID;
      this._endDateInvalid =
        this._translationService.getTranslations()().DATEPICKER.VALIDATION.END_DATE_INVALID;
    });
  }

  @ViewChild('dateRangeRef') private _dateRangeRef: ElementRef;

  /**
   * Content projection directive fudisStartDateError is used when there's a need to bind custom ErrorMessage to Date Range's start date
   */
  @ContentChild(StartDateErrorDirective) protected _startDateError: StartDateErrorDirective;

  /**
   * Content projection directive fudisEndDateError is used when there's a need to bind custom ErrorMessage to Date Range's end date
   */
  @ContentChild(EndDateErrorDirective) protected _endDateError: EndDateErrorDirective;

  /**
   * Settings for start date
   */
  @Input({ required: true }) startDate: FudisDateRangeItem;

  /**
   * Settings for end date
   */
  @Input({ required: true }) endDate: FudisDateRangeItem;

  /**
   * Id for Date Range component. If not provided, generated by Id Service.
   */
  @Input() id: string;

  /**
   * Set browser focus to start date input on the first load.
   */
  @Input() initialFocus: boolean = false;

  /**
   * If setting height to equal is completed
   */
  protected _heightSet: boolean = false;

  /**
   * Fudis translation for invalid start date
   */
  protected _startDateInvalid: string;

  /**
   * Fudis translation for invalid end date
   */
  protected _endDateInvalid: string;

  /**
   * Counter for number of tries setting equal height to Date Picker
   */
  private _heightSetTryCounter: number = 0;

  private _untilDestroyed = untilDestroyed();

  ngOnInit(): void {
    if (this.id) {
      this._idService.addNewId('daterange', this.id);
    } else {
      this.id = this._idService.getNewId('daterange');
    }
  }

  ngAfterContentInit(): void {
    /**
     * Subscribe to control value changes, so we can trigger start date and end date comparison
     */
    this.startDate.control.valueChanges
      .pipe(distinctUntilChanged(), this._untilDestroyed())
      .subscribe(() => {
        this._checkDateCrossings();
      });

    this.endDate.control.valueChanges
      .pipe(distinctUntilChanged(), this._untilDestroyed())
      .subscribe(() => {
        this._checkDateCrossings();
      });

    this._setLabelHeight();
  }

  /**
   * Height of Datepickers might vary if other one has tooltip and other one not, or if other one has longer label. This function sets their label height equal, so they should remain aligned.
   */
  private _setLabelHeight(): void {
    const labels = (this._dateRangeRef?.nativeElement as HTMLDivElement)?.querySelectorAll(
      '.fudis-label',
    );
    if (labels?.length === 2) {
      const labelOneHeigth = labels[0].clientHeight;
      const labelTwoHeigth = labels[1].clientHeight;

      const fontSize = Number(
        window
          .getComputedStyle(this._document.body)
          .getPropertyValue('font-size')
          .replace('px', ''),
      );

      if (labelOneHeigth > labelTwoHeigth) {
        (labels[1] as HTMLLabelElement).style.height = `${labelOneHeigth / fontSize}rem`;
      } else if (labelTwoHeigth > labelOneHeigth) {
        (labels[0] as HTMLLabelElement).style.height = `${labelTwoHeigth / fontSize}rem`;
      }

      this._heightSet = true;
    } else if (this._heightSetTryCounter < 100) {
      setTimeout(() => {
        this._heightSetTryCounter += 1;
        this._setLabelHeight();
      }, 100);
    }
  }

  /**
   * Check and set, if start date is set to after end date
   */
  private _checkDateCrossings(): void {
    const startDateErrors = this.startDate.control?.errors;
    const endDateErrors = this.endDate.control?.errors;

    const startDate = this.startDate.control?.value;
    const endDate = this.endDate.control?.value;

    // Compare only dates, do not take hours into account
    if (startDate && endDate && startDate.setHours(0, 0, 0, 0) > endDate.setHours(0, 0, 0, 0)) {
      this.startDate.control.setErrors({
        ...startDateErrors,
        datepickerStartDateInvalid: { message: this._startDateInvalid },
      });
      this.endDate.control.setErrors({
        ...endDateErrors,
        datepickerEndDateInvalid: { message: this._endDateInvalid },
      });
    } else if (startDateErrors || endDateErrors) {
      if (startDateErrors) {
        delete startDateErrors['datepickerStartDateInvalid'];
        this.startDate.control.setErrors({ ...startDateErrors });
        this.startDate.control.updateValueAndValidity();
      }
      if (endDateErrors) {
        delete endDateErrors['datepickerEndDateInvalid'];
        this.endDate.control.setErrors({ ...endDateErrors });
        this.endDate.control.updateValueAndValidity();
      }
    }
  }
}
