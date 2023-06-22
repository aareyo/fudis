import { Directive, Input, TemplateRef } from '@angular/core';

/**
 * A marker directive used to tag the for action buttons that will be rendered inside of components. Used in e. g. `ExpandableComponent` and 'Form'.
 */

@Directive({ selector: '[fudisActions]' })
export class ActionsDirective {
	constructor(public templateRef: TemplateRef<unknown>) {}

	/**
	 * To component type to protect wrong content projection to nested components
	 */
	@Input({ required: true }) type: 'fieldset' | 'expandable' | 'form';

	/**
	 * Alignment of actions container, used in Fieldset Component
	 */
	@Input() align: 'bottom' | 'end' | 'start' = 'start';
}