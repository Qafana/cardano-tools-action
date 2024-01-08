import CopyPlugin from 'copy-webpack-plugin';

export default {
  target: 'node',
  optimization: {
    minimize: false, // This disables Terser
  },
  mode: 'production',
  plugins: [
  new CopyPlugin({
    patterns: [
      { from: 'src', 
      to: '.' ,
      globOptions: {
        ignore: [
          '**/main.js'
        ]
      }
    } // Adjust paths as needed
    ]
  })
]
};
