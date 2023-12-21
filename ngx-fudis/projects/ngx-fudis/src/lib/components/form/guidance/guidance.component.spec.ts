import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl } from '@angular/forms';

import { MockComponent } from 'ng-mocks';
import { GuidanceComponent } from './guidance.component';
import { FudisInternalErrorSummaryService } from '../../../services/form/error-summary/internal-error-summary.service';
import { ValidatorErrorMessageComponent } from '../error-message/validator-error-message/validator-error-message.component';

const testControl = new FormControl('');

describe('GuidanceComponent', () => {
	let component: GuidanceComponent;
	let fixture: ComponentFixture<GuidanceComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [GuidanceComponent, MockComponent(ValidatorErrorMessageComponent)],
			providers: [FudisInternalErrorSummaryService],
		}).compileComponents();

		fixture = TestBed.createComponent(GuidanceComponent);
		component = fixture.componentInstance;
		component.control = testControl;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
