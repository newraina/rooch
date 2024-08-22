// Copyright (c) RoochNetwork
// SPDX-License-Identifier: Apache-2.0

import { Buffer } from 'buffer';
import {beforeAll, describe, expect, it} from 'vitest'
import {TestBox} from '../setup.js'
import {Transaction} from '../../src/transactions/index.js'
import {Args} from "../../src"
import {readFileSync} from "node:fs"

describe('Checkpoints Transaction API', () => {
  let testBox: TestBox

  beforeAll(async () => {
    testBox = TestBox.setup()
  })

  it('Call function with bitcoin auth should be success', async () => {
    const tx = new Transaction()
    tx.callFunction({
      target: '0x3::empty::empty_with_signer',
    })

    const result = await testBox.getClient().signAndExecuteTransaction({
      transaction: tx,
      signer: testBox.keypair,
    })

    expect(result.execution_info.status.type).eq('executed')
  })

  it('query transactions should be ok', async () => {
    const tx = new Transaction()
    tx.callFunction({
      target: '0x3::empty::empty_with_signer',
    })

    expect(await testBox.signAndExecuteTransaction(tx)).toBeTruthy()

    const result = await testBox.getClient().queryTransactions({
      filter: {
        sender: testBox.address().toHexAddress(),
      },
    })

    expect(result.data.length).toBeGreaterThan(0)
  })

  it('script call should be success', async () => {
    const tx = new Transaction()

    const buffer = readFileSync("./src/transactions/sc/build/sc/bytecode_scripts/main.mv", { encoding: null });
    // buffer to Uint8Array
    const bytecode = new Uint8Array(buffer);

    tx.scriptCall({
      code: new Uint8Array([]),
      args: [],
      typeArgs: []
    })

    const result = await testBox.signAndExecuteTransaction(tx)

    expect(result).toBeTruthy()
  })

})