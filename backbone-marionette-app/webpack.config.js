const path = require("path");

module.exports = {
  entry: "./src/single-spa-entry.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    libraryTarget: "system", // Utilisé pour Single-SPA
    publicPath: "http://localhost:8082/",
    clean: true // Nettoie le dossier dist avant de générer un nouveau bundle
  },
  mode: "development",
  devServer: {
    port: 8082,
    allowedHosts: "all",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization",
    },
    historyApiFallback: true,
    hot: true,
    liveReload: true,
    compress: true
    },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      },
      {
        test: /\.tpl$/,
        use: "raw-loader"
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.html$/,
        use: "html-loader"
      }
    ]
  },
  resolve: {
    extensions: [".js"],
    alias: {
      app: path.resolve(__dirname, "src/app.js")
    }
  },
  
  
  
};
