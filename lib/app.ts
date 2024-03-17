import { Page } from '@playwright/test'
import { MainPage } from './pages/main.page'
import { DonationSinglePage } from './pages/donation/donation.page'

export default class Application {
    readonly donationSinglePage: DonationSinglePage
    readonly mainPage: MainPage

    constructor(readonly page: Page) {
        this.mainPage = new MainPage(this.page)
        this.donationSinglePage = new DonationSinglePage(this.page)
    }
}

class CustomApplication {
    readonly page: Page
    readonly mainPage: MainPage
    readonly donationSinglePage: DonationSinglePage

    constructor(page: Page) {
        this.page = page
        this.mainPage = new MainPage(this.page)
        this.donationSinglePage = new DonationSinglePage(this.page)
    }

    get getMainPage(): MainPage {
        return this.mainPage
    }

    get getNewMainPage(): MainPage {
        return new MainPage(this.page)
    }

    get getDonationSinglePage(): DonationSinglePage {
        return this.donationSinglePage
    }
}
