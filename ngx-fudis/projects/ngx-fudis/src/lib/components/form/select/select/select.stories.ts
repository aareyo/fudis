import { Meta, applicationConfig, StoryFn } from '@storybook/angular';
import { FormControl } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';
import { SelectComponent } from './select.component';
import readme from './readme.mdx';
import { groupedMockData, defaultOptions } from '../common/mock_data';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Components/Form/Select/Select',
  component: SelectComponent,
  decorators: [
    applicationConfig({
      providers: [importProvidersFrom(BrowserAnimationsModule)],
    }),
  ],
  parameters: {
    docs: {
      page: readme,
    },
    controls: {
      exclude: [
        '_id',
        '_required',
        '_requiredText',
        '_translations',
        'ngOnInit',
        'ngOnChanges',
        'onBlur',
      ],
    },
  },
  argTypes: {
    size: {
      options: ['sm', 'md', 'lg'],
      control: { type: 'radio' },
    },
  },
} as Meta;

const html = String.raw;

const ExampleTemplate: StoryFn<SelectComponent> = (args: SelectComponent) => ({
  props: {
    ...args,
    defaultOptions,
    selectionUpdate: action('selectionUpdate'),
    control: new FormControl(defaultOptions[2]),
    groupedMockData,
  },
  template: html`
    <fudis-select
      [size]="size"
      [placeholder]="placeholder"
      [control]="control"
      [label]="label"
      [disabled]="disabled"
      [helpText]="helpText"
      (selectionUpdate)="selectionUpdate($event)"
    >
      <ng-template fudisContent type="select-options">
        <fudis-select-option
          *ngFor="let option of defaultOptions"
          [data]="option"
        ></fudis-select-option>
        <fudis-select-group *ngFor="let group of groupedMockData" [label]="group.country">
          <fudis-select-option
            *ngFor="let groupedOption of group.options"
            [data]="groupedOption"
          ></fudis-select-option>
        </fudis-select-group>
      </ng-template>
    </fudis-select>
  `,
});

export const Example = ExampleTemplate.bind({});
Example.args = {
  disabled: false,
  label: 'Select a pet',
  size: 'lg',
  placeholder: 'Choose a pet',
  helpText: 'All pets are equally important, but for sake of this example please pick one.',
};
