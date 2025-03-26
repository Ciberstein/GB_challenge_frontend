import { configureStore } from '@reduxjs/toolkit';
import darkMode from './slices/darkMode.slice';
import loader from './slices/loader.slice';
import account from './slices/account.slice';
import reserves from './slices/reserves.slice';
import events from './slices/events.slice';

const store = configureStore({
  reducer: {
    reserves,
    events,
    account,
    darkMode,
    loader
  },
});

export default store;
