import { ServerConnection, ServiceManager } from "@jupyterlab/services";

const serverSettings = ServerConnection.makeSettings({
  baseUrl: "http://localhost:8888",
  token: "b0b787f6835f8af87c59999b982bef432c3aec40beaabdf3",
  // fetch: (input, init?) => fetch(input, {
  //   ...init,
  //   mode: 'no-cors',
  // })
})

export default new ServiceManager({
  serverSettings,
})