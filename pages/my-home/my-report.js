// pages/my-home/my-report.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userId: '',
        isLoading: true,
        list: []
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
    page: 1,
    async getListData() {
        await this.getUserInfo();
        const res = await wx.$api.getReportList({
            userId: this.data.userId,
            pageSize: 10,
            pageNum: this.page || 1
        });
        if (res.code == 200) {
            this.setData({
                hasMore: res.rows.length >= 10,
                isLoading: false,
                list: res.rows
            })
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.getListData()
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
        if (this.data.hasMore) {
            this.page++
            this.getListData()
        }
    }
})