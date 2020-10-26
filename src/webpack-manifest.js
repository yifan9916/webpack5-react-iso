import fs from 'fs-extra';

export let webpackManifest;

export const initWebpackManifest = () =>
  (webpackManifest = fs.readJSONSync(
    `./${process.env.CLIENT_OUTPUT_PATH}/assets/manifest.json`,
  ));

export const renderWebpackRuntime = () => {
  if (!webpackManifest['runtime.js']) return '';

  const runtimeFilename = webpackManifest['runtime.js'].split('/').pop();
  const runtimeContent = fs.readFileSync(
    `./${process.env.CLIENT_OUTPUT_PATH}/assets/javascript/${runtimeFilename}`,
    'utf8',
  );

  return `<script>${runtimeContent}</script>`;
};
