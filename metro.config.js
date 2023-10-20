const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

module.exports = (async () => {
  const {
    resolver: { sourceExts },
  } = await getDefaultConfig(__dirname);

  return {
    transformer: {
      babelTransformerPath: require.resolve('react-native-svg-transformer'),
    },
    resolver: {
      sourceExts: [...sourceExts, 'svg'],
      extraNodeModules: new Proxy(
        {},
        {
          get: (target, name) =>
            path.join(process.cwd(), `node_modules/${name}`),
        }
      ),
    },
    server: {
      port: 8080,
      enhanceMiddleware: (middleware) => {
        return (req, res, next) => {
          res.setHeader('Access-Control-Allow-Origin', 'https://babb-198-161-203-4.ngrok-free.app');
          middleware(req, res, next);
        };
      },
    },
  };
})();