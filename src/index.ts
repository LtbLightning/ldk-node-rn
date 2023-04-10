import { NativeModules } from 'react-native';

export interface NativeLdkNodeRn {
  testFn(wordCount: string): string;
}

class NativeLoader {
  protected _ldk: NativeLdkNodeRn = NativeModules.LdkNodeRnModule;

  constructor() {
    this._ldk = NativeModules.LdkNodeRnModule;
  }
}

class LdkRn extends NativeLoader {
  async test() {
    return await this._ldk.testFn('__H');
  }
}

export { LdkRn };
