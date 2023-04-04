import { request } from '@umijs/max';

/**
 * 获取验证码
 * @returns
 */
export const getCaptchaApi = () => {
  return request('/res/captcha', {
    method: 'GET',
  });
};

/**
 * 管理员登录
 * @param {Object} loginInfo 要登录的管理员信息对象
 * @returns 是否登录成功
 */
export const adminLoginApi = (loginInfo) => {
  return request('/api/admin/login', {
    method: 'POST',
    data: loginInfo,
  });
};

/**
 * 判断登录用户是否已经注册，账号是否存在
 * @param {String} loginId 用户账号名
 * @returns {Boolean} 用户是否存在
 */
export const adminIsExistApi = (loginId) => {
  return request(`/api/admin/adminIsExist/${loginId}`, {
    method: 'GET',
  });
};
