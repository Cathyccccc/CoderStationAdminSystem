import { request } from '@umijs/max';

/**
 * 根据分页获取用户列表
 * @param {Object} pagination 分页对象
 * @returns {Array} 用户列表
 */
export const getUserByPageApi = (pagination) => {
  return request('/api/user', {
    method: 'GET',
    params: pagination,
  });
};

/**
 * 根据id获取用户对象
 * @param {String} id 用户_id
 * @returns {Object} 用户对象
 */
export const getUserByIdApi = (id) => {
  return request(`/api/user/${id}`, {
    method: 'GET',
  });
};

/**
 * 新增用户
 * @param {Object} newUserInfo 要新增的用户对象
 */
export const addUserApi = (newUserInfo) => {
  newUserInfo.type = 'background'; // 后台添加用户
  return request('/api/user', {
    method: 'POST',
    data: newUserInfo,
  });
};

/**
 * 修改用户
 * @param {String} id 用户_id
 * @param {Object} newUserInfo 修改后的用户对象
 */
export const editUserApi = (id, newUserInfo) => {
  return request(`/api/user/${id}`, {
    method: 'PATCH',
    data: newUserInfo,
  });
};

/**
 * 根据id删除用户
 * @param {String} id 用户_id
 */
export const delUserApi = (id) => {
  return request(`/api/user/${id}`, {
    method: 'DELETE',
  });
};
