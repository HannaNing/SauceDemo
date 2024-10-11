import { expect } from '@playwright/test'
import { addToCartBtn, cartBadge } from '../selectors/dashboardSelector'
import { cartIcon, removeItemBtn } from '../selectors/cartSelectors'

export class CartPage {
  constructor(page) {
    this.page = page
  }
  async verifyRemoveItemInCart() {
    await this.page.getByText(addToCartBtn).nth(1).click()
    await this.page.getByText(addToCartBtn).nth(2).click()
    await this.page.getByText(addToCartBtn).nth(3).click()
    await this.page.locator(cartIcon).click()
    await this.page.locator(removeItemBtn).click()
    await expect(this.page.locator(cartBadge)).toContainText('2')
  }
}
