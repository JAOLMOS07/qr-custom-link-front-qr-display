export const CONTENTS = {
  NAME: "content",
  CONTENT: "content",
  NEW_CONTENT: "new",
  PREVIEW_CONTENT: "qr/:id",
  ASSIGN_CONTENT: "assign",
};

export const ORDERS = {
  NAME: "order",
  ORDER_SERVICE: "order-service",
};

export const MODULES = {
  CONTENTS: {
    CONTENT: `/${CONTENTS.NAME}/${CONTENTS.CONTENT}`,
    NEW_CONTENT: `/${CONTENTS.NAME}/${CONTENTS.NEW_CONTENT}`,
  },

  ORDERS: {
    ORDER_SERVICE: `/${ORDERS.NAME}/${ORDERS.ORDER_SERVICE}`,
  },
};
