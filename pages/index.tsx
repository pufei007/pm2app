import { Button, DatePicker } from "antd";
import styles from './index.module.scss'
const Home = () => {
  return <div className={styles.test}>
    <p>sdfsdf</p>
    <span className="ui-icon ui-icon__alipay"></span>
    <img src="/static/image/chibang.png" alt="" />
      {/* <img src={require("../assets/chibang.png")} alt=""/> */}
      <span className="ui-icon ui-icon__alipay"></span>
      <Button>sfsdfs</Button>
      <DatePicker/>
  </div>;
};

export default Home;
