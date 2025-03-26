import { createSlice } from '@reduxjs/toolkit';
import { setLoad } from './loader.slice';
import appError from '../../utils/appError';
import api from '../../api/axios';

const eventSlice = createSlice({
  name: 'events',
  initialState: [],
  reducers: {
    setEvents: (state, action) => action.payload,
  },
});

export const { setEvents } = eventSlice.actions;

export default eventSlice.reducer;

export const eventsThunk =
  () => async (dispatch) => {
    dispatch(setLoad(false));
    const url = `/api/v1/events/`;
    await api
      .get(url)
      .then((res) => dispatch(setEvents(res.data)))
      .catch((err) => appError(err))
      .finally(() => dispatch(setLoad(true)));
};
