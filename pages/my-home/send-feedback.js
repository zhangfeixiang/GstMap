// pages/my-home/send-feedback.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        autosize: {
            maxHeight: 100,
            minHeight: 80
        },
        "title": "",
        "content": "",
        "mobile": "",
        "email": ""
    },

    async getUserInfo() {
        return new Promise(async (r, j) => {
            if (this.data.userId) r();
            const res = await wx.$api.getUserInfo();
            if (res.code == 200) {
                const {
                    userId
                } = res.user;
                this.setData({
                    userId,
                })
                r()
            }
        })
    },

    validateEmail(email) {
        // 常见的邮箱正则表达式
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    },
    validatePhoneNumber(phoneNumber) {
        // 假设手机号格式为11位数字，以1开头
        const phoneRegex = /^1[3-9]\d{9}$/;
        return phoneRegex.test(phoneNumber);
    },

    async handleFormSubmit() {
        if (!this.data.title) {
            wx.showToast({
                icon: 'none',
                title: '标题不能为空',
            })
        } else if (!this.data.mobile && !this.data.email) {
            wx.showToast({
                icon: 'none',
                title: '手机号和邮箱必须留一个',
            })
        } else if (this.data.email && !this.validateEmail(this.data.email)) {
            wx.showToast({
                icon: 'none',
                title: '请填写正确邮箱',
            })
        } else if (this.data.mobile && !this.validatePhoneNumber(this.data.mobile)) {
            wx.showToast({
                icon: 'none',
                title: '请填写正确的手机号',
            })
        }

        const res = await wx.$api.postReport({
            userId: this.data.userId,
            title: this.data.title,
            content: this.data.content,
            mobile: this.data.mobile,
            email: this.data.email,
        })
        if (res.code == 200) {
            this.setData({
                title: '',
                content: '',
                mobile: '',
                email: '',
            })
            wx.showToast({
                title: '反馈成功',
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