import { Page } from '@playwright/test';

class ProductPage {
  private page: Page;
  private addToCartButtonSelector = '[data-test="add-to-cart-sauce-labs-backpack"]';
  private cartLinkSelector = '[data-test="shopping-cart-link"]';
  private checkoutButtonSelector = '[data-test="checkout"]';

  constructor(page: Page) {
    this.page = page;
  }

  async addToCart() {
    await this.page.locator(this.addToCartButtonSelector).click();
  }

  async goToCart() {
    await this.page.locator(this.cartLinkSelector).click();
  }

  async checkout() {
    await this.page.locator(this.checkoutButtonSelector).click();
  }
}

export default ProductPage;
