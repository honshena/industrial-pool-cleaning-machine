const pageStoragePrefix = "new-v3-";
const SHOWPAGE = pageStoragePrefix + "showPagePath";
// 最新的页面key
const DEFAULT_SHOWPAGE = "lastest";
// 最新的页面路径
const DEFAULT_SHOWPAGE_PATH = "pages/newIndex/newIndex";
const PAGE_KEYS = {
  v3: "v3",
  lastest: DEFAULT_SHOWPAGE,
};
const PAGE_VERSION = {
  [PAGE_KEYS.v3]: {
    name: "V3-适用老机型",
    version: "3.0.7",
    path: "pages/v3/v3",
  },
  [DEFAULT_SHOWPAGE]: {
    name: "最新版",
    version: wx.getAccountInfoSync()?.miniProgram?.version,
    path: DEFAULT_SHOWPAGE_PATH,
  },
};

//常量配置
module.exports = {
  /**
   * 微信位置信息读取所需常量: location
   * wx.setStorageSync('location', t)
   *  */
  LOCATION: pageStoragePrefix + "location",
  /**
   * 硬件配置读取所需常量: location
   * wx.setStorageSync('input', t)
   *  */
  INPUTCONFIG: pageStoragePrefix + "input",
  /**
   * 最近连接设备缓存所需常量: location
   * wx.setStorageSync('latestConnectedDevice', t)
   *  */
  LATESTCONNECTEDDEVICE: pageStoragePrefix + "latestConnectedDevice",
  SHOWPAGE,
  /**
   * 当设备为吸污机时显示设备名称为吸污机
   * 当设备不是吸污机时显示未知设备
   */
  DEVICENAME: "吸污机",
  UNKNOWNDEVICE: "未知设备",
  NEED_SERVICE_ID: "需要输入serviceId",
  NEED_CHARACTER_ID: "需要输入character id",
  PAGE_VERSION,
  DEFAULT_SHOWPAGE,
  PAGE_KEYS,
  changePageVersion: (key) => {
    if (key) {
      let pageKey = PAGE_KEYS.lastest;
      let url = "/" + PAGE_VERSION[pageKey].path;
      if (PAGE_KEYS[key]) {
        pageKey = key;
        url = "/" + PAGE_VERSION[pageKey].path;
      }
      wx.redirectTo({
        url,
        success: () => {
          wx.setStorageSync(SHOWPAGE, pageKey);
        },
      });
      return;
    } else {
      const pages = getCurrentPages() || [];
      const currentPage = pages?.[pages.length - 1];
      const pageKeys = Object.keys(PAGE_VERSION);
      wx.showActionSheet({
        itemList: pageKeys.map(
          (k) =>
            `${PAGE_VERSION[k].name}${
              PAGE_VERSION[k].path === currentPage?.route ? "(当前)" : ""
            }`
        ),
        success(res) {
          const pageKey = pageKeys[res.tapIndex];

          wx.redirectTo({
            url:
              "/" + PAGE_VERSION[pageKey].path || "/" + DEFAULT_SHOWPAGE_PATH,
            success: () => {
              wx.setStorageSync(SHOWPAGE, pageKey);
            },
          });
        },
        fail(res) {
          console.error("跳转页面失败: ", res);
        },
      });
    }
  },
  // 用户的机型-老
  OldModels: [
    {
      label: "RM-100",
      value: 1,
    },
  ],
  // 用户的机型-新
  Models: [
    {
      label: "RM-100",
      value: 1,
    },
  ],
};
