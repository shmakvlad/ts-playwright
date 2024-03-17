import { FrameLocator, Locator } from '@playwright/test'
import { PageObject, PageType } from './base.page'
import { DonationSinglePage } from './donation/donation.page'

export class MainPage extends PageObject {
    protected readonly initLocator: string = 'body'
    protected readonly path: string = ''
    protected readonly type: PageType = 'html'

    protected readonly charmFrame: FrameLocator = this.page.frameLocator(
        'iframe[title="Donation Widget"]'
    )

    readonly giveNowButton: Locator = this.page
        .frameLocator('iframe[title="Donate Button"]')
        .getByRole('button', { name: 'Give Now' })

    async openDonation(): Promise<DonationSinglePage> {
        await this.giveNowButton.click()
        // return this.goto(DonationSinglePage)
        return new DonationSinglePage(this.page)
    }
}
