import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BodyTextComponent } from './body-text.component';
import { BodyTextSize, MarginBottomSize } from '../../../types/typography';

describe('BodyTextComponent', () => {
	let component: BodyTextComponent;
	let fixture: ComponentFixture<BodyTextComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [BodyTextComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(BodyTextComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	function assertBodyTextHasClasses(classes: string): void {
		const childSpan = fixture.nativeElement.childNodes;
		const componentClasses = childSpan[0].className.split(' ').sort();
		expect(componentClasses).toEqual(classes.split(' ').sort());
	}

	function bodyTextSizes(size: BodyTextSize): void {
		component.size = size;
		fixture.detectChanges();
		assertBodyTextHasClasses(`fudis-body-text fudis-body-text__${size} fudis-body-text__margin-bottom__none`);
	}

	function marginBottomSizes(marginBottom: MarginBottomSize): void {
		component.marginBottom = marginBottom;
		fixture.detectChanges();
		assertBodyTextHasClasses(
			`fudis-body-text fudis-body-text__m-regular fudis-body-text__margin-bottom__${marginBottom}`
		);
	}

	describe('CSS classes', () => {
		it('should change the class according to the given body text size', () => {
			bodyTextSizes('l-regular');
			bodyTextSizes('m-regular');
			bodyTextSizes('s-regular');
			bodyTextSizes('l-light');
			bodyTextSizes('m-light');
		});

		it('should change the class according to the given margin bottom value', () => {
			marginBottomSizes('m');
			marginBottomSizes('l');
			marginBottomSizes('none');
		});
	});
});
