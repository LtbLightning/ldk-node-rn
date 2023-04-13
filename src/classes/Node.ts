import { NativeLoader } from './NativeLoader';

export class Node extends NativeLoader {
  id: string = '';

  /**
   * Create node id
   */
  constructor(id: string) {
    super();
    this.id = id;
  }

  /**
   * Start node
   * @returns Promise<boolean>
   */
  async start(): Promise<boolean> {
    return this._ldk.start(this.id);
  }

  /**
   * Get nodeId
   * @returns Promise<string>
   */
  async nodeId(): Promise<string> {
    return this._ldk.nodeId(this.id);
  }
}
