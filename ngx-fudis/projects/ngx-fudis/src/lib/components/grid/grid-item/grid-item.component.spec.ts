import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridItemComponent } from './grid-item.component';
import { GridService } from '../../../directives/grid/grid-service/grid.service';

describe('GridItemComponent', () => {
	let component: GridItemComponent;
	let fixture: ComponentFixture<GridItemComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [GridItemComponent],
			providers: [GridService],
		});
		fixture = TestBed.createComponent(GridItemComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});