import _ from 'lodash'
import { PaymentChannelCreate, hashes, PaymentChannelClaim } from 'xrpl-local'

import serverUrl from '../serverUrl'
import {
  setupClient,
  teardownClient,
  type XrplIntegrationTestContext,
} from '../setup'
import { generateFundedWallet, testTransaction } from '../utils'

// how long before each test case times out
const TIMEOUT = 20000
const { hashPaymentChannel } = hashes

describe('PaymentChannelClaim', () => {
  let testContext: XrplIntegrationTestContext

  beforeEach(async () => {
    testContext = await setupClient(serverUrl)
  })
  afterEach(async () => teardownClient(testContext))

  it(
    'base',
    async () => {
      const wallet2 = await generateFundedWallet(testContext.client)
      const paymentChannelCreate: PaymentChannelCreate = {
        TransactionType: 'PaymentChannelCreate',
        Account: testContext.wallet.classicAddress,
        Amount: '100',
        Destination: wallet2.classicAddress,
        SettleDelay: 86400,
        PublicKey: testContext.wallet.publicKey,
      }

      const paymentChannelResponse = await testContext.client.submit(
        paymentChannelCreate,
        { wallet: testContext.wallet },
      )

      await testTransaction(
        testContext.client,
        paymentChannelCreate,
        testContext.wallet,
      )

      const paymentChannelClaim: PaymentChannelClaim = {
        Account: testContext.wallet.classicAddress,
        TransactionType: 'PaymentChannelClaim',
        Channel: hashPaymentChannel(
          testContext.wallet.classicAddress,
          wallet2.classicAddress,
          paymentChannelResponse.result.tx_json.Sequence ?? 0,
        ),
        Amount: '100',
      }

      await testTransaction(
        testContext.client,
        paymentChannelClaim,
        testContext.wallet,
      )
    },
    TIMEOUT,
  )
})
