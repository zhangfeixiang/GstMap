// pages/login/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        username: "",
        password: "",
        wxCode: "",
        uuid: "",
        code: "",
        captchaImage: ""
    },

    async login() {
        // const getCode = await this.wxLogin();
        // this.setData({
        //     wxCode: getCode.code
        // })

        const res = await wx.$api.postLogin({
            // wxCode: getCode.code,
            username: this.data.username,
            password: this.data.password,
            uuid: this.data.uuid,
            code: this.data.code - 0,
        });
        console.log('login', res)
        if (res.code == 200) {
            wx.showToast({
                title: '登录成功',
                icon: "none"
            });
            wx.setStorageSync("loginData", {
                ...res,
                token: res.token
            })
            wx.reLaunch({
                url: '/pages/index/index',
            })
        } else {
            wx.showToast({
                title: res.msg,
                icon: 'none'
            })
            this.getCaptchaImage()
        }
    },
    // 免密登录
    async autoLogin() {
        const getCode = await this.wxLogin();
        this.setData({
            wxCode: getCode.code
        })

        const res = await wx.$api.postLogin({
            wxCode: getCode.code,
        });
        console.log('login', res)
        if (res.code == 200) {
            wx.showToast({
                title: '登录成功',
                icon: "none"
            });
            localStorage.setItem("loginData", {
                ...res,
                token: res.token
            })
        } else {
            wx.showToast({
                title: res.msg,
                icon: 'none'
            })
        }
    },
    async wxLogin() {
        return wx.login()
    },

    async getCaptchaImage() {
        const res = await wx.$api.getCaptchaImage();
        if (res.code === 200) {
            this.setData({
                captchaImage: res.img,
                uuid: res.uuid
            })
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.getCaptchaImage()
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