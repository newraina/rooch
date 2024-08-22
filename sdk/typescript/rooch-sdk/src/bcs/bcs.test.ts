// Copyright (c) RoochNetwork
// SPDX-License-Identifier: Apache-2.0

import {describe, expect, it} from 'vitest'

import {Ed25519Keypair, Secp256k1Keypair} from '../keypairs/index.js'
import {bytesEqual} from '../utils/index.js'

import {bcs} from './index.js'
import {RawBytes} from "./bcs"

describe('BCS', () => {
  it('Address', () => {
    const roochAddress = new Ed25519Keypair().getRoochAddress()

    const bcs1 = bcs.Address.serialize(roochAddress).toBytes()
    const bcs2 = bcs.Address.serialize(roochAddress.toHexAddress()).toBytes()
    const bcs3 = bcs.Address.serialize(roochAddress.toBech32Address()).toBytes()

    expect(bytesEqual(bcs1, bcs2) && bytesEqual(bcs1, bcs3)).toBeTruthy()

    const bitcoinAddress = new Secp256k1Keypair().getBitcoinAddress()

    const bcs4 = bcs.Address.serialize(bitcoinAddress).toBytes()
    const bcs5 = bcs.Address.serialize(bitcoinAddress.genRoochAddress()).toBytes()

    expect(bytesEqual(bcs4, bcs5)).toBeTruthy()
  })

  it('ScriptCall', () => {
    const scriptCall = bcs.ScriptCall.serialize(
      {
        code: '0x1',
        args: [],
        typeArgs: []
      }
    )

    console.log(scriptCall)
  })

  it('raw', () => {
    const rawBytes1 = RawBytes().serialize('1F').toBytes()

    const raw = RawBytes().parse(rawBytes1)

    console.log(raw)
  })
})
