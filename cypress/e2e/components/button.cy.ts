import { fudisScreenshots, fudisScreenshotInit } from "../../utilities/utility";

describe("Button screenshot", () => {
  it("should match with previous screenshot", () => {
    cy.visit("/iframe.html?args=&id=components-button--all-variants&viewMode=story");
    fudisScreenshotInit();
    fudisScreenshots();
  });
});
