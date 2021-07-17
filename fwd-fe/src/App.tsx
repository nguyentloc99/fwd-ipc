import React, { FC } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Router } from 'react-router-dom';
import { Slide, ToastContainer } from 'react-toastify';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import theme from 'assets/themes/main';
import { history } from 'helpers/history.helper';
import store from 'store';
import allRoutes from 'routes/all.route';

import 'react-virtualized-select/styles.css';
import 'react-toastify/dist/ReactToastify.css';
import './assets/css/styles.scss';
import CustomSwitch from 'routes/custom-switch/CustomSwitch';

const App: FC = () => {
  return (
    <>
      <Provider store={store.store}>
        <PersistGate loading={null} persistor={store.persistor}>
          <ThemeProvider theme={theme}>
            <Router history={history}>
              <CustomSwitch routes={allRoutes} />
            </Router>
          </ThemeProvider>
        </PersistGate>
      </Provider>
      <ToastContainer
        hideProgressBar={true}
        position={'top-right'}
        transition={Slide}
      />
    </>
  );
};

export default App;
