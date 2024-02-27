import { StoryFn, Meta, componentWrapperDecorator } from '@storybook/angular';
import { GridComponent } from './grid.component';
import { excludeEverythingExceptRegex, gridExampleExclude } from '../../../utilities/storybook';
import readme from './grid.component.mdx';

const html = String.raw;

export default {
  title: 'Components/Grid/Grid',
  component: GridComponent,
  decorators: [
    componentWrapperDecorator(
      (story) => html`<div style="border: 3px solid #b83c2e">${story}</div>`,
    ),
  ],

  parameters: {
    docs: {
      page: readme,
    },
  },
} as Meta;

const ExampleTemplate: StoryFn<GridComponent> = (args: GridComponent) => ({
  props: args,
  template: html`<fudis-grid
    [classes]="['storybook__wrapper-border']"
    [columns]="columns"
    [align]="align"
    [alignItemsX]="alignItemsX"
    [alignItemsY]="alignItemsY"
    [marginTop]="marginTop"
    [marginBottom]="marginBottom"
    [width]="width"
    [columnGap]="columnGap"
    [rowGap]="rowGap"
  >
    <fudis-body-text class="storybook__item-highlight"
      >Current value of columns: {{columns}}</fudis-body-text
    ><fudis-body-text class="storybook__item-highlight"
      >Current value of columns: {{columns}}</fudis-body-text
    >
    <fudis-body-text class="storybook__item-highlight"
      >Current value of columns: {{columns}}</fudis-body-text
    >
    <fudis-body-text class="storybook__item-highlight"
      >Current value of columns: {{columns}}</fudis-body-text
    >
    <fudis-body-text class="storybook__item-highlight"
      >Current value of columns: {{columns}}</fudis-body-text
    >
    <fudis-body-text class="storybook__item-highlight"
      >Current value of columns: {{columns}}</fudis-body-text
    >
  </fudis-grid>`,
});

export const Example = ExampleTemplate.bind({});
Example.args = {
  columns: 3,
  align: 'center',
  alignItemsX: 'stretch',
  alignItemsY: 'stretch',
  marginTop: 'none',
  marginBottom: 'none',
  width: 'xxl',
  rowGap: 'responsive',
  columnGap: 'responsive',
};

Example.argTypes = {
  columns: {
    options: [
      1,
      2,
      3,
      4,
      5,
      6,
      '1fr 3fr',
      '1fr 1fr',
      '5fr 1fr',
      '1fr max-content 1fr',
      '1fr 1fr min-content auto',
      '1fr auto min-content 1fr',
    ],
    control: { type: 'select' },
  },
  align: {
    options: ['start', 'end', 'center'],
    control: { type: 'select' },
  },
  alignItemsX: {
    options: ['start', 'center', 'end', 'stretch'],
    control: { type: 'select' },
  },
  alignItemsY: {
    options: ['start', 'center', 'end', 'stretch'],
    control: { type: 'select' },
  },
  width: {
    options: ['xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'initial'],
    control: { type: 'select' },
  },
  marginTop: {
    options: ['none', 'xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl'],
    control: { type: 'select' },
  },
  marginBottom: {
    options: ['none', 'xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl'],
    control: { type: 'select' },
  },
  rowGap: {
    options: ['responsive', 'none', 'xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl'],
    control: { type: 'select' },
  },
  columnGap: {
    options: ['responsive', 'none', 'xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl'],
    control: { type: 'select' },
  },
};

Example.parameters = {
  controls: {
    exclude: gridExampleExclude,
  },
};

const EqualColumnsTemplate: StoryFn<GridComponent> = (args: GridComponent) => ({
  props: args,
  template: html`<fudis-grid
    [columns]="columns"
    [align]="'center'"
    [classes]="['storybook__wrapper-border']"
  >
    <fudis-body-text class="storybook__item-highlight"
      >Current value of columns is: {{columns}}</fudis-body-text
    >
    <fudis-body-text class="storybook__item-highlight"
      >Current value of columns is: {{columns}}</fudis-body-text
    >
    <fudis-body-text class="storybook__item-highlight"
      >Current value of columns is: {{columns}}</fudis-body-text
    >
    <fudis-body-text class="storybook__item-highlight"
      >Current value of columns is: {{columns}}</fudis-body-text
    >
    <fudis-body-text class="storybook__item-highlight"
      >Current value of columns is: {{columns}}</fudis-body-text
    >
    <fudis-body-text class="storybook__item-highlight"
      >Current value of columns is: {{columns}}</fudis-body-text
    >
  </fudis-grid>`,
});

export const EqualColumns = EqualColumnsTemplate.bind({});
EqualColumns.args = {
  columns: 3,
};
EqualColumns.argTypes = {
  columns: {
    options: [1, 2, 3, 4, 6],
    control: { type: 'radio' },
  },
};
EqualColumns.parameters = {
  controls: {
    exclude: excludeEverythingExceptRegex(['columns']),
  },
};

const ExampleWithFrUnitsTemplate: StoryFn<GridComponent> = (args: GridComponent) => ({
  props: args,

  template: html`<fudis-grid
    [columns]="columns"
    [align]="'center'"
    [classes]="['storybook__wrapper-border']"
  >
    <fudis-body-text class="storybook__item-highlight"
      >Current value of columns: {{columns}}</fudis-body-text
    >
    <fudis-body-text class="storybook__item-highlight"
      >Current value of columns: {{columns}}</fudis-body-text
    >
    <fudis-body-text class="storybook__item-highlight"
      >Current value of columns: {{columns}}</fudis-body-text
    >
    <fudis-body-text class="storybook__item-highlight"
      >Current value of columns: {{columns}}</fudis-body-text
    >
    <fudis-body-text class="storybook__item-highlight"
      >Current value of columns: {{columns}}</fudis-body-text
    >
    <fudis-body-text class="storybook__item-highlight"
      >Current value of columns: {{columns}}</fudis-body-text
    >
  </fudis-grid>`,
});

export const ExampleWithFrUnits = ExampleWithFrUnitsTemplate.bind({});
ExampleWithFrUnits.args = {
  columns: '3fr 1fr',
};
ExampleWithFrUnits.argTypes = {
  columns: {
    options: ['3fr 1fr', '1fr 2fr', '1fr 2fr 1fr', '3fr 1fr 2fr'],
    control: { type: 'radio' },
  },
};
ExampleWithFrUnits.parameters = {
  controls: {
    exclude: excludeEverythingExceptRegex(['columns']),
  },
};

const ResponsiveColumnsTemplate: StoryFn<GridComponent> = (args: GridComponent) => ({
  props: {
    ...args,
    columnObjectOne: '{md: 2, xxl: 4}',
    defaultObject: '{xs: 1, md: 2, xl: 4}',
    columnObjectTwo: '{sm: 2, md: 3}',
    combinedObject: '{xs: 1, sm: 2, md: 3, xl: 4}',
  },
  template: html`<fudis-grid
    [columns]="columns"
    [align]="'center'"
    [classes]="['storybook__wrapper-border']"
  >
    <fudis-body-text class="storybook__item-highlight">Grid item</fudis-body-text>
    <fudis-body-text class="storybook__item-highlight">Grid item</fudis-body-text>
    <fudis-body-text class="storybook__item-highlight">Grid item</fudis-body-text>
    <fudis-body-text class="storybook__item-highlight">Grid item</fudis-body-text>
    <fudis-body-text class="storybook__item-highlight">Grid item</fudis-body-text>
    <fudis-body-text class="storybook__item-highlight">Grid item</fudis-body-text>
  </fudis-grid>`,
});

export const ResponsiveColumns = ResponsiveColumnsTemplate.bind({});

ResponsiveColumns.args = {
  columns: { sm: 2, md: '1fr 2fr', lg: 3, xl: '1fr 2fr 1fr', xxl: 6 },
};

ResponsiveColumns.parameters = {
  controls: {
    exclude: excludeEverythingExceptRegex(['columns']),
  },
};
