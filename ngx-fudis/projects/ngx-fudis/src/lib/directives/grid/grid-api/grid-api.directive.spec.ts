import { TestBed } from '@angular/core/testing';
import { GridApiDirective } from './grid-api.directive';

describe('GridApiDirective', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [],
			providers: [],
		});
	});

	it('should create an instance', () => {
		const directive = new GridApiDirective();

		expect(directive).toBeTruthy();
	});
});
