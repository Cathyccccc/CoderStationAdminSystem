import { request } from '@umijs/max';

/**
 * 获取所有管理员
 * @returns {Array}
 */
export function getAdminListApi() {
  return request('/api/admin', {
    method: 'GET',
  });
}

/**
 * 新增管理员
 * @param {Object} newAdminInfo 新增的管理员对象
 * @returns
 */
export function addAdminApi(newAdminInfo) {
  return request('/api/admin', {
    method: 'POST',
    data: newAdminInfo,
  });
}

/**
 * 根据id获取管理员对象
 * @param {String} id 管理员id
 * @returns {Object}
 */
export function getAdminByIdApi(id) {
  return request(`/api/admin/${id}`, {
    method: 'GET',
  });
}

/**
 * 根据id删除管理员
 * @param {String} id 管理员id
 */
export function deleteAdminApi(id) {
  return request(`/api/admin/${id}`, {
    method: 'DELETE',
  });
}

/**
 * 根据id修改管理员对象
 * @param {String} id 管理员id
 * @param {Object} newAdminInfo 修改后的管理员对象
 * @returns
 */
export function editAdminApi(id, newAdminInfo) {
  console.log(id, newAdminInfo);
  return request(`/api/admin/${id}`, {
    method: 'PATCH',
    data: newAdminInfo,
  });
}
