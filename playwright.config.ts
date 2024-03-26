import { defineConfig, devices } from '@playwright/test'
import { env } from './environment'

export default defineConfig({
    testDir: './tests',
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 2,
    workers: process.env.CI ? 1 : undefined,
    reporter: 'html',
    timeout: env.get('timeouts.timeout'),

    use: {
        baseURL: env.get('hosts.donation'),
        actionTimeout: 10 * 1000,
        navigationTimeout: 30 * 1000,
        trace: 'on-first-retry',
    },

    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
        // {
        //   name: 'Mobile Chrome',
        //   use: { ...devices['Pixel 5'] },
        // }
    ],
})
