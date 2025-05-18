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
    await loginPage.login('standard_user', 'secret_sauce');
  });

  test('Przekierowanie do Twittera działa poprawnie', async ({ page, context }) => {
    const twitterLink = await page.locator('a[href="https://twitter.com/saucelabs"]');
    const [newPage] = await Promise.all([
      context.waitForEvent('page'), // Oczekuje na otwarcie nowej zakładki
      twitterLink.click()
    ]);
    await newPage.waitForLoadState('domcontentloaded');
    expect(newPage.url()).toBe('https://x.com/saucelabs'); // Sprawdzanie URL nowej zakładki
  });

  test('Przekierowanie do Facebooka działa poprawnie', async ({ page, context }) => {
    const facebookLink = await page.locator('a[href="https://www.facebook.com/saucelabs"]');
    const [newPage] = await Promise.all([
      context.waitForEvent('page'), // Oczekuje na otwarcie nowej zakładki
      facebookLink.click()
    ]);
    await newPage.waitForLoadState('domcontentloaded');
    expect(newPage.url()).toBe('https://www.facebook.com/saucelabs');
  });

  test('Przekierowanie do LinkedIna działa poprawnie', async ({ page, context }) => {
    const linkedinLink = await page.locator('a[href="https://www.linkedin.com/company/sauce-labs/"]');
    const [newPage] = await Promise.all([
      context.waitForEvent('page'), // Oczekuje na otwarcie nowej zakładki
      linkedinLink.click()
    ]);
    await newPage.waitForLoadState('domcontentloaded');
    expect(newPage.url()).toBe('https://www.linkedin.com/company/sauce-labs/');
    await newPage.close();
await page.close()
  });

});
