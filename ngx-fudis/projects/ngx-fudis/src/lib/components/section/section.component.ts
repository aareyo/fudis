import { Component, ContentChild, Input, OnChanges, OnInit } from '@angular/core';
import { IdService } from '../../utilities/id-service.service';
import { FudisHeadingTag, FudisHeadingSize } from '../../types/typography';
import { NotificationsDirective } from '../../directives/content-projection/notifications/notifications.directive';
import { ContentDirective } from '../../directives/content-projection/content/content.directive';
import { GridWidth, GridAlign, GridMarginSide } from '../../types/grid';
import { FudisSpacing } from '../../types/spacing';
import { TooltipApiDirective } from '../../directives/tooltip/tooltip-api.directive';

@Component({
	selector: 'fudis-section',
	templateUrl: './section.component.html',
	styleUrls: ['./section.component.scss'],
})
export class SectionComponent extends TooltipApiDirective implements OnInit, OnChanges {
	@ContentChild(NotificationsDirective) notifications: NotificationsDirective | null;

	@ContentChild(ContentDirective) content: ContentDirective | null;

	@Input() id: string;

	@Input({ required: true }) title: string;

	@Input() titleTag: FudisHeadingTag = 'h2';

	@Input() titleSize: FudisHeadingSize = 'lg';

	/**
	 * Maximum width of Grid. When viewport gets narrower, grid automatically adjusts to lower sizes.
	 * xxl = Default value. Viewports of 1600px and larger
	 * xl = Viewports smaller than 1600px
	 * lg = Viewports smaller than 1200px
	 * md = Viewports smaller than 992px
	 * sm = Viewports smaller than 768px
	 * xs = Viewports smaller than 576px
	 */
	@Input() width: GridWidth = 'initial';

	/**
	 * Alignment of Grid component inside its parent
	 */
	@Input() align: GridAlign = 'center';

	/**
	 * Margin top for the Grid
	 */
	@Input() marginTop: FudisSpacing = 'none';

	/**
	 * Margin bottom for the Grid
	 */
	@Input() marginBottom: FudisSpacing = 'none';

	/**
	 * Horizontal margins left and right of the grid
	 */
	@Input() marginSides: GridMarginSide = 'none';

	/**
	 * Custom CSS classes for Grid element
	 */
	@Input() classes: string[];

	constructor(private _idService: IdService) {
		super();
	}

	protected _headingId: string;

	protected _classList: string[];

	ngOnInit(): void {
		this._headingId = this.id ?? this._idService.getNewId('section');

		this._classList = this.getClasses();
	}

	private getClasses(): string[] {
		const cssClasses = this.classes ?? [];

		cssClasses.push('fudis-section');

		return cssClasses;
	}

	ngOnChanges(): void {
		this._classList = this.getClasses();
	}
}