const {
    qqmapsdk
} = require('../config/qqmap')
const {
    logInfo
} = require('../../utils/log')
const {
    LOCATION,
    INPUTCONFIG,
    LATESTCONNECTEDDEVICE,
} = require('../config/const')
let isShowLoading = false;
const
    /**
     * 读取arrayBuffer内容
     * @param {Arraybuffer} arrayBuffer Arraybuffer对象
     */
    FileSystemManager = wx.getFileSystemManager(),
    arrayBufferFilePath = `${wx.env.USER_DATA_PATH}/arrayBuffer.txt`,
    readArrayBuffer = (arrayBuffer) => {
        return new Promise((res, rej) => {
            FileSystemManager.writeFile({
                filePath: arrayBufferFilePath,
                data: arrayBuffer,
                encoding: 'utf8',
                success(e) {
                    console.log(arrayBuffer);
                    FileSystemManager.readFile({
                        filePath: arrayBufferFilePath,
                        encoding: 'utf8',
                        success(e) {
                            console.log(e.data);
                            res(e.data)
                        },
                        fail(err) {
                            rej(err)
                        }
                    })
                    res(e)

                },
                fail(err) {
                    rej(err)
                }
            })
        })

    },
    showLoading = (title, options) => {
        if (isShowLoading)
            wx.hideLoading();
        wx.showLoading({
            title,
            mask: true,
            success: (res) => {
                isShowLoading = true
            },
            fail: (res) => {},
            complete: (res) => {},
            ...options,
        })
    },
    hideLoading = () => {
        if (isShowLoading)
            try {
                isShowLoading = false
                wx.hideLoading();

            } catch (err) {
                //捕获影藏失败
                console.log(err);
            }

    },
    showToast = (title, options) => {
        logInfo('showToast[提示]: ', title)
        wx.showToast({
            title,
            duration: 1500,
            icon: 'none',
            mask: true,
            ...options
        })
    },
    getLocation = (latitude, longitude) => { //把经纬度转换成地理位置
        return new Promise((resolve, reject) => {
            qqmapsdk.reverseGeocoder({ //使用腾讯位置服务的API传入经纬度
                location: {
                    latitude: latitude,
                    longitude: longitude
                },
                success: function (res) {
                    resolve(res)
                },
                fail: function (err) {
                    reject(err)
                }
            });
        })

    },
    //设置微信信息缓存
    setLocationStorage = (storage) => {
        wx.setStorageSync(LOCATION, storage)
    },
    //返回微信位置信息缓存
    getLocationStorage = () => {
        return wx.getStorageSync(LOCATION) || {}
    },
    //清除位置信息缓存
    clearLocationStorage = () => {
        wx.removeStorageSync(LOCATION)
    },
    //设置硬件配置缓存
    setInputStorage = (storage) => {
        wx.setStorageSync(INPUTCONFIG, storage)
    },
    //返回硬件配置缓存
    getInputStorage = () => {
        return wx.getStorageSync(INPUTCONFIG) || []
    },
    //清除硬件配置缓存
    clearInputStorage = () => {
        wx.removeStorageSync(INPUTCONFIG)
    },
    //设置上次连接设备缓存
    setLatestDeviceStorage = (storage) => {
        wx.setStorageSync(LATESTCONNECTEDDEVICE, storage)
    },
    //返回上次连接设备缓存
    getLatesDeviceStorage = () => {
        return wx.getStorageSync(LATESTCONNECTEDDEVICE) || {}
    },
    //清除上次连接设备缓存
    clearLatesDeviceStorage = () => {
        wx.removeStorageSync(LATESTCONNECTEDDEVICE)
    },

    resAndInfo = (res, info, msg, ...args) => {
        return {
            res, //结果变量
            info, //结果对象
            msg, //结果描述
            ...args
        }
    }

module.exports = {
    FileSystemManager,
    arrayBufferFilePath,
    readArrayBuffer,
    showLoading,
    hideLoading,
    showToast,
    getLocation,
    //设置微信信息缓存
    setLocationStorage,
    //返回微信位置信息缓存
    getLocationStorage,
    //清除位置信息缓存
    clearLocationStorage,
    //设置硬件配置缓存
    setInputStorage,
    //返回硬件配置缓存
    getInputStorage,
    //清除硬件配置缓存
    clearInputStorage,
    //设置上次连接设备缓存
    setLatestDeviceStorage,
    //返回上次连接设备缓存
    getLatesDeviceStorage,
    //清除上次连接设备缓存
    clearLatesDeviceStorage,
    //promise只能返回一个值,使用以下函数返回对象
    resAndInfo,


}