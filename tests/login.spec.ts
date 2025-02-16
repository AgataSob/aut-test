import { test, expect } from '@playwright/test';
import LoginPage from '../pages/LoginPages';

test('login test', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigate();
  await loginPage.login('standard_user', 'secret_sauce');

  // Asercja sprawdzająca URL lub 
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
});
