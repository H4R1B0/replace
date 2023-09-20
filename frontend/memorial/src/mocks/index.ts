async function initMocks() {
  const { worker } = await import("./browser");
  worker.start();
}

export default initMocks;
