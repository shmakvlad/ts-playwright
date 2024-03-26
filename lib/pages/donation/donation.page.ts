import { FrameLocator, Locator } from '@playwright/test'
import { PageObject, PageType } from '../base.page'
import { MainPage } from '../main.page'
import { CampaignInfo } from './components/campaignInfo'
import { CharmOptions } from './components/charmOptions'
import { PaymentOptions } from './components/paymentOptions'
import { CardForm } from '../../elements/cardForm'
import { PersonalOptions } from './components/personalOptions'

export class DonationSinglePage extends MainPage {
    protected initLocator: string = '.widget.widget-desktop'
    protected readonly path: string = '?form=FUNCDKBDSGW'
    protected readonly type: PageType = 'single page'

    readonly campaignInfo = new CampaignInfo(this.page)
    readonly charmBodyOptions = new CharmOptions(this.page, this.charmFrame)
    readonly paymentOptions = new PaymentOptions(this.page, this.charmFrame)
    readonly personalOptions = new PersonalOptions(this.page, this.charmFrame)
    readonly card = new CardForm(this.page, this.charmFrame)

    readonly formHeaderTitle = this.charmFrame.locator('h2.title-1')
    readonly alert = this.charmFrame.locator(
        '[data-qa="card-continue-error-title"]'
    )
    readonly donateFooterButton = this.charmFrame.locator(
        '[data-qa="donate-button"]'
    )
    readonly creditCardButton = this.charmFrame.getByRole('button', {
        name: 'Credit card',
    })
    readonly continueButton = this.charmFrame.locator(
        '[data-qa="card-continue"]'
    )
    readonly payButton = this.charmFrame.locator('[data-testid="pay-button"]')
}
