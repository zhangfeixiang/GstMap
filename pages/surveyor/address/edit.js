// pages/surveyor/address.js
import {
    items
} from './../../../mock/items'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo: {
            "standardName": "",
            "type": "",
            "county": "房山区",
            "street": "",
            "community": "",
            "longitude": 0,
            "latitude": 0,
            "isHouseTable": 0,
            "road": "",
            "houseNo": "",
            "placeName": "",
            "aoiParent": "",
            "aoiChild": "",
            "building": "",
            "boardImg": "",
            "imgUrl": "",
            remarks: ""
        },
        streetItems: [items[7]],
        showPopupStreet: false,
        locationStr: ""
    },
    async onGetLocation() {
        const res = await wx.chooseLocation();
        this.setData({
            locationStr: res.longitude + "," + res.latitude,
            "userInfo.longitude": res.longitude,
            "userInfo.latitude": res.latitude
        })
    },
    onChangeType(e) {
        this.setData({
            "userInfo.type": e.detail,
        });
    },

    onShowPopupStreet() {
        this.setData({
            showPopupStreet: true
        })
    },

    onClosePopupStreet() {
        this.setData({
            showPopupStreet: false
        })
    },

    onClickNav() {},
    onClickStreet(e) {
        this.setData({
            "userInfo.street": e.detail.text,
            showPopupStreet: false
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

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

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})