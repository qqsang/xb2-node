import { resolve } from "path";
import { rejects } from "assert";
import { SSL_OP_NETSCAPE_REUSE_CIPHER_CHANGE_BUG } from "constants";

const nature = () => {
  console.log("加载中...");
  return new Promise((resolve, rejects) => {
    setTimeout(() => {
      resolve("加载完成");
    }, 2000);
  });
};

/**
 * 异步函数async
 */
const demo = async () => {
  const data = await nature();
  console.log(data);
};

demo();

/*nature().then((data) => {
  console.log(data);
});*/
console.log("我接着做执行");
