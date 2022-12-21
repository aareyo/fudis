import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeadingComponent } from './heading.component';

describe('HeadingComponent', () => {
	let component: HeadingComponent;
	let fixture: ComponentFixture<HeadingComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [HeadingComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(HeadingComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	function getHeading(): HTMLElement {
		return fixture.nativeElement.querySelector('.fudis-heading__s') as HTMLElement;
	}

	function assertHeadingHasClasses(...classes: string[]): void {
		const headingClasses = getHeading()?.className ?? '';
		expect(headingClasses.split(' ').sort()).toEqual([...classes].sort());
	}

	function assertHeadingHasTag(tag: string): void {
		const Tag = fixture.nativeElement.querySelector(tag);
		expect(Tag).toBeTruthy();
	}

	describe('heading has CSS classes and prefered heading tag', () => {
		it('should add size s to header', () => {
			component.size = 's';
			fixture.detectChanges();
			assertHeadingHasClasses('fudis-heading__s');
		});

		it('should add tags to header', () => {
			const headingLevel = 'h3';
			component.tag = headingLevel;
			fixture.detectChanges();
			assertHeadingHasTag(headingLevel);
		});
	});
});