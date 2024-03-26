import { test, expect } from '../../lib/fixtures'
import { url } from 'inspector'
import { env } from '../../environment'
import { MainPage } from '../../lib/pages/main.page'
import { DonationSinglePage } from '../../lib/pages/donation/donation.page'
import { faker } from '@faker-js/faker'

test.describe('charity', () => {
    test('test charm donation USD', async ({
        app,
        context,
        page,
    }, testInfo) => {
        // ARRANGE:
        const cardDetails = {
            number: '4242424242424242',
            date: '04/24',
            cvc: '000',
        }

        const userDetails = {
            name: faker.person.firstName(),
            surname: faker.person.lastName(),
            email: faker.internet.email(),
        }

        await app.mainPage.visit()

        // ACT:
        const dp = await app.mainPage.openDonation()
        await dp.charmBodyOptions.monthlyButton.click()
        await dp.charmBodyOptions.priceInput.fill('100')
        await dp.donateFooterButton.click()

        await dp.paymentOptions.coverTransactionCosts.uncheck()
        await dp.creditCardButton.click()
        await dp.card.fillForm(cardDetails)
        await dp.continueButton.click()
        await dp.personalOptions.fillForm(userDetails)
        await dp.payButton.click()

        // # ASSERT:
        await dp.alert.waitFor({ state: 'visible' })
        await expect(dp.alert).toContainText('Your card was declined')
    })

    test('test charm donation EUR', async ({ mainPage, donationPage }) => {
        await mainPage.visit()
        await mainPage.openDonation()
        await donationPage.charmBodyOptions.monthlyButton.click()
        await donationPage.charmBodyOptions.selectPriceByText('10')
        await donationPage.charmBodyOptions.selectCurrency('EUR')
        await donationPage.donateFooterButton.click()
    })
})
