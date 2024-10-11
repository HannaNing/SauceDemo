import { expect } from '@playwright/test'
import {
  usernameSelector,
  passwordSelector,
  loginBtn,
  errorMessage,
  requireErrorMesssage,
} from '../selectors/loginSelectors'

export class LoginPage {
  constructor(page) {
    this.page = page
  }

  async goToBasePage() {
    await this.page.goto('https://www.saucedemo.com/', { waitUntil: 'load' })
  }

  async login(username, password) {
    await this.page.locator(usernameSelector).fill(username)
    await this.page.locator(passwordSelector).fill(password)
    await this.page.locator(loginBtn).click({ waitUntil: 'load' })
    await this.page.waitForLoadState('load')
  }

  async verifyLoginErrorMessage(message) {
    console.log(this.page.getByText(errorMessage))
    await expect(this.page.getByText(errorMessage)).toHaveText(message)
  }

  async verifyLoginSuccessfully() {
    await expect(this.page).toHaveURL(
      'https://www.saucedemo.com/inventory.html'
    )
  }

  async verifyLeaveBlankUsernamePassword(message) {
    await expect(this.page.getByText(requireErrorMesssage)).toHaveText(message)
  }
}
