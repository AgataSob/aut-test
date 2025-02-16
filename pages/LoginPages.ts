// LoginPage.ts

import { Page } from '@playwright/test';

class LoginPage {
  private page: Page;
  private usernameLocator;
  private passwordLocator;
  private loginButtonLocator;

  constructor(page: Page) {
    this.page = page;
    this.usernameLocator = page.locator('[data-test="username"]');
    this.passwordLocator = page.locator('[data-test="password"]');
    this.loginButtonLocator = page.locator('[data-test="login-button"]');
  }

  async navigate() {
    await this.page.goto('/');
  }

  async login(username: string, password: string) {
    await this.usernameLocator.click();
    await this.usernameLocator.fill(username);
    await this.passwordLocator.click();
    await this.passwordLocator.fill(password);
    await this.loginButtonLocator.click();
  }
}

export default LoginPage;
