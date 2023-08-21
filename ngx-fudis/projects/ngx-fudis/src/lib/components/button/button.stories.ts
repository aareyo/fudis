// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { StoryFn, Meta } from '@storybook/angular';
import { ButtonComponent } from './button.component';
import readme from './readme.mdx';

export default {
	title: 'Components/Button',
	component: ButtonComponent,
	parameters: {
		docs: {
			page: readme,
		},
		controls: {
			exclude: ['_iconColor', '_classList', 'getClasses', 'ngOnChanges', 'getAriaLabel'],
		},
	},
	argTypes: {
		icon: {
			control: { type: 'text' },
		},
	},
} as Meta;

const html = String.raw;

const Template: StoryFn = (args) => ({
	props: args,
});

export const Button = Template.bind({});
Button.args = {
	variant: 'primary',
	label: 'Button',
};

export const IconButton = Template.bind({});
IconButton.args = {
	variant: 'secondary',
	label: 'Icon Button',
	icon: 'search',
};

export const OnlyIconButton = Template.bind({});
OnlyIconButton.args = {
	variant: 'secondary',
	icon: 'search',
	label: 'Search button',
	labelHidden: true,
};

export const AllVariants: StoryFn = () => ({
	template: html`
		<fudis-grid [marginBottom]="'md'" [columns]="4" [align]="'start'" rowGap="xs" marginBottom="md">
			<fudis-heading [level]="4" size="sm">Medium size buttons</fudis-heading>
			<fudis-button variant="primary" label="Primary"></fudis-button>
			<fudis-button variant="secondary" label="Secondary"></fudis-button>
			<fudis-button variant="tertiary" label="Tertiary"></fudis-button>
			<fudis-button label="Disabled" [disabled]="true"></fudis-button>
		</fudis-grid>
		<fudis-grid [marginBottom]="'md'" [columns]="4" [align]="'start'" rowGap="xs" marginBottom="md">
			<fudis-heading [level]="4" size="sm">Medium size buttons with icon</fudis-heading>
			<fudis-button variant="primary" icon="search" label="Primary"></fudis-button>
			<fudis-button variant="secondary" icon="search" label="Secondary"></fudis-button>
			<fudis-button variant="tertiary" icon="search" label="Tertiary"></fudis-button>
			<fudis-button label="Disabled" icon="search" [disabled]="true"></fudis-button>
		</fudis-grid>
		<fudis-grid [marginBottom]="'md'" [columns]="4" [align]="'start'" rowGap="xs" marginBottom="md">
			<fudis-heading [level]="4" size="sm">Small size buttons</fudis-heading>
			<fudis-button variant="primary" label="Primary" size="small"></fudis-button>
			<fudis-button variant="secondary" label="Secondary" size="small"></fudis-button>
			<fudis-button variant="tertiary" label="Tertiary" size="small"></fudis-button>
			<fudis-button label="Disabled" [disabled]="true" size="small"></fudis-button>
		</fudis-grid>

		<fudis-grid [marginBottom]="'md'" [columns]="4" [align]="'start'" rowGap="xs" marginBottom="md">
			<fudis-heading [level]="4" size="sm">Small size buttons with icons</fudis-heading>
			<fudis-button variant="primary" icon="search" label="Primary" size="small"></fudis-button>
			<fudis-button variant="secondary" icon="search" label="Secondary" size="small"></fudis-button>
			<fudis-button variant="tertiary" icon="search" label="Tertiary" size="small"></fudis-button>
			<fudis-button label="Disabled" icon="search" [disabled]="true" size="small"></fudis-button>
		</fudis-grid>

		<fudis-grid [marginBottom]="'md'" [columns]="4" [align]="'start'" rowGap="xs" marginBottom="md">
			<fudis-heading [level]="4" size="sm">Medium sized buttons with label hidden</fudis-heading>
			<fudis-button variant="primary" [labelHidden]="true" icon="search" label="Primary"></fudis-button>
			<fudis-button variant="secondary" [labelHidden]="true" icon="search" label="Secondary"></fudis-button>
			<fudis-button variant="tertiary" [labelHidden]="true" icon="search" label="Tertiary"></fudis-button>
			<fudis-button label="Disabled" [labelHidden]="true" icon="search" [disabled]="true"></fudis-button>
		</fudis-grid>

		<fudis-grid [marginBottom]="'md'" [columns]="4" [align]="'start'" rowGap="xs" marginBottom="md">
			<fudis-heading [level]="4" size="sm">Small sized buttons with label hidden</fudis-heading>
			<fudis-button variant="primary" [labelHidden]="true" icon="search" label="Primary" size="small"></fudis-button>
			<fudis-button
				variant="secondary"
				[labelHidden]="true"
				icon="search"
				label="Secondary"
				size="small"></fudis-button>
			<fudis-button variant="tertiary" [labelHidden]="true" icon="search" label="Tertiary" size="small"></fudis-button>
			<fudis-button label="Disabled" [labelHidden]="true" icon="search" [disabled]="true" size="small"></fudis-button>
		</fudis-grid>

		<fudis-grid [columns]="4" [align]="'start'" rowGap="xs" marginBottom="md">
			<fudis-heading [level]="4" size="sm">Icon only sized buttons with label hidden</fudis-heading>
			<fudis-button
				variant="primary"
				[labelHidden]="true"
				icon="search"
				label="Primary"
				size="icon-only"></fudis-button>
			<fudis-button
				variant="secondary"
				[labelHidden]="true"
				icon="search"
				label="Secondary"
				size="icon-only"></fudis-button>
			<fudis-button
				variant="tertiary"
				[labelHidden]="true"
				icon="search"
				label="Tertiary"
				size="icon-only"></fudis-button>
			<fudis-button
				label="Disabled"
				[labelHidden]="true"
				icon="search"
				[disabled]="true"
				size="icon-only"></fudis-button>
		</fudis-grid>
	`,
});
