import { FrameLocator, Locator, Page } from '@playwright/test'

export type ElementState = 'visible' | 'hidden'

export class Element {
    protected readonly page: Page
    protected readonly locator: Locator | FrameLocator

    constructor(page: Page, locator: Locator | FrameLocator) {
        this.page = page
        this.locator = locator
    }
}
