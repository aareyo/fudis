import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UntypedFormControl } from '@angular/forms';
import { RadioButtonComponent } from './radio-button.component';

const lonelyFormControl = new UntypedFormControl();

describe('RadioButtonComponent', () => {
	let component: RadioButtonComponent;
	let fixture: ComponentFixture<RadioButtonComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [RadioButtonComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(RadioButtonComponent);
		component = fixture.componentInstance;
		component.label = 'Lonely radio button';
		component.value = 'lonely';
		component.control = lonelyFormControl;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
