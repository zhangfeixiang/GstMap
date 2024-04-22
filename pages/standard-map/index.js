// pages/standard-map/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        filterIndex: 0,
        hotFilterBars: ["全选",
            "全市域",
            "中心城区",
            "核心区",
            "东城区",
            "西城区",
            "朝阳区",
            "海淀区",
            "丰台区",
            "石景山区",
            "门头沟区",
            "房山区",
            "通州区",
            "顺义区",
            "大兴区",
            "昌平区",
            "平谷区",
            "怀柔区",
            "密云区",
            "延庆区"
        ],
        hasMore: true,
        list: []
    },

    previewImgs(e) {
        const {
            index
        } = e.currentTarget.dataset;
        const urls = this.data.list.map(it => `${this.data.$host}${it.fullImg}`)
        const current = urls[index];
        wx.previewImage({
            current,
            urls,
        })
    },
    handleClickFilterItem(e) {
        const {
            index
        } = e.currentTarget.dataset;
        this.setData({
            filterIndex: index,
        })
        this.taggleList()
    },

    initFilterBar() {
        // this.setData({
        //     hotFilterBars: ['全区域', ...new Set(this.data.list.map(it => it.region))]
        // })
    },
    initFilterList() {
        // const region = this.data.hotFilterBars[this.data.filterIndex];
        // const filterList = this.data.list.filter(it => {
        //     if (region === '全区域') {
        //         return true
        //     }
        //     return it.region === region;
        // })
        // this.setData({
        //     filterList
        // })
    },

    page: 1,
    async getList() {
        const region = this.data.hotFilterBars[this.data.filterIndex];

        const res = await wx.$api.getNormalMapList({
            region,
            pageSize: 10,
            pageNum: this.page || 1
        });
        if (res.code === 200) {
            this.setData({
                hasMore: res.rows.length >= 10,
                list: this.page === 1 ? res.rows : this.data.list.concat(res.rows),
            })
            // this.initFilterBar();
            // this.initFilterList()
        }

    },
    taggleList() {
        this.page = 1;
        this.getList()
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.taggleList()
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