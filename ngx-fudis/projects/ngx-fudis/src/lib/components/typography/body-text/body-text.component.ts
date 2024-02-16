import {
  Component,
  Input,
  HostBinding,
  ViewEncapsulation,
  ChangeDetectionStrategy,
} from '@angular/core';
import { FudisBodyText } from '../../../types/typography';
import { FudisTextAlign } from '../../../types/miscellaneous';

@Component({
  selector: 'fudis-body-text',
  templateUrl: './body-text.component.html',
  styleUrls: ['./body-text.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BodyTextComponent {
  /**
   * Class for the parent wrapper element
   */
  @HostBinding('class') classes = 'fudis-body-text-host';

  /**
   * Font size for the paragraph
   */
  @Input() size: FudisBodyText = 'md-regular';

  /**
   * Option to change text color if background is not compatible with dark text
   */
  @Input() color: 'default' | 'white' = 'default';

  /**
   * Align Body Text
   */
  @Input() align: FudisTextAlign = 'left';

  //TODO: Enable Input spacing for marginBottom
}
