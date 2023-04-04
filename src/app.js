// 运行时配置
import '@toast-ui/editor/dist/toastui-editor.css';
import { useSelector } from '@umijs/max';

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate
export async function getInitialState() {
  return { name: '' };
}

export const layout = () => {
  return {
    // logo: '',
    menu: {
      locale: false,
    },
  };
};
