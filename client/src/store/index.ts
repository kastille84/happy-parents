import { configureStore} from '@reduxjs/toolkit';
// will be moved onto it's own file
import { createSlice } from '@reduxjs/toolkit';

const initialDummyState = {
  isDummy: true
}

const dummySlice = createSlice({
  name: 'dummy',
  initialState: initialDummyState,
  reducers: {
    toggleDummy(state) {
      state.isDummy = !state.isDummy;
    }
  }
})

const store = configureStore({
  reducer: {
    dummy: dummySlice.reducer
  }
});

export default store;
