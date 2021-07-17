import puppeteer, { Page, Browser } from 'puppeteer';
import { ProductRouteConst } from '../../src/constants/route.const';
import { GENDER } from '../../src/models/common.model';

// TODO env config
const host = 'http://localhost:3000';

describe('test-get-product', () => {
  let page: Page;
  let browser: Browser;
  beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
  });
  afterAll(async () => {
    await browser.close();
  });
  beforeEach(async () => {
    await page.goto(`${host}${ProductRouteConst.GET_PRODUCT}`);
  });
  it('test-mandatory-field', async () => {
    await page.click('button[type="submit"]');
    const genderFieldError = await page.$(
      '[data-puppeteer-id="gender-error-id"]',
    );
    expect(!!genderFieldError).toBe(true);
    const planFieldError = await page.$('[data-puppeteer-id="plan-error-id"]');
    expect(!!planFieldError).toBe(true);
  });
  it('test-success-calculate', async () => {
    await page.click(`[value="${GENDER.MALE}"]`);
    await page.click(`[value="T11AM1"]`);
    await page.focus(`[name="premiumPerYear"]`);
    await page.keyboard.type('12345');
    await page.click('button[type="submit"]');
    await page.waitForNavigation();
    expect(page.url()).toBe(`${host}${ProductRouteConst.VIEW_PRODUCT}`);
  });
  it('test-success-calculate-with-sum-assured', async () => {
    await page.click(`[value="${GENDER.MALE}"]`);
    await page.click(`[value="T11AM1"]`);
    await page.focus(`[name="premiumPerYear"]`);
    await page.keyboard.type('12345');
    await page.focus(`[name="saPerYear"]`);
    await page.keyboard.type('12345');
    await page.click('button[type="submit"]');
    await page.waitForNavigation();
    expect(page.url()).toBe(`${host}${ProductRouteConst.VIEW_PRODUCT}`);
  });
});
