// pages/surveyor/place/area.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        polygons: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        const eventChannel = this.getOpenerEventChannel();
        eventChannel && eventChannel.on('current', (data) => {
            console.log(data)
            this.setData({
                latitude: data.begin.latitude,
                longitude: data.begin.longitude,
                polygons: [{
                    dashArray: [10, 10], //描边线默认为实线，如果需要虚线使用这个属性，接收两个值的数组，分别是实线和虚线的长度
                    strokeWidth: 1, //描边的宽度
                    strokeColor: "#555555", //描边的颜色,只接受16进制和RGBA格式
                    fillColor: "#7cb5ec88", //多边形围绕成的空间的填充色
                    zindex: 4, //多边形z轴数值
                    level: 'abovelabels', //压盖层级
                    points: [{
                        latitude: data.begin.latitude,
                        longitude: data.begin.longitude
                    }, {
                        latitude: data.begin.latitude,
                        longitude: data.end.longitude
                    }, {
                        latitude: data.end.latitude,
                        longitude: data.end.longitude
                    }, {
                        latitude: data.end.latitude,
                        longitude: data.begin.longitude
                    }, ]
                }]
            })
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    }
})