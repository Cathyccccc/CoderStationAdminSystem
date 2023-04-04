import { request } from '@umijs/max';

/**
 * 分页获取面试题
 * @param {Object} pagination 分页对象
 * @returns {Array} 面试题列表
 */
export const getInterviewByPageApi = (pagination) => {
  return request('/api/interview', {
    method: 'GET',
    params: pagination,
  });
};

/**
 * 根据id获取面试题对象
 * @param {String} id 面试题_id
 * @returns {Object} 面试题对象
 */
export const getInterviewByIdApi = (id) => {
  return request(`/api/interview/${id}`, {
    method: 'GET',
  });
};

/**
 * 新增面试题
 * @param {Object} newInterviewInfo 要新增的面试题对象
 */
export const addInterviewApi = (newInterviewInfo) => {
  return request('/api/interview', {
    method: 'POST',
    data: newInterviewInfo,
  });
};

/**
 * 修改面试题
 * @param {String} id 面试题_id
 * @param {Object} newInterviewInfo 修改后的面试题对象
 */
export const editInterviewApi = (id, newInterviewInfo) => {
  return request(`/api/interview/${id}`, {
    method: 'PATCH',
    data: newInterviewInfo,
  });
};

/**
 * 根据id删除面试题
 * @param {String} id 面试题_id
 */
export const delInterviewApi = (id) => {
  return request(`/api/interview/${id}`, {
    method: 'DELETE',
  });
};
