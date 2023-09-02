import { mockLdkNodeModule } from '../setup';
import { Builder, Config, Node } from '../../src';
import {
  balanceMsats,
  fundingAddress,
  invoice,
  mockAddress,
  mockChannelConfig,
  mockChannelId,
  mockConfig,
  mockNodeID,
  mockPublickKey,
  mockUUID,
  paymentHash,
  rawChannelDetails,
  rawPaymentDetails,
  rawPeerDetails,
  signMessageArray,
  signedMessage,
  txId,
} from '../mockData';
import {
  Address,
  ChannelDetails,
  NetAddress,
  PaymentDetails,
  PaymentHash,
  PeerDetails,
  PublicKey,
  Txid,
} from '../../src/classes/Bindings';
import {
  addressToString,
  createChannelDetailsObject,
  createPaymentDetails,
  createPeerDetailsObject,
} from '../../src/utils';

describe('Node', () => {
  mockLdkNodeModule.fromConfig.mockResolvedValue(mockUUID);
  let config: Config;
  let builder: Builder;
  let node: Node;

  beforeAll(async () => {
    config = await mockConfig();
    builder = await new Builder().fromConfig(config);
    node = await builder.build();
    expect(node).toBeInstanceOf(Node);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should start node', async () => {
    mockLdkNodeModule.start.mockResolvedValue(true);
    expect(await node.start()).toBe(true);
  });

  it('should stop node', async () => {
    mockLdkNodeModule.stop.mockResolvedValue(true);
    expect(await node.stop()).toBe(true);
  });

  it('should sync wallet', async () => {
    mockLdkNodeModule.syncWallets.mockResolvedValue(true);
    expect(await node.syncWallets()).toBe(true);
  });

  it('should return nodeId', async () => {
    mockLdkNodeModule.nodeId.mockResolvedValue(mockNodeID);
    const res = await node.nodeId();
    expect(res.keyHex).toBe(mockNodeID);
    expect(res).toBeInstanceOf(PublicKey);
  });

  it('should return node listening address', async () => {
    mockLdkNodeModule.listeningAddress.mockResolvedValue(addressToString(mockAddress));
    const res = await node.listeningAddress();
    expect(res?.ip).toBe(mockAddress.ip);
    expect(res?.port).toBe(mockAddress.port);
    expect(res).toBeInstanceOf(NetAddress);
  });

  it('should return newOnchainAddress', async () => {
    mockLdkNodeModule.newOnchainAddress.mockResolvedValue(fundingAddress);
    const res = await node.newOnchainAddress();
    expect(res.addressHex).toBe(fundingAddress);
    expect(res).toBeInstanceOf(Address);
  });

  it('should sendToOnchainAddress', async () => {
    mockLdkNodeModule.sendToOnchainAddress.mockResolvedValue(txId);
    const res = await node.sendToOnchainAddress(new Address(fundingAddress), 1200);
    expect(res.field0).toBe(txId);
    expect(res).toBeInstanceOf(Txid);
  });

  it('should sendAllToOnchainAddress', async () => {
    mockLdkNodeModule.sendAllToOnchainAddress.mockResolvedValue(txId);
    const res = await node.sendAllToOnchainAddress(new Address(fundingAddress));
    expect(res.field0).toBe(txId);
    expect(res).toBeInstanceOf(Txid);
  });

  it('should get spendableOnchainBalanceSats', async () => {
    mockLdkNodeModule.spendableOnchainBalanceSats.mockResolvedValue(balanceMsats);
    expect(await node.spendableOnchainBalanceSats()).toBe(balanceMsats);
  });

  it('should get totalOnchainBalanceSats', async () => {
    mockLdkNodeModule.totalOnchainBalanceSats.mockResolvedValue(balanceMsats);
    expect(await node.totalOnchainBalanceSats()).toBe(balanceMsats);
  });

  it('should connect peer', async () => {
    mockLdkNodeModule.connect.mockResolvedValue(true);
    expect(await node.connect(mockNodeID, mockAddress, true)).toBe(true);
  });

  it('should disconnect peer', async () => {
    mockLdkNodeModule.disconnect.mockResolvedValue(true);
    expect(await node.disconnect(mockNodeID)).toBe(true);
  });

  it('should connect and open channel', async () => {
    mockLdkNodeModule.connectOpenChannel.mockResolvedValue(true);
    const res = await node.connectOpenChannel(mockNodeID, mockAddress, 12000, 12000, mockChannelConfig, true);
    expect(res).toBe(true);
  });

  it('should close channel', async () => {
    mockLdkNodeModule.closeChannel.mockResolvedValue(true);
    expect(await node.closeChannel(mockChannelId, mockPublickKey)).toBe(true);
  });

  it('should sendPayment', async () => {
    mockLdkNodeModule.sendPayment.mockResolvedValue(paymentHash);
    const res = await node.sendPayment(invoice);
    expect(res.field0).toBe(paymentHash);
    expect(res).toBeInstanceOf(PaymentHash);
  });

  it('should sendPaymentUsingAmount', async () => {
    mockLdkNodeModule.sendPaymentUsingAmount.mockResolvedValue(paymentHash);
    const res = await node.sendPaymentUsingAmount(invoice, 1200);
    expect(res.field0).toBe(paymentHash);
    expect(res).toBeInstanceOf(PaymentHash);
  });

  it('should sendSpontaneousPayment', async () => {
    mockLdkNodeModule.sendSpontaneousPayment.mockResolvedValue(paymentHash);
    const res = await node.sendSpontaneousPayment(1200, mockPublickKey);
    expect(res.field0).toBe(paymentHash);
    expect(res).toBeInstanceOf(PaymentHash);
  });

  it('should receivePayment', async () => {
    mockLdkNodeModule.receivePayment.mockResolvedValue(invoice);
    const res = await node.receivePayment(1200, 'demo', 50);
    expect(res).toBe(invoice);
  });

  it('should receiveVariableAmountPayment', async () => {
    mockLdkNodeModule.receiveVariableAmountPayment.mockResolvedValue(invoice);
    const res = await node.receiveVariableAmountPayment('demo', 50);
    expect(res).toBe(invoice);
  });

  it('should listPayments', async () => {
    mockLdkNodeModule.listPayments.mockResolvedValue([rawPaymentDetails]);
    const res = await node.listPayments();
    expect(res).toEqual([createPaymentDetails(rawPaymentDetails)]);
    expect(res[0]).toBeInstanceOf(PaymentDetails);
  });

  it('should listPeers', async () => {
    mockLdkNodeModule.listPeers.mockResolvedValue([rawPeerDetails]);
    const res = await node.listPeers();
    expect(res).toEqual([createPeerDetailsObject(rawPeerDetails)]);
    expect(res[0]).toBeInstanceOf(PeerDetails);
  });

  it('should listChannels', async () => {
    mockLdkNodeModule.listChannels.mockResolvedValue([rawChannelDetails]);
    const res = await node.listChannels();
    expect(res).toEqual([createChannelDetailsObject(rawChannelDetails)]);
    expect(res[0]).toBeInstanceOf(ChannelDetails);
  });

  it('should return payment details', async () => {
    mockLdkNodeModule.payment.mockResolvedValue(rawPaymentDetails);
    const res = await node.payment(new PaymentHash(paymentHash));
    expect(res).toEqual(createPaymentDetails(rawPaymentDetails));
    expect(res).toBeInstanceOf(PaymentDetails);
  });

  it('should remove payment', async () => {
    mockLdkNodeModule.removePayment.mockResolvedValue(true);
    expect(await node.removePayment(new PaymentHash(paymentHash))).toBe(true);
  });

  it('should sign message', async () => {
    mockLdkNodeModule.signMessage.mockResolvedValue(signedMessage);
    expect(await node.signMessage(signMessageArray)).toBe(signedMessage);
  });

  it('should verify signed message', async () => {
    mockLdkNodeModule.verifySignature.mockResolvedValue(true);
    expect(await node.verifySignature(signMessageArray, signedMessage, mockPublickKey)).toBe(true);
  });

  it('should updateChannelConfig', async () => {
    mockLdkNodeModule.updateChannelConfig.mockResolvedValue(true);
    expect(await node.updateChannelConfig(mockChannelId, mockPublickKey, mockChannelConfig)).toBe(true);
  });
});
