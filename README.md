## LDK_Node

A React Native library for [LDK Node](https://github.com/lightningdevkit/ldk-node), a ready-to-go Lightning node library built using [LDK](https://lightningdevkit.org) and [BDK](https://bitcoindevkit.org).

LDK Node is a non-custodial Lightning node. Its central goal is to provide a small, simple, and straightforward interface that enables users to easily set up and run a Lightning node with an integrated on-chain wallet. While minimalism is at its core, LDK Node aims to be sufficiently modular and configurable to be useful for a variety of use cases.

The primary abstraction of the library is the Node, which can be retrieved by setting up and configuring a Builder to your liking and calling build(). Node can then be controlled via commands such as start, stop, connectOpenChannel, sendPayment, etc.:

This release covers the same API from LDK Node 0.1.0 Rust. It has support for sourcing chain data via an Esplora server, filesystem persistence, gossip sourcing via the Lightning peer-to-peer network, and configurable entropy sources for the integrated LDK and BDK-based wallets.

Please note: This release is considered experimental, and should not be run in production

## Installation

Using npm:

```bash
npm i --save ldk-node
```

Using yarn:

```bash
yarn add ldk-node
```

[IOS Only] Install pods:

```bash
npx pod-install
or
cd ios && pod install
```

### Examples

### Build, Start & Sync the local node

```js
import {Builder, Config, Node} from 'ldk-node';
import {LogLevel} from 'ldk-node/lib/classes/Bindings';

// ....

// Your preferred `Esplora` url
const esploraUrl = https://blockstream.info/testnet/api;

// configuration options for the node
const config = await new Config().create('alice_node', 'log_dir', 'regtest', null, 144, 80, 30, 60, LogLevel.debug, []);

const builder = await new Builder().fromConfig(config);
await builder.setEsploraServer(esploraUrl);

// Build node
const node: Node = await builder.build();

// Starting the node
await node.start();

// Syncing the node
await node.syncWallets();

```

### References:

- Setting up a local Esplora instance for testing:
  https://bitcoin.stackexchange.com/questions/116937/how-do-i-setup-an-esplora-instance-for-local-testing/116938#116938
