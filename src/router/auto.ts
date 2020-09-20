/** @format */
type fileModule = { path: string; component: NodeModule }[];

const files = require.context("../views", true, /\.ts&/);
export const components: fileModule = [];
files.keys().map(key => {
  const path = `/index/${key}`;
  const component = files(key).default;
  components.push({ path, component });
});
