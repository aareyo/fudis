import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorMessageComponent } from './error-message.component';
import { ErrorSummaryService } from '../error-summary/error-summary.service';

describe('ErrorMessageComponent', () => {
	let component: ErrorMessageComponent;
	let fixture: ComponentFixture<ErrorMessageComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ErrorMessageComponent],
			providers: [ErrorSummaryService],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ErrorMessageComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
