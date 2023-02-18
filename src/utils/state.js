const undefinedState = { user: undefined, account: undefined };

const saveState = (state) => {
  if (!state) {
    sessionStorage.removeItem("session");
    console.log("removed sessio");
    return;
  }
  console.log("setting session");
  const serialized = JSON.stringify(state);
  sessionStorage.setItem("session", serialized);
};

const loadState = () => {
  try {
    const serialized = sessionStorage.getItem("session");
    if (serialized === null) return undefinedState;
    return JSON.parse(serialized);
  } catch (err) {
    return undefinedState;
  }
};

export { loadState, saveState };