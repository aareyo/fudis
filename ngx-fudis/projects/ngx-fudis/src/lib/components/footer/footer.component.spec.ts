import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { MockComponent } from 'ng-mocks';
import { By } from '@angular/platform-browser';
import { FooterComponent } from './footer.component';
import { GridComponent } from '../grid/grid/grid.component';
import { FudisGridService } from '../../directives/grid/grid-service/grid.service';
import {
	FooterContentLeftDirective,
	FooterContentRightDirective,
} from '../../directives/content-projection/content/content.directive';
import { GridItemComponent } from '../grid/grid-item/grid-item.component';
import { LinkComponent } from '../link/link.component';
import { IconComponent } from '../icon/icon.component';

@Component({
	selector: 'fudis-mock-footer',
	template: `<fudis-footer [logoAltText]="'Link to Funidata homepage'">
		<ng-template fudisFooterRight>
			<fudis-link [href]="'example.com'" [linkTitle]="'Tietosuojaseloste'" [isExternalLink]="true" />
			<fudis-link [href]="'example.com'" [linkTitle]="'Saavutettavuusseloste'" [isExternalLink]="true" />
			<fudis-link [href]="'example.com'" [linkTitle]="'Järjestelmätiedot'" />
		</ng-template>
		<ng-template fudisFooterLeft>
			<fudis-link [href]="'example.com'" [linkTitle]="'Promo link'" [isExternalLink]="true" />
		</ng-template>
	</fudis-footer>`,
})
class MockFooterComponent {}

describe('FooterComponent', () => {
	let component: MockFooterComponent;
	let fixture: ComponentFixture<MockFooterComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [
				FooterComponent,
				GridComponent,
				GridItemComponent,
				LinkComponent,
				FooterContentLeftDirective,
				FooterContentRightDirective,
				MockFooterComponent,
				MockComponent(IconComponent),
			],
			providers: [FudisGridService],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(MockFooterComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	function getFooterGridElem() {
		return fixture.debugElement.query(By.directive(GridComponent));
	}

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	describe('CSS classes', () => {
		it('should have fudis-footer class', () => {
			const elem = fixture.debugElement.query(By.css('.fudis-footer'));
			expect(elem.nativeElement.className).toEqual('fudis-footer');
		});
	});

	describe('Contents', () => {
		it('should have fudis-grid element present', () => {
			expect(getFooterGridElem()).toBeTruthy();
		});

		it('should have fudis-grid-item elements present', () => {
			expect(getFooterGridElem().nativeElement.children.length).toEqual(2);
		});

		describe('Footer right side', () => {
			it('should have three child elements', () => {
				expect(getFooterGridElem().nativeElement.children[1].children.length).toEqual(3);
			});
		});

		describe('Footer left side', () => {
			it('should have two child elements', () => {
				expect(getFooterGridElem().nativeElement.children[0].children.length).toEqual(2);
			});

			it('should have Funidata logo visible', () => {
				const firstGridItemElem = getFooterGridElem().nativeElement.children[0];
				const anchorElem = firstGridItemElem.querySelector('.fudis-footer__item__logo');
				expect(anchorElem.children.length).toEqual(1);
			});
		});
	});
});
