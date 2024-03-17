import { FrameLocator, Locator, Page } from '@playwright/test'
import { Element } from './element'
import { CurrencyName } from '../constants/currency'

export class CardForm extends Element {
    readonly cardN: Locator = this.locator
        .frameLocator('iframe[title="Secure card number input frame"]')
        .getByPlaceholder('Card number')

    readonly dateExp: Locator = this.locator
        .frameLocator('iframe[title="Secure expiration date input frame"]')
        .getByPlaceholder('MM / YY')

    readonly cvc: Locator = this.locator
        .frameLocator('iframe[title="Secure CVC input frame"]')
        .getByPlaceholder('CVC')

    async fillForm(card): Promise<void> {
        await this.cardN.fill(card.number)
        await this.dateExp.fill(card.date)
        await this.cvc.fill(card.cvc)
    }
}
