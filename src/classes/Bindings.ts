export class Address {
  addressHex: string;
  constructor(hex: string) {
    this.addressHex = hex;
  }
}

export class PublicKey {
  keyHex: string;
  constructor(hex: string) {
    this.keyHex = hex;
  }
}

export class SocketAddr {
  ip: string;
  port: number;
  constructor(ip: string, port: number) {
    this.ip = ip;
    this.port = port;
  }
}
