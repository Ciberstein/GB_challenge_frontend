import { createSlice } from '@reduxjs/toolkit';
import { setLoad } from './loader.slice';
import appError from '../../utils/appError';
import api from '../../api/axios';

const reserveSlice = createSlice({
  name: 'reserves',
  initialState: [],
  reducers: {
    setReserves: (state, action) => action.payload,
  },
});

export const { setReserves } = reserveSlice.actions;

export default reserveSlice.reducer;

export const reservesThunk =
  () => async (dispatch) => {
    dispatch(setLoad(false));
    const url = `/api/v1/events/reserve/me`;
    await api
      .get(url)
      .then((res) => dispatch(setReserves(res.data)))
      .catch((err) => appError(err))
      .finally(() => dispatch(setLoad(true)));
};
