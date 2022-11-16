import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'fds-button',
	templateUrl: './button.component.html',
	styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
	/**
	 * Button variant options
	 */
	@Input() variant: 'primary' | 'secondary' | 'tertiary' | 'text-only' = 'primary';

	/**
	 * Button size and type options
	 */
	@Input() size: 'small' | 'medium' | 'large' = 'medium';

	@Input() type: 'button' | 'submit' = 'button';

	/**
	 * Button contents
	 */
	@Input() label: string = 'Meidän nappi';

	@Input() ariaLabel: string;

	/**
	 * Button modifiers
	 */
	@Input() disabled = false;

	/**
	 * Optional click handler
	 */
	@Output()
	handleClick = new EventEmitter<Event>();

	public get classes(): string[] {
		return ['fds-button', `fds-button__${this.size}`, `fds-button__${this.variant}`];
	}
}
