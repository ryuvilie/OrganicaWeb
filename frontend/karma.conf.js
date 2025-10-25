// karma.conf.js
module.exports = function (config) {
  config.set({
    // Frameworks
    frameworks: ['jasmine', 'webpack'],

    // Archivos de tests a cargar
    files: [
      'src/**/*.test.js'
    ],

    // Preprocesadores
    preprocessors: {
      'src/**/*.test.js': ['webpack']
    },

    // Configuración de Webpack
    webpack: {
      mode: 'development',
      module: {
        rules: [
          // Regla para archivos JavaScript/JSX (Babel)
          {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env', '@babel/preset-react']
              }
            }
          },
          // Regla para archivos CSS
          {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
          },
          // Regla para MOCKEAR ARCHIVOS DE IMAGEN
          // Usa 'null-loader' para evitar errores 404 en el entorno de testing.
          {
            test: /\.(png|jpe?g|gif|svg|webp)$/i,
            use: 'null-loader',
          }
        ]
      },
      // Resolver extensiones
      resolve: {
        extensions: ['.js', '.jsx']
      }
    },

    // Reporting
    reporters: ['progress', 'kjhtml'],

    // Navegadores a usar
    browsers: ['ChromeHeadless'],
    
    // Ejecutar una sola vez (false para modo watch)
    singleRun: false
  });
};