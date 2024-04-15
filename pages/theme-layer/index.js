// pages/theme-layer/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        hasMore: true,
        list: []
    },

    page: 1,
    async getList() {
        const res = await wx.$api.getSubjectsList({
            pageNum: 10,
            pageSize: this.page || 1
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