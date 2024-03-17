import { test as base } from '@playwright/test'
import { DonationSinglePage } from './pages/donation/donation.page'
import { MainPage } from './pages/main.page'
import Application from './app'

type Pages = {
    mainPage: MainPage
    donationPage: DonationSinglePage
}

export const test = base.extend<Pages & { app: Application }>({
    app: async ({ page }, use) => {
        await use(new Application(page))
    },

    mainPage: async ({ page }, use) => {
        await use(new MainPage(page))
    },

    donationPage: async ({ page }, use) => {
        await use(new DonationSinglePage(page))
    },
})
export { expect } from '@playwright/test'
