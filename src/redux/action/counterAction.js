export const INCREMENT = "INCREMENTAAA";

export const DECREMENT = "DECREMENT";

export const increaseCounter = () => {
  return {
    type: INCREMENT,
  };
};

export const decreaseCounter = () => {
  return {
    type: DECREMENT,
  };
};
