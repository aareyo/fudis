import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MockComponent } from 'ng-mocks';
import { CheckboxComponent } from './checkbox.component';
import { GuidanceComponent } from '../guidance/guidance.component';

const uncheckedCheckbox: FormControl = new FormControl('false');

describe('CheckboxComponent', () => {
	let component: CheckboxComponent;
	let fixture: ComponentFixture<CheckboxComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [CheckboxComponent, MockComponent(GuidanceComponent)],
			imports: [ReactiveFormsModule],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(CheckboxComponent);
		component = fixture.componentInstance;
		component.id = 'checkbox-test-id';
		component.control = uncheckedCheckbox;
		component.errorMessage = 'Error message to appear!';
		component.label = 'Please check me.';

		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
