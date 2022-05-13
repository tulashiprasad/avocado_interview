export const ACTION = {
  LAYOUT_CHANGE: "LAYOUT_CHANGE",
  DELETE: "DELETE",
  UPDATE: "UPDATE",
};
export const reducer = (state, action) => {
  switch (action.type) {
    case ACTION.LAYOUT_CHANGE:
      return [
        ...state,
        {
          image: action.payload1,
          name: action.payload2,
          capacity: action.payload3,
          status: action.payload4,
          layout: action.payload5,
          currentState: action.payload6,
        },
      ];
    case ACTION.DELETE:
      return state.filter((oldvalue, index) => index !== action.payload);
  }
};
