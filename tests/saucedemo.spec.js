// @ts-check
const { test, expect } = require('@playwright/test')
import { LoginPage } from '../pages/loginPage'
import { Dashboard } from '../pages/dashboardPage'
import { CartPage } from '../pages/cartPage'
import {
  USERNAME,
  PASSWORD,
  loginErrorMessage,
  requireErrorMessageData,
} from '../mockData/loginData'

test('TC1: should display correct error message when user input invalid credential', async ({
  page,
}) => {
  const loginPage = new LoginPage(page)
  await loginPage.goToBasePage()
  await loginPage.login('Wrong Email', 'Wrong Password')
  await loginPage.verifyLoginErrorMessage(loginErrorMessage)
})

test('TC2: should navigate to dashboard page when login with valid credential', async ({
  page,
}) => {
  const loginPage = new LoginPage(page)
  await loginPage.goToBasePage()
  await loginPage.login(USERNAME, PASSWORD)
  await loginPage.verifyLoginSuccessfully()
})

test('TC3: should display correct error message when no credential is given', async ({
  page,
}) => {
  const loginPage = new LoginPage(page)
  await loginPage.goToBasePage()
  await loginPage.login('', '')
  await loginPage.verifyLeaveBlankUsernamePassword(requireErrorMessageData)
})

test('TC4: should display 6 items in the inventory', async ({ page }) => {
  const loginPage = new LoginPage(page)
  const dashboard = new Dashboard(page)
  await loginPage.goToBasePage()
  await loginPage.login(USERNAME, PASSWORD)
  const countItem = await dashboard.getInventoryList()
  await expect(countItem).toBe(6)
})

test('TC5: should be able to add item to cart', async ({ page }) => {
  const loginPage = new LoginPage(page)
  const dashboard = new Dashboard(page)
  await loginPage.goToBasePage()
  await loginPage.login(USERNAME, PASSWORD)
  await dashboard.verifyAddToCart()
})

test('TC6: cart should display the correct number of added item', async ({
  page,
}) => {
  const loginPage = new LoginPage(page)
  const dashboard = new Dashboard(page)
  await loginPage.goToBasePage()
  await loginPage.login(USERNAME, PASSWORD)
  await dashboard.verifyNumberAtCart()
})

test('TC7: should display the correct number of item when remove item from cart', async ({
  page,
}) => {
  const loginPage = new LoginPage(page)
  const cartPage = new CartPage(page)
  await loginPage.goToBasePage()
  await loginPage.login(USERNAME, PASSWORD)
  await cartPage.verifyRemoveItemInCart()
})
