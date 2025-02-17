import { test, expect } from '@playwright/test';
import LoginPage from '../pages/LoginPages';
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

