import { test, expect } from '@playwright/test';
import LoginPage from '../pages/LoginPages';
import ProductPage from '../pages/ProductPage';
import CheckoutPage from '../pages/CheckoutPage';

test.describe('Price Sorting on E-commerce Website', () => {
  test.beforeEach(async ({ page }) => {
    // Przejdź na stronę sklepu internetowego
    await page.goto('/');
    const loginPage = new LoginPage(page);
    const productPage = new ProductPage(page);
    const checkoutPage = new CheckoutPage(page);
  
    await loginPage.navigate();
    await loginPage.login('standard_user', 'secret_sauce');
  });

  test('products are sorted by lowest price', async ({ page }) => {
    // Wybierz filtr "Price (low to high)"
    await page.selectOption('.product_sort_container', 'lohi');

    // Pobierz listę cen produktów
    const prices = await page.$$eval('.inventory_item_price', elements =>
      elements.map(element => parseFloat(element.textContent.replace('$', '').trim()))
    );

    // Wypisz oryginalną listę cen na konsoli
    console.log('Oryginalna lista cen:', prices);

    // Skopiuj listę cen i posortuj ją od najniższej do najwyższej
    const sortedPrices = [...prices].sort((a, b) => a - b);

    // Wypisz posortowaną listę cen na konsoli
    console.log('Posortowana lista cen:', sortedPrices);

    // Porównaj oryginalną listę z posortowaną i wypisz wynik na konsoli
    if (JSON.stringify(prices) === JSON.stringify(sortedPrices)) {
      console.log('Produkty są poprawnie posortowane według najniższej ceny.');
    } else {
      console.log('Produkty NIE są poprawnie posortowane według najniższej ceny.');
    }

    // Asercja Playwright
    expect(prices).toEqual(sortedPrices);
  });
});
