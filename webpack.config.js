module.exports = {
  entry: {
    'fe-weather-card': './src/activities/weather-card/index.ts',
    'fe-hello-world': './src/activities/hello-world/index.ts',
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/dist',
  },
};
