// pages/myHome/index.js
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        user: {}
    },
    goUserInfo() {
        wx.navigateTo({
            url: './user-info',
        })
    },
    logout() {
        wx.showModal({
            title: '提示',
            content: '确定退出吗？',
            complete: (res) => {
                if (res.confirm) {
                    wx.removeStorageSync('loginData');
                    wx.navigateTo({
                        url: '/pages/login/index',
                    })
                }
            }
        })
    },
    login() {
        const loginData = wx.getStorageSync('loginData') || {};
        if (loginData.token) return;
        wx.navigateTo({
            url: '/pages/login/index',
        })
    },
    async getData() {
        const res = await wx.$api.getUserInfo();
        if (res.code == 200) {
            this.setData({
                user: res.user
            })
        }
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
        this.getData()
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