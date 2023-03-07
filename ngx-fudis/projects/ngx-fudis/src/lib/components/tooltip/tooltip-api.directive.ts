import { Directive, Input } from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';

@Directive({
	selector: '[fudisTooltip]',
	exportAs: 'tooltip',
	providers: [MatTooltip],
})
export class TooltipApiDirective {
	tooltip: MatTooltip;

	/**
	 * Text placed on tooltip
	 */
	@Input() fudisTooltip: string;

	/**
	 * tooltipToggle set on true makes tooltip appear when toggled. Default behavior is triggered on focus. TooltipToggle feature is prefered to be used with icons.
	 */
	@Input() tooltipToggle: boolean = false;

	constructor(tooltip: MatTooltip) {
		this.tooltip = tooltip;
	}
}
