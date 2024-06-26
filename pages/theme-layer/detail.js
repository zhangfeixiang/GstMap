Page({

    /**
     * 页面的初始数据
     */
    data: {
        url: ""
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        const url = decodeURIComponent(options.url)
        this.setData({
            url: url.indexOf('?') > -1 ? url + '&title=' + (options.title || '') : url + '?title=' + (options.title || '')
        })
        if (options.title) {
            wx.setNavigationBarTitle({
                title: options.title,
            })
        }
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