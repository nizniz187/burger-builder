const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const srcPath = path.resolve(__dirname, 'src');
const publicPath = path.resolve(__dirname, 'public');
const assetPath = path.resolve(__dirname, 'public/assets');

module.exports = {
  entry: `${srcPath}/index.js`,
  output: {
    filename: '[name].bundle.js',
    path: assetPath,
    publicPath: publicPath
  },
  mode: "development",
  devServer: {
    contentBase: publicPath,
    index: 'index.html',
    writeToDisk: true,
    hot: true,
    watchContentBase: true
  },
  resolve: {
    alias: {
      hoc: `${srcPath}/hoc`,
      components: `${srcPath}/components`,
      containers: `${srcPath}/containers`
    }
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          {
            loader: require.resolve('css-loader'),
            options: {
              importLoaders: 1,
              modules: true
            }
          }
        ]
      },
      { 
        test: /.js|.jsx$/, 
        exclude: /node_modules/, 
        use: { 
					loader: 'babel-loader', 
					options: { 
						presets: [
							'@babel/preset-react',
              '@babel/preset-env'
            ],
            plugins: [
              '@babel/plugin-proposal-class-properties'
            ]
					} 
        } 
			}
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].bundle.css'
    })
  ]
};