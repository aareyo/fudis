import { StoryFn, Meta } from '@storybook/angular';

import { DescriptionListComponent } from './description-list.component';
import readme from './readme.mdx';

const html = String.raw;

const commonExclude = [
	'ngOnInit',
	'ngOnChanges',
	'setColumns',
	'getClasses',
	'_classList',
	'align',
	'alignItemsX',
	'alignItemsY',
	'classes',
	'columnGap',
	'columns',
	'ignoreDefaults',
	'marginBottom',
	'marginSides',
	'marginTop',
	'rowGap',
	'width',
];

export default {
	title: 'Components/Description List',
	component: DescriptionListComponent,
	parameters: {
		docs: {
			page: readme,
		},
		controls: {
			exclude: commonExclude,
		},
	},
} as Meta;

const testData = [
	{ key: 'First Name', value: 'Rex' },
	{ key: 'Last Name', value: 'Dangerwest' },
	{ key: 'Alias', value: 'Radical Emmet Xtreme' },
	{ key: 'Voice actor', value: 'Chris Pratt' },
	{ key: 'Favorite animal', value: 'Velociraptor', subHeading: 'Dinosaurus' },
	{ key: 'Real name', value: 'Emmet Joseph Brickowski' },
	{ key: 'Species', value: 'Lego' },
	{ key: 'Enemy', value: 'Emmet Brickowski', subHeading: 'Archenemy' },
	{ key: 'Enemy', value: 'Lucy', subHeading: 'Second Archenemy' },
];

const testDataCompact = [
	{ key: 'First Name', value: 'Rex' },
	{ key: 'Last Name', value: 'Dangerwest' },
	{ key: 'Alias', value: 'Radical Emmet Xtreme' },
	{ key: 'Voice actor', value: 'Chris Pratt' },
	{ key: 'Favorite animal', value: 'Velociraptor', subHeading: 'Dinosaurus' },
	{ key: 'Real name', value: 'Emmet Joseph Brickowski' },
	{ key: 'Species', value: 'Lego' },
	{ key: 'Enemy', value: 'Emmet Brickowski' },
	{ key: 'Enemy', value: 'Lucy' },
];

const lonelyDataItem = [{ key: 'Vastuuopettajan sähköposti', value: 'olli@ope.com', subHeading: 'Olli Opettaja' }];

const DescriptionListTemplate: StoryFn<DescriptionListComponent> = (args: DescriptionListComponent) => ({
	props: args,
	template: html`<fudis-description-list [variant]="variant" [marginBottom]="'md'" [disableGrid]="disableGrid">
		<fudis-description-list-item *ngFor="let item of data">
			<fudis-dt>{{item.key}}</fudis-dt>
			<fudis-dd [subHeading]="item.subHeading">{{item.value}} </fudis-dd>
		</fudis-description-list-item>
	</fudis-description-list>`,
});

export const DescriptionList = DescriptionListTemplate.bind({});
DescriptionList.args = {
	data: testDataCompact,
	variant: 'compact',
	disableGrid: false,
};

const DescriptionListDataLoopTemplate: StoryFn<DescriptionListComponent> = (args: DescriptionListComponent) => ({
	props: args,
	template: html`<fudis-heading [level]="2" size="md"> Description List Regular With Data Looping</fudis-heading>
		<fudis-description-list [data]="data" [marginBottom]="'md'" [variant]="variant" [disableGrid]="disableGrid" />`,
});

export const DescriptionListDataLoop = DescriptionListDataLoopTemplate.bind({});
DescriptionListDataLoop.args = {
	data: testData,
	variant: 'compact',
	disableGrid: false,
};

const TemplateWithDl: StoryFn = () => ({
	template: html`<fudis-grid [columns]="columns">
		<fudis-heading [level]="2" size="md">This is Fudis Grid where DL is used as child component</fudis-heading>
		<fudis-dl [disableGrid]="true" [data]="lonelyDataItem" />
		<fudis-body-text
			>Item next to this Body Text is a lonely Description List component with only one list item. This and DL item are
			both inside a Fudis Grid.</fudis-body-text
		>
	</fudis-grid>`,
	props: {
		testData,
		lonelyDataItem,
		columns: '1fr 1fr',
	},
});

export const DescriptionListItemInsideGrid = TemplateWithDl.bind({});
DescriptionListItemInsideGrid.parameters = {
	controls: {
		exclude: /.*/g,
	},
};

const DescriptionListWithSubComponentsTemplate: StoryFn<DescriptionListComponent> = (
	args: DescriptionListComponent
) => ({
	props: args,
	template: html`<fudis-heading [level]="2" size="md">Description list built with sub components</fudis-heading>
		<fudis-description-list [marginBottom]="'md'" [disableGrid]="disableGrid" [variant]="variant">
			<fudis-description-list-item *ngFor="let item of data; let i = index">
				<fudis-dt>{{item.key}}</fudis-dt>
				<fudis-dd [subHeading]="item.subHeading"
					>{{item.value}}
					<ng-container *ngIf="i === 1 || i === 4">
						<ng-template fudisActions type="dd">
							<fudis-button [label]="'Click!'" [variant]="'tertiary'" [size]="'small'" [icon]="'edit'" />
						</ng-template>
					</ng-container>
				</fudis-dd>
			</fudis-description-list-item>
		</fudis-description-list> `,
});

export const DescriptionListWithSubComponents = DescriptionListWithSubComponentsTemplate.bind({});
DescriptionListWithSubComponents.args = {
	data: testData,
	disableGrid: false,
	variant: 'regular',
};
