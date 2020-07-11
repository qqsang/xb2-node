import app from "./app";
import { connection } from "./app/database/mysql";
//import { APP_PORT } from "./app/app.config";
app.listen(3000, () => {
  console.log("服务已启动");
});

connection.connect((error) => {
  if (error) {
    console.log("数据库链接失败", error.message);
    return;
  }
  console.log("数据库链接成功");
});
