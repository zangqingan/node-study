// 掘金自动签到
import schedule from "node-schedule";
import request from "axios";

const config = {
  cookie: "sessionid=42b484f3f3c95c4f9eb7ac2cce1ae5cf",
  url: "https://juejin.cn/",
  check_url: "https://api.juejin.cn/growth_api/v1/check_in?aid=2608&uuid=7217813664626279996",
};

schedule.scheduleJob("0 * * * * *", async () => {
  const result = await request.post(config.check_url, {
    headers: {
      Referer: config.url,
      Cookie: config.cookie,
    },
  });
  console.log("掘金自动签到成功", result.data);
});
