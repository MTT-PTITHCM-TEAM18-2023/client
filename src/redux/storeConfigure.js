import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./../reducers/index";
import createSagaMiddleware from "redux-saga";
import mySaga from "./../sagas/mySaga";

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers =
  process.env.NODE_ENV !== "production" &&
  typeof window === "object" &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        shouldHotReload: false,
      })
    : compose;

const configureStore = () => {
  const middleware = [sagaMiddleware];
  const enhancers = [applyMiddleware(...middleware)];
  const store = createStore(rootReducer, composeEnhancers(...enhancers));
  sagaMiddleware.run(mySaga);
  return store;
};

export default configureStore;
