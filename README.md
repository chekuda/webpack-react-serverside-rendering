# REACT-GOOGLE-MAPS

## Install and set up webpack
  - Set up dev and prod environments
  - Install and setUp babel
  - Resolve css imports with minicssextractplugin in prod and style-loader in dev(HMR)
  - Enable source-map for prod
  - Enable HMR in dev environment
  - Install `html-webpack-plugin` in order to build the final html with the final bundle and css. Node: This will be the template for express to serve the initialHTML.

## Install and setUp express for SSR
  - Install babel-register
  - Install and set up express
  - Set up the routes and controllers
  - Set up views. Im going to use handlebars as views engine
  - If only using nodejs to run server (no webpack 'ignore-loader') I need to ignore css files with 'ignore-styles'

## Install React

  - Install React and react-dom
  - Add preset-react to babelrc for render react
  - Create first component in react (App)
  - Import the component in the controller and use `renderToString` in order to pass the whole string with the react markup within it.