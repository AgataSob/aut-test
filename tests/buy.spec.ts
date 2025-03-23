import { test, expect } from '@playwright/test';

class LoginPage {
  private page;

  constructor(page) {
    this.page = page;
  }

  async navigate() {
    await this.page.goto('https://www.saucedemo.com/');
  }

  async login(username: string, password: string) {
    await this.page.fill('#user-name', username);
    await this.page.fill('#password', password);
    await this.page.click('#login-button');
    await this.page.waitForLoadState('domcontentloaded');
  }
}

test.describe('Sprawdzanie przekierowań do mediów społecznościowych', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login('standard_user', 'secret_sauce'); // Wprowadzenie logowania
  });

  test('Przekierowanie do Twittera działa poprawnie', async ({ page }) => {
    const twitterLink = await page.locator('a[href="https://twitter.com/saucelabs"]');
    await twitterLink.click();
    await page.waitForLoadState('domcontentloaded');
    expect(page.url()).toBe('https://twitter.com/saucelabs'); // Poprawny oczekiwany wynik
  });

  test('Przekierowanie do Facebooka działa poprawnie', async ({ page }) => {
    const facebookLink = await page.locator('a[href="https://www.facebook.com/saucelabs"]');
    await facebookLink.click();
    await page.waitForLoadState('domcontentloaded');
    expect(page.url()).toBe('https://www.facebook.com/saucelabs'); // Poprawny oczekiwany wynik
  });

  test('Przekierowanie do LinkedIna działa poprawnie', async ({ page }) => {
    const linkedinLink = await page.locator('a[href="https://www.linkedin.com/company/sauce-labs/"]');
    await linkedinLink.click();
    await page.waitForLoadState('domcontentloaded');
    expect(page.url()).toBe('https://www.linkedin.com/company/sauce-labs/'); // Poprawny oczekiwany wynik
  });

});
