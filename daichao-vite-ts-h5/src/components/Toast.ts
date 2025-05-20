import { Toast as AntdToast } from "antd-mobile";

class Toast {
  static showLoading(content?: string) {
    try {
      // 新版本直接使用 show 方法
      return AntdToast.show({
        icon: "loading",
        content: content || "加载中...",
        duration: 0,
        maskClickable: false,
      });
    } catch (error) {
      console.error("Toast.showLoading failed:", error);
      // 返回一个包含 close 方法的对象以保持接口一致
      return {
        close: () => {},
      };
    }
  }

  static success(content: string, duration?: number) {
    AntdToast.show({
      icon: "success",
      content,
      duration: duration || 2000,
    });
  }

  static fail(content: string, duration?: number) {
    AntdToast.show({
      icon: "fail",
      content,
      duration: duration || 2000,
    });
  }

  static show(content?: string) {
    return AntdToast.show({ content: content, duration: 2000, maskClickable: false });
  }

  static clear() {
    AntdToast.clear();
  }
}

export { Toast };
