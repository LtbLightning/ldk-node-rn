## LDK-Node-RN

<p>
  <a href="https://github.com/LtbLightning/ldk-node-rn/blob/HEAD/LICENSE">
    <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="LDK-Node RN is released under the MIT license." />
  </a>
  <a href="https://github.com/LtbLightning/ldk-node-rn/blob/master/README.md">
    <img src="https://img.shields.io/badge/docs-red.svg" alt="Docs" />
  </a>
  <a href="https://www.npmjs.com/package/ldk-node-rn">
    <img src="https://img.shields.io/npm/v/ldk-node-rn" alt="Current npm package version." />
  </a>
    <a href="https://github.com/LtbLightning/ldk-node-rn/issues">
    <img src="https://img.shields.io/github/issues/LtbLightning/ldk-node-rn.svg" alt="Issues" />
  </a>
  <a href="https://github.com/LtbLightning/ldk-node-rn/stargazers">
    <img src="https://img.shields.io/github/stars/LtbLightning/ldk-node-rn.svg" alt="Stars" />
  </a>
  <a href="https://github.com/LtbLightning/ldk-node-rn/forks">
    <img src="https://img.shields.io/github/forks/LtbLightning/ldk-node-rn.svg?color=brightgreen" alt="Forks" />
  </a>
  <a href="https://github.com/LtbLightning/ldk-node-rn-demo">
    <img src="https://img.shields.io/badge/Demo App-orange" alt="Demo App" />
  </a>
</p>

A React Native library for [LDK Node](https://github.com/lightningdevkit/ldk-node), a ready-to-go Lightning node library built using [LDK](https://lightningdevkit.org) and [BDK](https://bitcoindevkit.org).

LDK Node is a non-custodial Lightning node. Its central goal is to provide a small, simple, and straightforward interface that enables users to easily set up and run a Lightning node with an integrated on-chain wallet. While minimalism is at its core, LDK Node aims to be sufficiently modular and configurable to be useful for a variety of use cases.

The primary abstraction of the library is the Node, which can be retrieved by setting up and configuring a Builder to your liking and calling build(). Node can then be controlled via commands such as start, stop, connectOpenChannel, sendPayment, etc.:

This release covers the same API from LDK Node 0.1.0 Rust. It has support for sourcing chain data via an Esplora server, filesystem persistence, gossip sourcing via the Lightning peer-to-peer network, and configurable entropy sources for the integrated LDK and BDK-based wallets.

Please note: This release is considered experimental, and should not be run in production

## Installation

Using npm:

```bash
npm i --save ldk-node-rn
```

Using yarn:

```bash
yarn add ldk-node-rn
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
import { Builder, Config, Node } from 'ldk-node-rn';
import { NetAddress } from 'ldk-node-rn/lib/classes/Bindings';

// ....

// Your preferred `Esplora` url
const esploraUrl = https://blockstream.info/testnet/api;

// configuration options for the node
const config = await new Config().create('alice_node', 'regtest', new NetAddress('127.0.0.1', 5001));

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
