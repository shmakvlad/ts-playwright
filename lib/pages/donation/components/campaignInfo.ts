import { Locator, Page } from '@playwright/test'
import { Element } from '../../../elements/element'

export class CampaignInfo extends Element {
    constructor(page: Page) {
        super(page, page.locator('[data-qa="campaign-info-section"]'))
    }
}
