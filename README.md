# Google-map-react-boilerplate
  - Using https://github.com/google-map-react/google-map-react
  - Using https://github.com/chekuda/webpack-react-serverside-rendering

# Webpack-React-SSR

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

## Make it work with not hot reloaded

  - Create the bundle with `npm run dev`
  - The physical bundle.js, main.css and index.handlebars will be created in `dist` folder
  - Now is time to Run `npm start`. This will run the server, serving what we have in our routes which will serve our `index.handlebar` already created.
  - The server will be kicked out only the first time which will serve all the bundle and the view required. In the client, react will handle all the views rendering.

## Implement HMR

# React Hot Loader

  - How it works?
  Then the HMR runtime receives an updated module, it first checks to see if the module knows how to update itself. It then goes up the import/require chain, lookinf dor a parent module that can accept the update. The added code allows our root component to accept an update from any child component.

  `Note that the internal state will not be preserved, since a new copy of the component has been mounted. State that is kept externally in a state store, such a Redux.`

  - Preserve the internal state
  I need to adda react-hot-loader. I have to ways of doing it.
  1. By .babelsrc
    ```
    {
      "plugins": ["react-hot-loader/babel]
    }
    ```

  2. By webpack
    ```
    {
      loaders: [{
        test: /\.(js|jsx)$/,]
        loaders: ['react-hot-loader/webpack', 'babel'],
        include: path.join(__dirname, 'src')
      }]
    }
    ```

  `Note: react-hot-loader/webpack only works in exported components, whereas react-hot-loader/babel picks up all top-level variables in your files. As a workaround, with webpack, you can export all the components whose state you want to maintain, even if they are not imported anywere else.`

  3. Add this lines in your webpack entry point.
    ```
    {
      entry: [ 
        'react-hot-loader/patch', // RHL patch
      './scripts/index' // Your appʼs entry point
      ]
    }
    ```

  4. Wrap my entry file with a top-level component provided by RHL called `<AppContainer>` which hanle hot reloading as well as error handling. Also handles disabling hot reloading/error handling when running in production environment.

  `Note: If I dont want to duplicate the require in the entry component, I will have to put `modules: false` in my .babelsrc`

  ```
    [ "env", { "modules": false } ],
  ```

  `Note: Another option is require the module within the index.js when module.hot and not use modules:false`

  ```
  if(module.hot) {
    module.hot.accept('./App', () => {
      const App = require('./App').default;
      render(App)
    })
  }
  ```

# Add a webpack middleware configuration

  - All this Hot loader will be used in dev mode
  - As nodemon would restart the server, I need to reload the component which has been changed in dev mode and served in runtime. Thats why we need this hot loader.
  - In order to make this works, Im going to install and set up:
    - `webpack-dev-middleware`: An express-style development middleware for use with webpack bundles and allows for serving of the files emitted from webpack. This should be used for development only.
    - `webpack-hot-middleware`: Webpack hot reloading using only webpack-dev-middleware. This allows you to add hot reloading into an existing server without webpack-dev-server.
    - Specific webpack configuration

  - First I need to set up the `webpack.config.server.js` file.
    - NOTE:
      - I need to `target node` as this is only for server
      - I need to use `nodeExternals` for ignores node_modules when bundling in Webpack.
      - Add some plugins (ask nick)

  - Second I need to config the `expresswebpack` file:

  - Then I need to add the middleware to my server file with a `only in dev` flag
    ```
    if(process.env.ENV !== 'prod') {
      require('./middleware/expresswebpack.js').default(server)
    }
    ```

  - Interesting plugins:
    - new webpack.HotModuleReplacementPlugin(): In order to enable HRM when server require webpack again
    - new webpack.IgnorePlugin(/\.css$/): For ignoring require css files in node
    - new HtmlWebpackHarddiskPlugin(): To inject the a new physical HTML in the server

  - In order to use CSS with with miniextractCSS plugin, I Will have to extract the css when bundle it with this.
    ```
      {
        test: /\.css$/,
        use: [
          'extracted-loader',
          MiniCssExtraPlugin.loader,
          'css-loader'
        ]
      }
    ```
## Redux

- Install redux and react-redux
- Create a redux folder with all redux configuration
  - Create a rootReducer file (reducers) with gather all the reducers within your project and injected as first argument in your createStore
  - Create your first reducer with Actions and types in the same file `duck style` (many different ways of setting up)
- Create a file called configure store which received the initialState and return the store. This will be used as client and server side can receive diferent initialState and enhancers.
  ```
    const configureStore = (initState, isDev) => {
      const thirdPartyEnhances =
        isDev === 'isDev'
        ? undefined
        : window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

      return createStore(
        rootReducers,
        initState,
        thirdPartyEnhances
      )
    }
  ```
- Configure the store:
  - BackEnd:
    - The initialState will be added within the window object to be used by the clientSide therefore it will work faster, because react will have access immediately to this value so it will not have to wait.
    ```
    const store = configureStore(initialState(), 'isDev')

    const map = (req, res) => {
      const appToString =
        renderToString(
          <Provider store={store}>
            <App/>
          </Provider>
        )

      const templateData = {
        initialHtml: appToString,
        initialStore: JSON.stringify(store.getState())
      }

    ```
  - FrontEnd: will only create the store with the `createStore` from the configureStore file and pass it to the `Provider`

### Usage of store

- When creating a container I need to connect it with the redux store so I will use `connect` from `react-redux`
- When creating a connect I need to export it as default and passing the `store` and the `dispatch`

```
  const mapDispatchToProps = (dispatch) => ({
  changeText: (text) => dispatch(changeText(text))
  })

  const mapStateToProps = ({ appReducer }) => ({
    myState: appReducer
  })

  export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)

```

