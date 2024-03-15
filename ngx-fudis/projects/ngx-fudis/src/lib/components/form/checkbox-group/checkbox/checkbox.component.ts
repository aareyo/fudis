import {
  Component,
  Input,
  Output,
  EventEmitter,
  Host,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { FudisIdService } from '../../../../services/id/id.service';
import { CheckboxGroupComponent } from '../checkbox-group.component';
import { FudisCheckboxGroupFormGroup, FudisCheckboxOption } from '../../../../types/forms';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'fudis-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CheckboxComponent implements OnInit {
  constructor(
    private _idService: FudisIdService,
    @Host() protected _checkboxGroup: CheckboxGroupComponent,
  ) {}

  /**
   * Control name for this checkbox from FormGroup
   */
  @Input() controlName: string;

  /**
   * Control name for this checkbox from FormGroup
   */
  @Input() controlIndex: number;

  /**
   * Visible label of checkbox
   */
  @Input({ required: true }) label: string;

  /**
   * Id for single checkbox. By default generated.
   */
  @Input() id: string;

  /**
   * For checkbox value change event
   */
  @Output() handleChange = new EventEmitter<FudisCheckboxOption>();

  /**
   * If checkbox has focus
   */
  protected _focused = false;

  protected _parentControl:
    | FormArray<FormControl<boolean | null | undefined>>
    | FormGroup<FudisCheckboxGroupFormGroup<object>>;

  ngOnInit(): void {
    if (this.id) {
      this._idService.addNewChildId('checkbox-group', this._checkboxGroup.id, this.id);
    } else {
      this.id = this._idService.getNewChildId('checkbox-group', this._checkboxGroup.id);
    }
  }

  /**
   * For toggling checkbox
   */
  protected _onChange(): void {
    const parentType = this._checkboxGroup.getFormType();

    if (parentType === 'group' && this.controlName) {
      const optionToEmit: FudisCheckboxOption = {
        id: this.id,
        groupName: this._checkboxGroup.id,
        controlName: this.controlName,
        label: this.label,
        value: this._checkboxGroup.formGroup.controls[this.controlName].value,
      };

      this.handleChange.emit(optionToEmit);
    } else if (parentType === 'array' && this.controlIndex) {
      const optionToEmit: FudisCheckboxOption = {
        id: this.id,
        groupName: this._checkboxGroup.id,
        controlIndex: this.controlIndex,
        label: this.label,
        value: this._checkboxGroup.formArray.controls[this.controlIndex].value,
      };

      this.handleChange.emit(optionToEmit);
    }
  }

  /**
   * When focusing out from checkbox, determine if next focus target is outside of the same checkbox group. If yes, then tell parent Checkbox Group, that focus has moved outside.
   */
  protected _onBlur(event: FocusEvent): void {
    this._focused = false;

    if ((event.relatedTarget as HTMLElement)?.getAttribute('name') !== this._checkboxGroup.id) {
      setTimeout(() => {
        if (document.activeElement?.getAttribute('name') !== this._checkboxGroup.id) {
          this._checkboxGroup.setGroupBlurredOut(true);
        }
      }, 150);
    }
  }

  /**
   * When Checkbox is focused
   */
  protected _onFocus(): void {
    this._focused = true;
  }
}
