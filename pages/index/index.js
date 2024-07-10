// index.js

Page({

    /**
     * 页面的初始数据
     */
    data: {
        imgList: ['https://static.zc0901.com/zfx/gst-map/1.jpg', 'https://static.zc0901.com/zfx/gst-map/2.jpg', 'https://static.zc0901.com/zfx/gst-map/3.jpg'],
        loading: true,
        layerList: [{
                id: 1,
                name: '标准地图',
                type: 'standard',
                url: "/pages/standard-map/index",
                icon: 'https://static.zc0901.com/zfx/gst-map/standard.png'

            },
            {
                id: 2,
                name: '专题图层',
                type: 'subject',
                url: "/pages/theme-layer/index",
                icon: 'https://static.zc0901.com/zfx/gst-map/subject.png'

            },
            {
                id: 3,
                name: '产品展示',
                type: 'album',
                url: "/pages/album/list",
                icon: 'https://static.zc0901.com/zfx/gst-map/album.png'

            },
            // {
            //     id: 4,
            //     name: '时空照相馆',
            //     type: 'photo',
            //     url: "/pages/spacetime-photo/index",
            //     icon: 'https://static.zc0901.com/zfx/gst-map/photo.png'

            // },
            {
                id: 5,
                name: '我是测绘师',
                type: 'user',
                url: "/pages/surveyor/menu?auth=1",
                icon: 'https://static.zc0901.com/zfx/gst-map/user.png'

            }
        ],

        newList: [],
        hotList: [],

    },



    goDetail(e) {
        const item = this.data.newList[e.currentTarget.dataset.index];
        wx.navigateTo({
            url: `/pages/theme-layer/detail?url=${encodeURIComponent(this.data.$h5Host + item.subjectUrl)}&title=${item.name}`,
        })
    },
    previewImgs(e) {
        const {
            index
        } = e.currentTarget.dataset;
        const urls = this.data.hotList.map(it => `${this.data.$host}${it.fullImg}`)
        const current = urls[index];
        wx.$api.getNormalMapDetail({}, this.data.hotList[index].id)
        wx.previewImage({
            current,
            urls,
        })
    },

    async getNews() {
        const res = await wx.$api.getSubjectsList({
            pageSize: 3,
            pageNum: 1
        });
        if (res.code === 200) {
            this.setData({
                loading: false,
                newList: res.rows
            })
        }
    },
    async getHots() {
        const res = await wx.$api.getNormalMapList({
            region: '',
            pageSize: 3,
            pageNum: 1
        });
        if (res.code === 200) {
            this.setData({
                hotList: res.rows
            })
        }
    },

    async getHomeBanners() {
        const res = await wx.$api.getHomeBanners();
        if (res.code === 200) {
            res.data.forEach(it => {
                it.bannerUrl = it.bannerUrl.startsWith('http') ? it.bannerUrl : `${this.data.$host}${it.bannerUrl}`
            })
            this.setData({
                imgList: res.data
            })
        }
    },

    handleClickItem(e) {
        const {
            index
        } = e.currentTarget.dataset;
        wx.navigateTo({
            url: this.data.layerList[index].url,
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.getHomeBanners();
        this.getNews()
        this.getHots()
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