import { expect } from '@playwright/test'
import {
  inventoryItem,
  addToCartBtn,
  cartBadge,
} from '../selectors/dashboardSelector'

export class Dashboard {
  constructor(page) {
    this.page = page
  }
  async getInventoryList() {
    return await this.page.locator(inventoryItem).count()
  }

  async verifyAddToCart() {
    await this.page.getByText(addToCartBtn).nth(1).click()
    await expect(this.page.locator(cartBadge)).toContainText('1')
  }

  async verifyNumberAtCart() {
    await this.page.getByText(addToCartBtn).nth(1).click()
    await this.page.getByText(addToCartBtn).nth(2).click()
    await expect(this.page.locator(cartBadge)).toContainText('2')
  }
}
