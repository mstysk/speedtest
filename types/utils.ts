export const isString = (str: unknown): str is string =>
  typeof str !== "undefined" && str !== "";
