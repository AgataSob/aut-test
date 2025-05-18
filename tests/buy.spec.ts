import { test, expect } from '@playwright/test';

class LoginPage {
  private page;

  constructor(page) {
    this.page = page;
  }

  async navigate() {
    await this.page.goto('/');
  }

  async login(username: string, password: string) {
    await this.page.fill('#user-name', username);
    await this.page.fill('#password', password);
    await this.page.click('#login-button');
    await this.page.waitForLoadState('domcontentloaded');
  }
}


import ProductPage from '../pages/ProductPage';
import CheckoutPage from '../pages/CheckoutPage';

test('login test', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const productPage = new ProductPage(page);
  const checkoutPage = new CheckoutPage(page);

  await loginPage.navigate();
  await loginPage.login('standard_user', 'secret_sauce');

  await productPage.addToCart();
  await productPage.goToCart();
  await productPage.checkout();

  await checkoutPage.fillCheckoutDetails('Agata', 'XXX', '45-404');
  await checkoutPage.continueCheckout();
  await checkoutPage.finishCheckout();

  await expect(page).toHaveURL('https://www.saucedemo.com/checkout-complete.html');
  await page.close();
});