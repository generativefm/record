const maybeAssign = (target, name, value) => {
  if (typeof value !== 'undefined') {
    target[name] = value;
  }
  return target;
};

const createStandardAction = (type) => (payload, meta) => {
  const action = { type };
  return [
    ['payload', payload],
    ['meta', meta],
  ].reduce((target, [name, value]) => maybeAssign(target, name, value), action);
};

export default createStandardAction;
