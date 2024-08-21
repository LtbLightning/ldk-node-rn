## [0.3.0]

This is the new release of `ldk-node-rn` v0.3.0 .

#### APIs added

- Exposed `setLiquiditySourceLsps2` method to `Builder` to configure the `Node` instance to source the inbound liquidity.
- Support for sourcing inbound liquidity via LSPS2 just-in-time (JIT) channels has been added.

#### API changed

- All available balances outside of channel balances are now exposed via a unified `listBalances` interface method.

## [0.2.2]

This is a bugfix release that reestablishes compatibility of Swift packages with Xcode 15.3 and later.

## [0.2.1]

This is a bugfix release bumping the used LDK and BDK dependencies to the
latest stable versions.

## [0.2.0]

### Feature and API updates

`BugFix` - Fixed `logger failed` error on startup node everytime.

#### APIs Changed

- `Builder` class `setListeningAddress()` to `setListeningAddresses()` to set multuple listening addresses.
- `Node` class `listeningAddress()` to `listeningAddresses()` to get all listening addresses.
- `Config` class `create` method changes:

  - Added `logDirPath` param to make the location of the `logs` directory customizable .
  - Changed `listeningAddress` param to `listendingAddresses` to allow multiple addresses.
  - Added `probingLiquidityLimitMultiplier` param.

#### APIs Added

- Exposed `ChannelConfig` class and following are its methods:

  - `create` - Constructs a new `ChannelConfig`.
  - `acceptUnderpayingHtlcs` - Returns the set `acceptUnderpayingHtlcs`.
  - `cltvExpiryDelta` - Returns the set `cltvExpiryDelta`.
  - `forceCloseAvoidanceMaxFeeSatoshis` - Returns the set `forceCloseAvoidanceMaxFeeSatoshis`.
  - `forwardingFeeBaseMsat` - Returns the set `forwardingFeeBaseMsat`.
  - `forwardingFeeProportionalMillionths` - Returns the set `forwardingFeeProportionalMillionths`.
  - `setAcceptUnderpayingHtlcs` - Sets the `setAcceptUnderpayingHtlcs`.
  - `setCltvExpiryDelta` - Sets the `setCltvExpiryDelta`.
  - `setForceCloseAvoidanceMaxFeeSatoshis` - Sets the `setForceCloseAvoidanceMaxFeeSatoshis`.
  - `setForwardingFeeBaseMsat` - Sets the `setForwardingFeeBaseMsat`.
  - `setForwardingFeeProportionalMillionths` - Sets the `setForwardingFeeProportionalMillionths`.
  - `setMaxDustHtlcExposureFromFeeRateMultiplier` - Sets the `setMaxDustHtlcExposureFromFeeRateMultiplier`.
  - `setMaxDustHtlcExposureFromFixedLimit` - Sets the `setMaxDustHtlcExposureFromFixedLimit`.

- Exposed following new methods for `Node`

  - `isrunning` - Returns whether the [`Node`] is running.
  - `sendPaymentProbes` - Sends payment probes over all paths of a route that would be used to pay the given invoice.
  - `sendPaymentProbesUsingAmount` - Sends payment probes over all paths of a route that would be used to pay the given zero-value invoice using the given amount.
  - `sendSpontaneousPaymentProbes` - Sends payment probes over all paths of a route that would be used to pay the given amount to the given `node_id`.

## [0.1.0]

This is the first release of `ldk_node`. It features support for sourcing chain data via an `Esplora` server, filesystem persistence, gossip sourcing via the `Lightning` peer-to-peer network, and configurble entropy sources for the integrated LDK & BDK-based wallets.

### Functionality Added

`Config Methods:`

- `create` - Create new `Config` instance for `Builder`.

`Builder Methods:`

- `fromConfig` - Creates a new `Builder` instance from an Config.

- `setEntropySeedPath` - Configures the `Node` instance to source its wallet entropy from a seed file on disk.

- `setEntropySeedBytes` - Configures the `Node` instance to source its wallet entropy from the given seed bytes.

- `setEntropyBip39Mnemonic` - Configures the `Node` instance to source its wallet entropy from a BIP 39 mnemonic.

- `setEsploraServerUrl` - Sets the `Esplora` server URL. Default: https://blockstream.info/api

- `setGossipSourceP2p` - Configures the `Node` instance to source its gossip data from the Lightning peer-to-peer network.

- `setGossipSourceRgs` - Configures the `Node` instance to source its gossip data from the given RapidGossipSync server.

- `setStorageDirPath` - Sets the used storage directory path.

- `setNetwork` - Sets the `Bitcoin` network used.

- `setListeningAddress` - Sets the IP address and TCP port on which Node will listen for incoming network connections. Default: 0.0.0.0:9735

- `build` - Builds an `Node` instance according to the options previously configured.

`Node Methods:`

- `start` - Starts the necessary background tasks, such as handling events coming from user input, `LDK/BDK`, and the peer-to-peer network.

- `stop` - Disconnects all peers, stops all running background tasks, and shuts down Node.

- `syncWallets` - Sync the `LDK & BDK` wallets with the current chain state.

- `nodeId` - Returns our own `node id`.

- `listeningAddress` - Returns our own listening address.

- `newOnchainAddress` - Retrieve a new on-chain/funding address.

- `sendToOnchainAddress` - Send an on-chain payment to the given address.

- `sendAllToOnchainAddress` - Send an on-chain payment to the given address, draining all the available funds.

- `spendableOnchainBalanceSats` - Retrieve current spendable on-chain balance in sats.

- `totalOnchainBalanceSats` - Retrieve total on-chain balance in sats.

- `connect` - Connect to a node on the peer-to-peer network. If permanently is set to true, we’ll remember the peer and reconnect to it on restart

- `disconnect` - Disconnects the peer with the given `node id`.

- `connectOpenChannel` - Connect to a node and open a new channel. Disconnects and re-connects are handled automatically

- `closeChannel` - Close a previously opened channel.

- `receivePayment` - Returns a payable invoice that can be used to request and receive a payment of the amount given.

- `receiveVariableAmountPayment` - Returns a payable invoice that can be used to request and receive a payment for which the amount is to be determined by the user,also known as a `zero-amount` invoice.

- `sendPayment` - Send a payement given an invoice.

- `sendPaymentUsingAmount` - Send a payment given an invoice and an amount in millisatoshi.

- `sendSpontaneousPayment` - Send a spontaneous, aka. `keysend`, payment.

- `listPayments` - Retrieves all payments.

- `listPeers` - Retrieve a list of connected peers.

- `listChannels` - Retrieve a list of known channels.

- `payment` - Retrieve the details of a specific payment with the given hash.

- `removePayment` - Remove the payment with the given hash from the store.

- `signMessage` - Creates a digital ECDSA signature of a message with the node's secret key.

- `verifySignature` - Verifies that the given ECDSA signature was created for the given message with the secret key corresponding to the given public key.

- `updateChannelConfig` - Update the config for a previously opened channel.

`Independent utility methods:`

- `generateEntropyMnemonic` - Utility method for generating a BIP39 mnemonic.
