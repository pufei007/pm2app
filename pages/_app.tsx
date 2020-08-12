import { AppProps } from "next/app";
import { ConfigProvider } from "antd";
import zhCN from "antd/lib/locale/zh_CN";
import "../sprite/icon.css";
import "../antd-custom.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ConfigProvider locale={zhCN}>
      <Component {...pageProps} />
    </ConfigProvider>
  );
}

export default MyApp;
