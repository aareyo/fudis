import { fudisScreenshots, fudisScreenshotInits,  FudisScreenshotTestConfig} from './utilities/utility';

describe('Footer screenshot', () => {
	it('should match with previous screenshot', () => {
		cy.visit('/iframe.html?args=&id=components-footer--footer&viewMode=story');
		fudisScreenshotInits();
		fudisScreenshots();
	});
});
