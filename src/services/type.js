import { request } from '@umijs/max';

/**
 * 获取类型列表
 * @returns {Array} 类型列表
 */
export const getTypeList = () => {
  return request('/api/type', {
    method: 'GET',
  });
};
