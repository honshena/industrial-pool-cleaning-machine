const {
  PAGE_VERSION,
  SHOWPAGE
} = require('../../config/const.js')
const {
  logWarn,
} = require('../../utils/log.js')
const {
  BluetoothManager
} = require("../../BluetoothController.js")
const {
  deviceConfig,
  isAcceptDataValid,
  warningH,
  warningL,
  acceptMAXInterval,
  acceptInterval,
  awaitInterval,
} = require('../../config/bluetooth.js')
const {
  showLoading,
  hideLoading,
  getLocation,
  getLocationStorage,
  getInputStorage,
  getLatesDeviceStorage,
  showToast,
  resAndInfo,
  requestJSONFile,
  ab2str,
  ab2hex,
} = require('../../utils/utils.js'),
  app = getApp();
var buletoothManager; //适合全局直接访问


Page({
  data: {},
  async onLoad(onLoadInfo) {
    this.showPage()
  },
  async showPage({
    retry
} = {}) {
    const pageKey = wx.getStorageSync(SHOWPAGE) || 'lastest';
    const url = '/' + PAGE_VERSION[pageKey]?.path
    wx.redirectTo({
        url,
        success: (res) => {
            logWarn(`跳转至页面: ${url}`, res)
        },
        fail: err => {
            console.log('小程序跳转页面错误', err);
            if (retry) {
                this.showPage({
                    retry: false
                })
            }
        }
    })
},
});