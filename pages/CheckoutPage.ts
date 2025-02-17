import { Page } from '@playwright/test';

class CheckoutPage {
  private page: Page;
  private firstNameSelector = '[data-test="firstName"]';
  private lastNameSelector = '[data-test="lastName"]';
  private postalCodeSelector = '[data-test="postalCode"]';
  private continueButtonSelector = '[data-test="continue"]';
  private finishButtonSelector = '[data-test="finish"]';

  constructor(page: Page) {
    this.page = page;
  }

  async fillCheckoutDetails(firstName: string, lastName: string, postalCode: string) {
    await this.page.locator(this.firstNameSelector).fill(firstName);
    await this.page.locator(this.lastNameSelector).fill(lastName);
    await this.page.locator(this.postalCodeSelector).fill(postalCode);
  }

  async continueCheckout() {
    await this.page.locator(this.continueButtonSelector).click();
  }

  async finishCheckout() {
    await this.page.locator(this.finishButtonSelector).click();
  }
}

export default CheckoutPage;
