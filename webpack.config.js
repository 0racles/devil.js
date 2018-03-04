var webpack = require("webpack"),
    path = require('path'),
    ExtractTextPlugin = require("extract-text-webpack-plugin"),
    ModernizrWebpackPlugin = require("modernizr-webpack-plugin"),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    bootstrapEntryPoints = require('./webpack.bootstrap.config'),
    imagemin = require('imagemin'),
   imageminJpegtran = require('imagemin-jpegtran'),
	 imageminPngquant = require('imagemin-pngquant'),
	 gifsicle = require('imagemin-gifsicle'),
	 mozjpeg = require('imagemin-mozjpeg'),
	 optipng = require('imagemin-optipng'),
	 pngquant = require('imagemin-pngquant'),
	 webp = require('imagemin-webp'),
 

	bootstrapconfig = bootstrapEntryPoints.dev;

module.exports = {
	entry: {
		global : './src/main_app.js', 
		vendor : [
				  bootstrapconfig
		],
	},
	output: {
	  // adding chunk hash for browser to distinguish modules from each other
	  filename : 'js/[name].js',
	  path: path.resolve(__dirname, './dist')
	},
	module : {
		rules : [
		    
          {
      	  	test: /\.ejs$/,
      	  	use: 'ejs-html-loader'
      	  },
          { test: /\.scss$/, 
          	use : ExtractTextPlugin.extract({ 
          		fallback : 'style-loader',
          		use : ['css-loader?url=false', 'sass-loader?sourceMap']

          	})
      },
      // for json loaders
       {
        test: /\.json$/,
        loader: 'json-loader'
      },
          
          // for font awesome TODO - possible that this isnt needed afterall since bootstrap's already exist
         { test: /\.woff(2)?(\?.*$|$)/, loader: "url-loader?limit=10000&mimetype=application/font-woff&name=font-awesome/[name].[ext]" },
      	   { test: /\.(ttf|eot|svg)(\?.*$|$)/, loader: "file-loader?name=fonts/[name].[ext]" }, 
  		  {
    		test: /\.(gif|png|jpe?g|svg)$/,
    		use : [
      		'file-loader?name=image&name=images/[name].[ext]', {
        	loader: 'image-webpack-loader',
        	options: {
          	gifsicle: {
            	interlaced: false,
         	 },
          	optipng: {
            	optimizationLevel: 7,
          	},
          	pngquant: {
            	quality: '65-90',
            	speed: 4
          	},
          	mozjpeg: {
            	progressive: true,
            	quality: 65
          	},
          // Specifying webp here will create a WEBP version of your JPG/PNG images
          	webp: {
            	quality: 75
          	}
        }
      }
    ]
  }
      	  // image loader ends here   	 
		]
	},	
  watchOptions : {
    ignored : /dist/
  },
	plugins : [
		new ExtractTextPlugin({ 
			filename :'css/[name].css',
			disable : false,
			allChunks : true
		}),
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery : 'jquery'
		}),

    // html template build for landing page - thinking highways
    new HtmlWebpackPlugin({
      hash : true,
      template : 'ejs-render-loader!./BaseBundle/resources/views/base.ejs',
      inject : 'body'
    }),

		new ModernizrWebpackPlugin(),
	]
};
