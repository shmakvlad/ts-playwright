import { FrameLocator, Locator, Page } from '@playwright/test'
import { Element } from '../../../elements/element'
import { CurrencyName } from '../../../constants/currency'

type Currency = Exclude<CurrencyName, 'BYN'>

export class CharmOptions extends Element {
    readonly addComment: Locator = this.locator.getByRole('button', {
        name: 'Add comment',
    })

    readonly designateTo: Locator = this.locator.getByLabel('Designate to')

    readonly dedicate: Locator = this.locator.getByLabel(
        'Dedicate this donation'
    )

    readonly giveOnceButton: Locator = this.locator.getByRole('button', {
        name: 'Give once',
    })

    readonly monthlyButton: Locator = this.locator.getByRole('button', {
        name: 'Monthly',
    })

    readonly priceInput: Locator = this.locator.getByTestId('price-input')

    readonly amountOptions: Locator = this.locator.locator(
        '[data-qa="suggested-amount-button"]'
    )

    readonly currencyOptions: Locator = this.locator.locator(
        '[data-qa="currency-selector"]'
    )

    async selectCurrency(cur: Currency): Promise<void> {
        await this.currencyOptions.selectOption(cur)
    }

    async selectPriceByText(price: string): Promise<void> {
        await this.amountOptions.filter({ hasText: price }).click()
    }

    async selectPrice(price: string): Promise<void> {
        let priceIsDisplayed = false
        for (const row of await this.amountOptions.all()) {
            let el = (await row.textContent()) as string
            if (el.includes(price)) {
                await row.click()
                priceIsDisplayed = true
                break
            }
        }
        if (!priceIsDisplayed)
            throw Error(`amount-option ${price} is not displayed`)
    }

    constructor(page: Page, frame: FrameLocator) {
        super(page, frame.locator('.body').first())
    }
}
