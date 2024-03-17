import { Page, TestInfo } from '@playwright/test'
import { env } from '../../environment'

export type PageType = 'html' | 'single page' | 'unknown'

type PageState = 'locator' | 'load' | 'domcontentloaded' | 'networkidle'

export abstract class PageObject {
    protected abstract readonly type: PageType
    protected abstract readonly initLocator: string
    protected abstract readonly path: string

    constructor(protected readonly page: Page) {}

    async visit(): Promise<void> {
        await this.page.goto(this.path)
        await this.page.waitForLoadState()
    }

    async goto<T extends PageObject>(po: { new (page: Page): T }): Promise<T> {
        const pageObject = new po(this.page)
        await pageObject.visit()

        return pageObject
    }

    protected async waitForPageIsLoad(
        state: PageState = 'locator',
        timeout?: number
    ) {
        if (state === 'locator') {
            await this.page.waitForSelector(this.initLocator, {
                timeout: timeout ? timeout : env.get('timeouts.timeout'),
            })
        } else {
            await this.page.waitForLoadState(state, {
                timeout: timeout ? timeout : env.get('timeouts.timeout'),
            })
        }
    }

    protected async waitForResponse(pattern): Promise<void> {
        const { method, path } = pattern

        await this.page.waitForResponse(
            (res) =>
                res.url().includes(path) && res.request().method() === method
        )
    }

    async title(): Promise<string> {
        return this.page.title()
    }

    async reload(): Promise<void> {
        await this.page.reload()
        await this.waitForPageIsLoad()
    }

    async debug(): Promise<void> {
        await this.page.pause()
    }

    async prepareToScreenshot(): Promise<void> {
        await this.waitForPageIsLoad('networkidle')
    }

    async screenshot(): Promise<Buffer> {
        return this.page.screenshot()
    }

    async sleep(time: number): Promise<void> {
        await this.page.waitForTimeout(time)
    }

    get url(): string {
        return this.page.url() + this.path
    }

    get pw(): Page {
        return this.page
    }
}
