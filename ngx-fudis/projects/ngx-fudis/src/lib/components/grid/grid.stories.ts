import { moduleMetadata, Story, Meta, componentWrapperDecorator } from '@storybook/angular';
import { GridComponent } from './grid.component';
import { HeadingComponent } from '../typography/heading/heading.component';
import { BodyTextComponent } from '../typography/body-text/body-text.component';

export default {
	title: 'Components/Grid',
	component: GridComponent,
	decorators: [
		moduleMetadata({
			imports: [],
			declarations: [HeadingComponent, BodyTextComponent],
		}),
		componentWrapperDecorator(
			(story) => `
			<style>
			.grid-test-item{
				border: 3px solid cornflowerblue;
			}
			</style>
			<div style="border: 3px solid orangered">	
		${story}
		</div>`
		),
	],
	argTypes: {
		columns: {
			options: ['1fr 3fr', '1fr 1fr', '5fr 1fr'],
			control: { type: 'select' },
		},
		align: {
			control: { type: 'select' },
		},
		marginTop: {
			control: { type: 'select' },
		},
		marginBottom: {
			control: { type: 'select' },
		},
	},
	parameters: {
		controls: {
			exclude: [
				'columnsToApply',
				'fakeGridArray',
				'ngOnInit',
				'breakpointObserver',
				'columnsFromInput',
				'gridWidths',
				'gridWidthsArray',
			],
		},
	},
} as Meta;

const html = String.raw;

const Template: Story<GridComponent> = (args: GridComponent) => ({
	template: html`<fudis-grid
		[columns]="columns"
		[columnsXs]="columnsXs"
		[columnsS]="columnsS"
		[columnsM]="columnsM"
		[columnsL]="columnsL"
		[columnsXl]="columnsXl"
		[columnsXxl]="columnsXxl"
		[align]="align"
		[alignItemsX]="alignItemsX"
		[alignItemsY]="alignItemsY"
		[marginTop]="marginTop"
		[marginBottom]="marginBottom"
		[width]="width">
		<fudis-heading
			class="grid-test-item"
			tag="h1"
			size="l"
			text="Headings will always take 100% width if they are direct child of Fudis grid component"></fudis-heading>
		<fudis-heading
			class="grid-test-item"
			tag="h2"
			size="s"
			text="If you change any of the column size values from the controls, please refresh the page  for ngMaterial's Breakpoint Observer to register the new values!"></fudis-heading>

		<div class="grid-test-item">
			<fudis-heading tag="h3" size="m" text="This heading is inside a div"></fudis-heading>
			<fudis-body-text>Current value of grid-template-columns: {{columns}}</fudis-body-text>
		</div>
		<div class="grid-test-item">
			<fudis-heading tag="h3" size="m" text="This heading is inside a div"></fudis-heading>
			<fudis-body-text>Current value of grid-template-columns: {{columns}}</fudis-body-text>
		</div>
		<div class="grid-test-item">
			<fudis-heading tag="h3" size="m" text="This heading is inside a div"></fudis-heading>
			<fudis-body-text>Current value of grid-template-columns: {{columns}}</fudis-body-text>
		</div>
		<div class="grid-test-item">
			<fudis-heading tag="h3" size="m" text="This heading is inside a div"></fudis-heading>
			<fudis-body-text>Current value of grid-template-columns: {{columns}}</fudis-body-text>
		</div>
	</fudis-grid>`,
	props: args,
});

export const Example = Template.bind({});
Example.args = {};
