


interface Client {
  connect(): Promise<void>;
  execute(query: string, options: object): Promise<any>
  execute(query: string, params?: object, options?: object): Promise<any>
}

export default Client;
