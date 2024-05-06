// pages/my-home/user-info.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userName: "",
        nickName: "",
        sex: "",
        phone: "",

        editMode: false
    },

    enterEditMode() {
        this.setData({
            editMode: true
        })
    },

    async submit() {
        const res = await wx.$api.putUserInfo({
            userId: this.data.userId,
            userName: this.data.userName,
            nickName: this.data.nickName,
            sex: this.data.sex,
            phone: this.data.phone
        })
        if (res.code === 200) {
            wx.showToast({
                title: '提交成功',
                icon: 'none'
            })
            this.setData({
                editMode: false
            })
        }
    },

    async getUserInfo() {
        const res = await wx.$api.getUserInfo();
        if (res.code == 200) {
            const {
                userName,
                nickName,
                sex,
                phone
            } = res.user;
            this.setData({
                userName,
                nickName,
                sex,
                phone
            })
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.getUserInfo()
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