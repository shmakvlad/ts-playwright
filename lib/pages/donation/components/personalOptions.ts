import { FrameLocator, Locator, Page } from '@playwright/test'
import { Element } from '../../../elements/element'
import { CurrencyName } from '../../../constants/currency'

export class PersonalOptions extends Element {
    readonly name: Locator = this.locator.getByTestId(
        'privacy-first-name-input'
    )

    readonly surname: Locator = this.locator.getByTestId(
        'privacy-last-name-input'
    )

    readonly email: Locator = this.locator.getByTestId('privacy-email-input')

    async fillForm(user): Promise<void> {
        await this.name.fill(user.name)
        await this.surname.fill(user.surname)
        await this.email.fill(user.email)
    }

    constructor(page: Page, frame: FrameLocator) {
        super(page, frame.locator('.body').first())
    }
}
