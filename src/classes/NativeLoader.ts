import { ChannelDetails, PeerDetails } from './Bindings';
import { NativeModules } from 'react-native';

export interface NativeLdkNodeRn {
  createConfig(
    storageDirPath: string,
    esploraServerUrl: string,
    network: string,
    listeningAddress: string | null,
    defaultCltvExpiryDelta: number
  ): string;

  fromConfig(configId: string): string;
  build(buildId: string): string;

  start(nodeId: string): boolean;
  stop(nodeId: string): boolean;
  syncWallets(nodeId: string): boolean;
  nodeId(nodeId: string): string;
  newFundingAddress(nodeId: string): string;
  spendableOnchainBalanceSats(nodeId: string): number;
  totalOnchainBalanceSats(nodeId: string): number;
  connect(nodeId: string, pubKey: string, address: string, permanently: boolean): boolean;
  disconnect(nodeId: string, pubKey: string): boolean;
  connectOpenChannel(
    nodeId: string,
    pubKey: string,
    address: string,
    channelAmountSats: number,
    pushToCounterpartyMsat: number,
    announceChannel: boolean
  ): boolean;
  receivePayment(nodeId: string, amountMsat: number, description: string, expirySecs: number): string;
  sendPayment(nodeId: string, invoice: string): string;
  sendPaymentUsingAmount(nodeId: string, invoice: string, amountMsat: number): string;
  sendSpontaneousPayment(nodeId: string, amountMsat: number, pubKey: string): string;
  listPeers(nodeId: string): Array<PeerDetails>;
  listChannels(nodeId: string): Array<ChannelDetails>;
}

export class NativeLoader {
  protected _ldk: NativeLdkNodeRn = NativeModules.LdkNodeRnModule;

  constructor() {
    this._ldk = NativeModules.LdkNodeRnModule;
  }
}
