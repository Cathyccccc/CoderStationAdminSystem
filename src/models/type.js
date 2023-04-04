import { getTypeList } from '../services/type';

export default {
  namespace: 'type',
  state: {
    typeList: null,
  },
  reducers: {
    initTypeList(state, { payload }) {
      return {
        ...state,
        typeList: payload,
      };
    },
  },
  effects: {
    *_getTypeList({}, { put, call }) {
      const { data } = yield call(getTypeList);
      yield put({ type: 'initTypeList', payload: data });
    },
  },
};
