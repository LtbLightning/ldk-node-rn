import { Config } from '../src';
import { ChannelConfig, ChannelId, LogLevel, NetAddress, PublicKey } from '../src/classes/Bindings';

const host = '127.0.0.1';
export const esploraServerUrl = `http://${host}:50000`;
export const gossipRgsUrl = `http://${host}:9735`;
export const seedPhrase = 'mom mom mom mom mom mom mom mom mom mom mom mom';
export const nodeStoragePath = 'alice_node';
export const mockAddress = new NetAddress(host, 5000);
export const networkName = 'regtest';
export const mockUUID = 'A4CCF9FD-FCA0-4171-94FD-4726F025FAC9';
export const mockNodeID = '02f42d9e57048ba366249c873ce7440cfaad783c249cbd4265b4eac62184d02eae';
export const fundingAddress = 'bcrt1qksrv025rtmnpjvphhm7x9zg4r627kz6826wncm';
export const txId = '39f85b856a31523db1a3bc45110925806e2e9abbf0f96a64a77827c94c2bb7a0';
export const invoice =
  'lnbcrt20u1pj0qm7upp5r6x84umvcuyl34ksedlxzsv5npsukqwd4jaucp6yd4ds05q7tmxqdqqcqzzsxqyz5vqsp59ux6ce3h80vla50hyj0qd3p0zdyfprc4j6tdw8ns7fszm68k6zaq9qyyssqqq7mwcq76jrhckuw5fukhr0a2fsm8hc2mlkfksky6p0f3x4lg569d9lsmrjzj8jx4vfrsyqm2wevd094vwy3mgxp53akgzu8uztl5ycpna96g9';
export const paymentHash = '1e8c7af36cc709f8d6d0cb7e6141949861cb01cdacbbcc07446d5b07d01e5ecc';
export const balanceMsats = 19980000;

export const mockConfig = async () =>
  await new Config().create(nodeStoragePath, networkName, mockAddress, 144, 80, 30, 600, LogLevel.debug, []);

export const mockChannelConfig = new ChannelConfig(12, 12, 12, 12, 12);
export const mockChannelId = new ChannelId('4d40f965ef3cb52fc5a7391b2afd938fb6a46b8f03c0afd69b2733b7a58230f5');
const counterartyNodeId = '02da84df8c601a14d55be9fc38dba62eb7e7bad6737aea4aa20d5004c4cbcdb22a';
export const mockPublickKey = new PublicKey(counterartyNodeId);

export const rawPaymentDetails = {
  amountMsat: 2000000,
  direction: 'outbound',
  hash: paymentHash,
  preimage: '8f5b49c6859ccbd89b7abb7ce882b70b8ec39525dde6c47d28cf8b5d5a919189',
  secret: '2f0dac66373bd9fed1f7249e06c42f1348908f159696d71e70f2602de8f6d0ba',
  status: 'succeeded',
};

export const rawPeerDetails = {
  address: '127.0.0.1:9735',
  isConnected: true,
  nodeId: counterartyNodeId,
};
export const rawChannelDetails = {
  balanceMsat: 17980000,
  channelId: '4d40f965ef3cb52fc5a7391b2afd938fb6a46b8f03c0afd69b2733b7a58230f5',
  channelValueSats: 20000,
  cltvExpiryDelta: 72,
  confirmations: 45,
  confirmationsRequired: 3,
  counterpartyNodeId: counterartyNodeId,
  fundingTxo: { txid: 'f43082a5b733279bd6afc0038f6ba4b68f93fd2a1b39a7c52fb53cef65f9404d', vout: 1 },
  inboundCapacityMsat: 1020000,
  isChannelReady: true,
  isOutbound: true,
  isPublic: true,
  isUsable: true,
  outboundCapacityMsat: 17626000,
  unspendablePunishmentReserve: 354,
  userChannelId: '244256714741081591790712489448163907945',
};

export const signMessageArray = [12, 12, 12];
export const signedMessage =
  'rnauyjy4n8dsk1utm9jop9dforp1t8o5z4jeohwxfe4ahyumjrphgrqtqk5ue1npwbbkwz5psbg1kq9yconr86ncebm8eote4z7tso5a';
