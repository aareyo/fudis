import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, UntypedFormControl } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MockComponent } from 'ng-mocks';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DropdownComponent } from './dropdown.component';
import { LabelComponent } from '../label/label.component';
import { ErrorMessageComponent } from '../error-message/error-message.component';

const dropdownControl: UntypedFormControl = new UntypedFormControl('');

describe('DropdownComponent', () => {
	let component: DropdownComponent;
	let fixture: ComponentFixture<DropdownComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [DropdownComponent, MockComponent(ErrorMessageComponent), MockComponent(LabelComponent)],
			imports: [ReactiveFormsModule, MatFormFieldModule, MatSelectModule, BrowserAnimationsModule],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(DropdownComponent);
		component = fixture.componentInstance;
		component.label = 'Label for testing purposes';
		component.control = dropdownControl;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
