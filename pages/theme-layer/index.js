// pages/theme-layer/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        hasMore: true,
        list: []
    },

    goDetail(e) {
        const item = this.data.list[e.currentTarget.dataset.index];
        wx.navigateTo({
            url: `detail?url=${encodeURIComponent(this.data.$h5Host + item.subjectUrl)}&title=${item.name}`,
        })
    },

    page: 1,
    async getList() {
        const res = await wx.$api.getSubjectsList({
            pageSize: 10,
            pid: 0,
            pageNum: this.page || 1
        });
        if (res.code === 200) {
            this.setData({
                hasMore: res.rows.length >= 10,
                list: this.page === 1 ? res.rows : this.data.list.concat(res.rows),
            })
        }

    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.getList()
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
            this.getList()
        }
    }
})