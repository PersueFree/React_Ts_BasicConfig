type CallbackFunction = (data?: string) => void;
type ResponseCallbacks = Record<string, CallbackFunction>;

interface WebViewMessage {
  action: string;
  data?: string;
  callbackId: string | null;
}

declare global {
  interface Window {
    [key: string]: unknown;
    isFlutterInAppWebViewReady: boolean;
    flutter_inappwebview?: {
      callHandler: (handlerName: string, message: WebViewMessage) => void;
    };
    webkit?: {
      messageHandlers: {
        [key: string]: {
          postMessage: (message: WebViewMessage) => void;
        };
      };
    };
  }
}

export default class WebViewBridge {
  private bridgeName: string;
  private uniqueId: number;
  private responseCallbacks: ResponseCallbacks;

  constructor(bridgeName: string) {
    this.bridgeName = bridgeName;
    this.uniqueId = 0;
    this.responseCallbacks = {};

    // 安全地挂载到 window 对象
    if (typeof window !== "undefined") {
      window[bridgeName] = this;
      window.isFlutterInAppWebViewReady = false;

      window.addEventListener("flutterInAppWebViewPlatformReady", () => {
        window.isFlutterInAppWebViewReady = true;
      });
    }
  }

  send(action: string, data?: string, callback?: CallbackFunction): void {
    if (typeof window === "undefined") {
      console.error("WebViewBridge: Window object not available");
      return;
    }

    const message: WebViewMessage = {
      action,
      data,
      callbackId: null,
    };

    if (typeof callback === "function") {
      const callbackId = `cb_${this.uniqueId++}`;
      this.responseCallbacks[callbackId] = callback;
      message.callbackId = callbackId;
    }

    const invokeHandler = (): void => {
      try {
        if (window.flutter_inappwebview?.callHandler) {
          window.flutter_inappwebview.callHandler(this.bridgeName, message);
        }
        // 兼容 iOS 的 webkit 消息处理器
        else if (window.webkit?.messageHandlers?.[this.bridgeName]?.postMessage) {
          window.webkit.messageHandlers[this.bridgeName].postMessage(message);
        } else {
          throw new Error("No available bridge handler found");
        }
      } catch (error) {
        console.error("WebViewBridge send error:", error);
        if (message.callbackId) {
          delete this.responseCallbacks[message.callbackId];
        }
      }
    };

    if (window.isFlutterInAppWebViewReady) {
      invokeHandler();
    } else {
      const readyHandler = () => {
        window.removeEventListener("flutterInAppWebViewPlatformReady", readyHandler);
        invokeHandler();
      };
      window.addEventListener("flutterInAppWebViewPlatformReady", readyHandler);
    }
  }

  handleMessage(message: { data?: string; callbackId?: string }): void {
    if (!message?.callbackId) return;

    const handler = this.responseCallbacks[message.callbackId];
    if (typeof handler === "function") {
      try {
        handler(message.data);
      } catch (error) {
        console.error("WebViewBridge callback error:", error);
      }
      delete this.responseCallbacks[message.callbackId];
    }
  }

  // 清理方法
  destroy(): void {
    if (typeof window !== "undefined" && window[this.bridgeName] === this) {
      delete window[this.bridgeName];
    }
    this.responseCallbacks = {};
  }
}
