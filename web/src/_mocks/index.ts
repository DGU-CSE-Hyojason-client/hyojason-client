const initMock = async (): Promise<void> => {
  if (typeof window === "undefined") {
    const { server } = await import("./node");
    server.listen();
  } else {
    const { worker } = await import("./browser");
    worker.start();
  }
};

export default initMock;
