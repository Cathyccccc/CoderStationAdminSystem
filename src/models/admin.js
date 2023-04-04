import {
  getAdminListApi,
  addAdminApi,
  deleteAdminApi,
  editAdminApi,
} from '../services/admin';

export default {
  namespace: 'admin',
  state: {
    adminList: null, // 所有管理员
    adminInfo: null, // 当前登录管理员对象
  },
  reducers: {
    initAdminList(state, { payload }) {
      return {
        ...state,
        adminList: payload,
      };
    },
    addAdmin(state, { payload }) {
      const newAdminList = [...state.adminList, payload];
      return {
        ...state,
        adminList: newAdminList,
      };
    },
    delAdmin(state, { payload }) {
      const newAdminList = state.adminList.filter(
        (item) => item._id !== payload,
      );
      return {
        ...state,
        adminList: newAdminList,
      };
    },
    initAdminInfo(state, { payload }) {
      return {
        ...state,
        adminInfo: payload,
      };
    },
  },
  effects: {
    *_getAdminList({}, { put, call }) {
      const { data } = yield call(getAdminListApi); // 这里要用call来进行请求，而不要用普通的请求方式，否则页面拿不到数据
      yield put({ type: 'initAdminList', payload: data });
    },
    *_addAdmin({ payload }, { put, call }) {
      const { data } = yield call(addAdminApi, payload);
      yield put({ type: 'addAdmin', payload: data });
    },
    *_delAdmin({ payload }, { put, call }) {
      yield call(deleteAdminApi, payload);
      yield put({ type: 'delAdmin', payload });
    },
    *_editAdmin({ payload }, { put, call }) {
      const { id, newAdminInfo } = payload; // 这里必须先把参数解构出来再放入call，直接...payload会报错
      yield call(editAdminApi, id, newAdminInfo);
    },
  },
};
