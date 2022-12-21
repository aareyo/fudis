import { Story, Meta } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VanillaTextAreaComponent } from './vanilla-text-area.component';

export default {
	title: 'Components/Form/VanillaTextArea',
	component: VanillaTextAreaComponent,
	decorators: [
		moduleMetadata({
			imports: [BrowserAnimationsModule, ReactiveFormsModule, FormsModule],
		}),
	],
	argTypes: {},
} as Meta;

const Template: Story<VanillaTextAreaComponent> = (args: VanillaTextAreaComponent) => ({
	props: args,
});

export const VanillaTextArea = Template.bind({});
VanillaTextArea.args = {
	label: 'This is the label',
};

export const WithMultipleVanillaTextArea: Story = () => ({
	template: `
		<form lang="fi" id="form1" ngNativeValidate style="display:flex; width: 30rem; max-width: 90vw;flex-direction:column; border: 2px solid orangered; align-items: flex-start;"> 
			<fudis-vanilla-text-area [required]="true" label="Pakollinen textarea kenttä, size S" helpText="Pakollisen kentän helpperiteksti" size="s"></fudis-vanilla-text-area>	
			<fudis-vanilla-text-area [required]="true" label="Pakollinen kenttä, size M" size="m"></fudis-vanilla-text-area>	
			<fudis-vanilla-text-area label="Ei-pakollinen tekstikenttä merkkirajauksella, size L" [maxLength]="20"></fudis-vanilla-text-area>				
			<button type="submit" form="form1" value="Submit">Submit</button>
		</form>
	`,
});
