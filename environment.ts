import convict from 'convict'

const env = convict({
    hosts: {
        donation: {
            doc: 'Donation Secure host',
            format: String,
            default: `https://data.fundraiseup.com/qa-test-7R58U3`,
            env: 'UI_TEST_HOST_DONATION',
        },
    },
    timeouts: {
        timeout: {
            doc: 'Timeout',
            format: Number,
            default: 60 * 1000,
            env: 'UI_TEST_TIMEOUT',
        },
    },
})

env.validate({ allowed: 'strict' })

export { env }
