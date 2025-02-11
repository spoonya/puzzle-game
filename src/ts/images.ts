const importAll = (require: any): any =>
  require.keys().reduce((acc: any, next: any) => {
    acc[next.replace("./", "")] = require(next);
    return acc;
  }, {});

export const images = importAll(
  require.context("../img", false, /\.(png|jpe?g|svg)$/)
);
