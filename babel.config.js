module.exports = (api) => {
  api.cache.using(() => process.env.NODE_ENV);
  const isDev = !api.env('production');
  const isWeb = api.caller((caller) => caller.target === 'web');

  const presets = [
    '@babel/react',
    [
      '@babel/env',
      {
        corejs: 3.6,
        useBuiltIns: 'usage',
      },
    ],
  ];

  const plugins = [
    '@babel/proposal-class-properties',
    '@babel/proposal-object-rest-spread',
    '@babel/syntax-dynamic-import',
    // avoid including react-refresh code in the node environment
    isDev && isWeb && 'react-refresh/babel',
  ].filter(Boolean);

  return { presets, plugins };
};
