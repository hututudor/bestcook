interface Fn {
  (req: any): any;
}

export const restRequest = (fn: Fn) => async (req: any, res: any) => {
  try {
    const result = await fn(req);

    res.status(200).json(result);
  } catch (e) {
    if (e.code > 600) {
      e.code = 500;
    }
    res.status(e.code || 500).json({ message: e.message, payload: e.payload });
  }
};
