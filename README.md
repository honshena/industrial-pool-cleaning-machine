# 注意事项
1. 小程序隐藏设备和新老页面跳转是靠的识别蓝牙的name,具体是通过deviceNameSet.has(e.name)
2. 新老页面都有1的逻辑且使用的deviceNameSet是同一个,改动时注意会不会互相影响