import { FrameLocator, Locator, Page } from '@playwright/test'
import { Element } from '../../../elements/element'
import { CurrencyName } from '../../../constants/currency'

export class PaymentOptions extends Element {
    readonly coverTransactionCosts: Locator = this.locator.getByRole(
        'checkbox',
        { name: 'Cover transaction costs' }
    )

    constructor(page: Page, frame: FrameLocator) {
        super(page, frame.locator('.body'))
    }
}
