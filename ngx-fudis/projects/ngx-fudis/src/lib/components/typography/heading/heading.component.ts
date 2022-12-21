import { Component, Input, HostBinding } from '@angular/core';

type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
type HeadingSize = 'xxs' | 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl';

@Component({
	selector: 'fudis-heading',
	templateUrl: './heading.component.html',
	styleUrls: ['./heading.component.scss'],
})
export class HeadingComponent {
	@HostBinding('class') mainClass = 'fudis-heading';

	@Input() size: HeadingSize;

	@Input() text: string;

	@Input() tag: HeadingLevel;

	@Input() className: string;

	public get classes(): string[] {
		return [`fudis-heading__${this.size}`];
	}
}