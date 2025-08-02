const
    //test device
    testDevieNameArray = 'null',
    testServiceId = "0000FF10-0000-1000-8000-00805F9B34FB",
    testCharacteristicId = "0000FF12-0000-1000-8000-00805F9B34FB";

const
    /**
     * 当新增设备时 !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
     * 需要修改deviceNameArray,deviceServiceAndCharacteristic,deviceConfig!!!!!!!!!!!
     * 都是更新在数组的末尾!!!!!!!!!!!!
     */


    //蓝牙的名称 新加的蓝牙名称写在数组deviceNameArray的末尾,测试的蓝牙设备名称也写在末尾
    deviceNameArray = [testDevieNameArray, "HC-08", "BT05", "MLT-BT05", "XWJv2", "XWJv3"],
    deviceNameSet = new Set();
deviceNameArray.forEach(v => deviceNameSet.add(v)); //初始化set
const

    /**
     * 蓝牙使用的服务号和特征值
     * 新增的加载数组deviceServiceAndCharacteristic末尾
     */
    deviceServiceAndCharacteristic = [{
            //test device 仅测试使用
            serviceId: testServiceId,
            characteristicId: testCharacteristicId,
        },
        {
            //"HC-08", "BT05", "MLT-BT05", "默认"使用此服务号和特征值
            serviceId: "0000FFE0-0000-1000-8000-00805F9B34FB",
            characteristicId: "0000FFE1-0000-1000-8000-00805F9B34FB"
        },
        {
            //"XWJv2" "XWJv3" 使用此服务号和特征值
            serviceId: "0000FFF0-0000-1000-8000-00805F9B34FB",
            characteristicId: "0000FFF2-0000-1000-8000-00805F9B34FB"
        },

    ],

    /**
     * 不同设备的配置信息
     * 新加的设备配置加到数组device_config末尾
     * map初始化传入二维数组
     */
    deviceConfig = new Map([
        //新增的设备配置按照[key,value]的形式
        ["default", {
            deviceNameArray: '',
            ...deviceServiceAndCharacteristic[1]
        }],
        //测试使用设备
        [testDevieNameArray, {
            deviceNameArray: deviceNameArray[0],
            ...deviceServiceAndCharacteristic[0]
        }],
        ["HC-08", {
            deviceNameArray: deviceNameArray[1],
            ...deviceServiceAndCharacteristic[1]
        }],
        ["BT05", {
            deviceNameArray: deviceNameArray[2],
            ...deviceServiceAndCharacteristic[1]
        }],
        ["MLT-BT05", {
            deviceNameArray: deviceNameArray[3],
            ...deviceServiceAndCharacteristic[1]
        }],
        ["XWJv2", {
            deviceNameArray: deviceNameArray[4],
            ...deviceServiceAndCharacteristic[2]
        }],
        ["XWJv3", {
          deviceNameArray: deviceNameArray[5],
          ...deviceServiceAndCharacteristic[2]
      }]
    ]),
    //获取设备对应的配置信息
    getDeviceConfig = (device) => {
        if (device && device.name)
            return deviceConfig.get(device.name) || Object.assign(deviceConfig.get("default"), {
                name: device.name
            })
        return deviceConfig.get("default")
    },
    //是否隐藏除吸污机以外的其他设备
    version = wx.getAccountInfoSync().miniProgram.envVersion,
    hideOtherDevices = (version == 'develop') ? false : (version == 'trial') ? false : true,
    //发送数据的含义
    sendDataMeaning = new Map([
        ['0', '时序对齐'],
        ['1', '清理或爬墙'],
        ['2', '定时'],
        ['3', '前进'],
        ['4', '左转'],
        ['5', '停止'],
        ['6', '右转'],
        ['7', '后退'],
        ['102', '左电机'],
        ['103', '灵敏度或爬墙时间'],
        ['104', '右电机'],
        ['105', '安全时间'],
        ['106', '机型'],

    ]),
    //定时发送0的时间
    sendInterval0 = 200
//新增变量在上一个变量后加逗号,
//形式为 const v1 = ... ,v2 = ...,v3 = ..., ....

module.exports = {
    deviceNameArray,
    deviceServiceAndCharacteristic,
    deviceConfig,
    getDeviceConfig,
    hideOtherDevices,
    deviceNameSet,
    sendDataMeaning,
    sendInterval0,
}