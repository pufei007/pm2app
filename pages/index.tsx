import { Button, DatePicker,Space,Alert  } from "antd";
import styles from "./index.module.scss";
const Home = () => {
  return (
    <div className={styles.test}>
      <p>home page</p>
       <Button>sfsdfs</Button>
      <DatePicker /> 
      <Space>
      Space
    </Space>
    <Alert message="Success Text" type="success" />
    </div>
  );
};

export default Home;
