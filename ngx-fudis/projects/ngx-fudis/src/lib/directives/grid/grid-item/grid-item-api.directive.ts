import { Directive, Input } from '@angular/core';

type GridItemAlignment = 'start' | 'end' | 'center' | 'strecth';

@Directive({
	selector: '[fudisGridItemApi]',
})
export class GridItemApiDirective {
	@Input() gridColumn: string;

	@Input() gridRow: string;

	@Input() alignX: GridItemAlignment = 'strecth';

	@Input() alignY: GridItemAlignment = 'strecth';
}
