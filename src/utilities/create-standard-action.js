const createStandardAction = (type) => (payload, meta) => ({
  type,
  payload,
  meta,
});

export default createStandardAction;
