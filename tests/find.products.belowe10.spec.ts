import { test, expect } from '@playwright/test';
import LoginPage from '../pages/LoginPages';

test('count products under $10', async ({ page }) => {
  // Przejdź na stronę sklepu
  await page.goto('/');

  // Zaloguj się
  const loginPage = new LoginPage(page);
  await loginPage.navigate();
  await loginPage.login('standard_user', 'secret_sauce');

  // Pobierz listę produktów wraz z ich cenami i nazwami
  const products = await page.$$eval('.inventory_item', elements =>
    elements.map(element => ({
      name: element.querySelector('.inventory_item_name')?.textContent.trim(),
      price: parseFloat(element.querySelector('.inventory_item_price')?.textContent.replace('$', '').trim())
    }))
  );

  // Filtruj produkty poniżej $10
  const productsUnder10 = products.filter(product => product.price < 10);

  // Wypisz liczbę produktów na konsoli
  console.log(`Liczba produktów poniżej $10: ${productsUnder10.length}`);

  // Wypisz nazwy produktów poniżej $10
  if (productsUnder10.length > 0) {
    console.log('Produkty poniżej $10:');
    productsUnder10.forEach(product => console.log(`- ${product.name} ($${product.price})`));
  } else {
    console.log('Brak produktów poniżej $10.');
  }

  // Asercja Playwright - upewnij się, że są jakieś produkty poniżej 10$
  expect(productsUnder10.length).toBeGreaterThan(0);
});
