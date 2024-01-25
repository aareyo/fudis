import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectBaseDirective } from './select-base.directive';
import { SelectGroupComponent } from '../select-group/select-group.component';
import { Component, ViewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { SelectComponent } from '../../select/select.component';
import { IconComponent } from '../../../../icon/icon.component';
import { GuidanceComponent } from '../../../guidance/guidance.component';
import { LabelComponent } from '../../../label/label.component';
import { BodyTextComponent } from '../../../../typography/body-text/body-text.component';
import { SelectDropdownComponent } from '../select-dropdown/select-dropdown.component';
import { FudisIdService } from '../../../../../services/id/id.service';
import { FudisTranslationService } from '../../../../../services/translation/translation.service';
import { ContentDirective } from '../../../../../directives/content-projection/content/content.directive';
import { SelectOptionComponent } from '../../select/select-option/select-option.component';
import { MultiselectComponent } from '../../multiselect/multiselect.component';
import { FudisSelectOption } from '../../../../../types/forms';
import { SelectAutocompleteComponent } from '../autocomplete/autocomplete.component';
import { ButtonComponent } from '../../../../button/button.component';
import { MultiselectOptionComponent } from '../../multiselect/multiselect-option/multiselect-option.component';
import { FudisFocusService } from '../../../../../services/focus/focus.service';
import { getElement, getTrimmedTextContent } from '../../../../../utilities/tests/utilities';
import { MultiselectChipListComponent } from '../../multiselect/multiselect-chip-list/multiselect-chip-list.component';
// import { phl } from '@angular-extensions/pretty-html-log';

export const testGroupedData = [
  {
    country: 'Netherlands',

    options: [
      {
        value: '4257d865-872c-4ea6-80e6-8bd04ce56ad7',
        label: 'Golden jackal',
        scienceName: 'Canis aureus',
      },
      {
        value: 'e2fa6f0a-632a-485f-8ccf-b984311fe3b4',
        label: 'Mountain lion',
        scienceName: 'Felis concolor',
      },
    ],
  },
  {
    country: 'Brazil',
    options: [
      {
        value: '4ae756e1-3ace-43a4-8c47-7081328970b1',
        label: 'Small Indian mongoose',
        scienceName: 'Herpestes javanicus',
      },
      {
        value: 'c0cba653-c8eb-410d-bf65-32d2353e1fca',
        label: 'Falcon, prairie',
        scienceName: 'Falco mexicanus',
      },
    ],
  },
  {
    country: 'China',
    options: [
      {
        value: '4c08f813-45b6-4a32-99de-eee6a80a555a',
        label: 'Salmon pink bird eater tarantula',
        scienceName: 'Lasiodora parahybana',
      },
      {
        value: '98bd0882-5bc8-435f-932d-0bf7495b0608',
        label: 'Crane, sandhill',
        scienceName: 'Grus canadensis',
      },
    ],
  },
];

@Component({
  selector: 'fudis-mock-select',
  template: ` <fudis-multiselect
    #multiSelect
    [autocomplete]="autocomplete"
    [label]="'Test Label'"
    [placeholder]="'Test placeholder'"
    [control]="control"
    [size]="'md'"
    [autocompleteClearButton]="clearButton"
  >
    <ng-template fudisContent type="select-options">
      <fudis-multiselect-group *ngFor="let group of groupedData" [label]="group.country">
        <fudis-multiselect-option
          *ngFor="let groupedOption of group.options"
          [data]="groupedOption"
        />
      </fudis-multiselect-group>
    </ng-template>
  </fudis-multiselect>`,
})
class MockSelectComponent {
  groupedData = testGroupedData;
  control: FormControl = new FormControl<FudisSelectOption[] | null>(null);
  autocomplete = true;
  clearButton = true;

  // @ViewChild('singleSelect') singleSelect: SelectComponent;
  @ViewChild('multiSelect') multiSelect: MultiselectComponent;
}

describe('SelectBaseDirective', () => {
  let component: MockSelectComponent;
  let fixture: ComponentFixture<MockSelectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ContentDirective,
        SelectComponent,
        SelectBaseDirective,
        SelectGroupComponent,
        SelectDropdownComponent,
        SelectOptionComponent,
        GuidanceComponent,
        IconComponent,
        LabelComponent,
        MockSelectComponent,
        MultiselectComponent,
        MultiselectOptionComponent,
        MultiselectChipListComponent,
        SelectAutocompleteComponent,
        BodyTextComponent,
        ButtonComponent,
      ],
      providers: [FudisFocusService, FudisIdService, FudisTranslationService],
      imports: [ReactiveFormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MockSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  function setMultiSelectDropdownOpen() {
    component.multiSelect.openDropdown();
    fixture.detectChanges();
  }

  function patchControlValue() {
    component.control.patchValue([testGroupedData[0].options[0]]);
  }

  describe('Select base directive default input values', () => {
    it('should have size', () => {
      expect(component.multiSelect.size).toEqual('md');
    });

    it('should have CSS host class', () => {
      expect(component.multiSelect.classes).toEqual('fudis-select-host');
    });

    it('should have placeholder text', () => {
      const selectElement = getElement(fixture, '.fudis-select');
      const value = selectElement
        .querySelector('.fudis-select-autocomplete__input')
        ?.getAttribute('placeholder');
      expect(value).toContain('Test placeholder');
    });

    it('should render autocomplete when autocomplete is set to true', () => {
      component.autocomplete = false;
      fixture.detectChanges();

      const elementNotBeFound = getElement(fixture, 'fudis-select-autocomplete');
      expect(elementNotBeFound).toBeNull;

      component.autocomplete = true;
      fixture.detectChanges();

      const foundAutocomplete = getElement(fixture, 'fudis-select-autocomplete');
      expect(foundAutocomplete).toBeTruthy;
    });

    it('should display clear button when set to true', () => {
      const clearIconButton = getElement(
        fixture,
        'fudis-select-autocomplete .fudis-select-autocomplete__icon.fudis-button-host',
      );

      expect(clearIconButton.getAttribute('ng-reflect-icon')).toEqual('close');

      component.clearButton = false;
      fixture.detectChanges();

      const dropdownChervon = getElement(
        fixture,
        'fudis-select-autocomplete .fudis-select-autocomplete__icon',
      );
      expect(dropdownChervon.getAttribute('ng-reflect-icon')).toEqual('chevron');
    });

    it('should show selected options as a sorted placeholder text', () => {
      //component.autocomplete = false;

      patchControlValue();
      setMultiSelectDropdownOpen();
      fixture.detectChanges();

      const checkedOption = fixture.nativeElement.querySelectorAll(
        '.fudis-multiselect-option__label--checked .fudis-multiselect-option__label__text',
      );

      const trimmedLabel = getTrimmedTextContent(checkedOption[0]);

      expect(trimmedLabel).toEqual('Golden jackal');

      // Ei löydy, koska tämä on näkyvissä vain ei-autocompletella
      const inputText = fixture.nativeElement.querySelector('.fudis-select__input__label');
      console.log(inputText);

      console.log(component.multiSelect.dropdownSelectionLabelText);
    });
  });
});
