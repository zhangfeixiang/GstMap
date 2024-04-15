// pages/standard-map/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        filterIndex: 0,
        hotFilterBars: [],
        hasMore: true,
        list: []
    },
    handleClickFilterItem(e) {
        const {
            index
        } = e.currentTarget.dataset;
        this.setData({
            filterIndex: index,
        })
        this.initFilterList()
    },

    initFilterBar() {
        this.setData({
            hotFilterBars: ['全区域', ...new Set(this.data.list.map(it => it.region))]
        })
    },
    initFilterList() {
        const region = this.data.hotFilterBars[this.data.filterIndex];
        const filterList = this.data.list.filter(it => {
            if (region === '全区域') {
                return true
            }
            return it.region === region;
        })
        this.setData({
            filterList
        })
    },

    page: 1,
    async getList() {
        const res = await wx.$api.getNormalMapList({
            pageNum: 10,
            pageSize: this.page || 1
        });
        if (res.code === 200) {
            this.setData({
                hasMore: res.rows.length >= 10,
                list: this.page === 1 ? res.rows : this.data.list.concat(res.rows),
            })
            this.initFilterBar();
            this.initFilterList()
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