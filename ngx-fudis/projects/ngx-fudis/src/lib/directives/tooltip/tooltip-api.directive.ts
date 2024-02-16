import { Directive, Input } from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';
import { FudisTooltipPosition } from '../../types/miscellaneous';

@Directive({
  selector: '[fudisTooltipApi]',
  providers: [MatTooltip],
})
export class TooltipApiDirective {
  /**
   * Text placed inside tooltip
   */
  @Input() tooltip: string | undefined;

  /**
   * Trigger tooltip on click
   */
  @Input() tooltipToggle = false;

  /**
   * Position of the tooltip on the parent element
   */
  @Input() tooltipPosition: FudisTooltipPosition = 'below';
}
