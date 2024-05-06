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

            this.getUserInfo()
        } else {
            wx.showToast({
                title: res.msg,
                icon: 'none'
            })
            this.getCaptchaImage()
        }
    },

    async bindUser() {
        const getCode = await this.wxLogin();
        wx.showLoading({
            title: '正在绑定',
        })
        const res = await wx.$api.bindUserId({
            code: getCode.code
        });
        if (res.code == 200) {
            wx.showToast({
                title: '免密登录绑定成功',
                icon: "none"
            })
            this.redirectTo()
        }
        wx.hideLoading()
    },
    async getUserInfo() {
        const res = await wx.$api.getUserInfo();
        if (res.code == 200) {
            console.log(res)
            if (!res.user.openid) {
                wx.showModal({
                    title: '提示',
                    content: '当前账号未绑定微信，是否绑定当前微信？',
                    complete: (res) => {
                        if (res.cancel) {
                            this.redirectTo()
                        }

                        if (res.confirm) {
                            this.bindUser()
                        }
                    }
                })
            } else {
                this.redirectTo()
            }
        }
    },

    redirectTo() {
        const url = wx.getStorageSync('redirect');
        const tabs = ['/pages/index/index', '/pages/map/index', '/pages/my-home/index'];
        if (tabs.includes(url)) {
            wx.switchTab({
                url,
            })
        } else if (url) {
            wx.redirectTo({
                url: url,
            })
        } else {
            wx.reLaunch({
                url: tabs[0],
            })
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
            wx.setStorageSync("loginData", {
                ...res,
                token: res.token
            })
            this.redirectTo()

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