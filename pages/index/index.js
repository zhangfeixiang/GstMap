// index.js
import {
    pinyinUtil
} from './../../utils/pinyinutil'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        imgList: [
            'https://gd-hbimg.huaban.com/706f0059812fb1f0ef5213557f59feab9593e71c12093a-LEWZKa_fw1200webp',
            'https://gd-hbimg.huaban.com/fc4a7a7762125f66b5c439782edcc1396d3d41821a8e4-lAlqfv_fw1200webp',
            'https://gd-hbimg.huaban.com/f8e614f34297198176b7649cfd9ebc9e5a2170bb25f42-9axQTg_fw1200webp',
        ],
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
            {
                id: 4,
                name: '时空照相馆',
                type: 'photo',
                url: "/pages/spacetime-photo/index",
                icon: 'https://static.zc0901.com/zfx/gst-map/photo.png'

            },
            {
                id: 5,
                name: '我是测绘师',
                type: 'user',
                url: "/pages/surveyor/menu?auth=1",
                icon: 'https://static.zc0901.com/zfx/gst-map/user.png'

            }
        ],

        tabs: [{
            title: '最新',
            list: [{
                visit: "1111",
                title: "故宫",
                cover: "https://gd-hbimg.huaban.com/54b1860b14994a3791938341952f3528a4dede65212b4-NyM9Gk_fw480webp"
            }, {
                visit: "1111",
                title: "香山",
                cover: "https://gd-hbimg.huaban.com/9cb9b7fe163b2d001bbd1f158b11a04b9ce20d2827c8f-Lbm19L_fw480webp"
            }, {
                visit: "1111",
                title: "故宫",
                cover: "https://gd-hbimg.huaban.com/54b1860b14994a3791938341952f3528a4dede65212b4-NyM9Gk_fw480webp"
            }, {
                visit: "1111",
                title: "香山",
                cover: "https://gd-hbimg.huaban.com/9cb9b7fe163b2d001bbd1f158b11a04b9ce20d2827c8f-Lbm19L_fw480webp"
            }, {
                visit: "1111",
                title: "故宫",
                cover: "https://gd-hbimg.huaban.com/54b1860b14994a3791938341952f3528a4dede65212b4-NyM9Gk_fw480webp"
            }, {
                visit: "1111",
                title: "香山",
                cover: "https://gd-hbimg.huaban.com/9cb9b7fe163b2d001bbd1f158b11a04b9ce20d2827c8f-Lbm19L_fw480webp"
            }, {
                visit: "1111",
                title: "故宫",
                cover: "https://gd-hbimg.huaban.com/54b1860b14994a3791938341952f3528a4dede65212b4-NyM9Gk_fw480webp"
            }, {
                visit: "1111",
                title: "香山",
                cover: "https://gd-hbimg.huaban.com/9cb9b7fe163b2d001bbd1f158b11a04b9ce20d2827c8f-Lbm19L_fw480webp"
            }, {
                visit: "1111",
                title: "故宫",
                cover: "https://gd-hbimg.huaban.com/54b1860b14994a3791938341952f3528a4dede65212b4-NyM9Gk_fw480webp"
            }, {
                visit: "1111",
                title: "香山",
                cover: "https://gd-hbimg.huaban.com/9cb9b7fe163b2d001bbd1f158b11a04b9ce20d2827c8f-Lbm19L_fw480webp"
            }, {
                visit: "1111",
                title: "故宫",
                cover: "https://gd-hbimg.huaban.com/54b1860b14994a3791938341952f3528a4dede65212b4-NyM9Gk_fw480webp"
            }, {
                visit: "1111",
                title: "香山",
                cover: "https://gd-hbimg.huaban.com/9cb9b7fe163b2d001bbd1f158b11a04b9ce20d2827c8f-Lbm19L_fw480webp"
            }]
        }, {
            title: '最热',
            list: [{
                visit: "1111",
                title: "香山",
                cover: "https://gd-hbimg.huaban.com/9cb9b7fe163b2d001bbd1f158b11a04b9ce20d2827c8f-Lbm19L_fw480webp"
            }, {
                visit: "1111",
                title: "故宫",
                cover: "https://gd-hbimg.huaban.com/54b1860b14994a3791938341952f3528a4dede65212b4-NyM9Gk_fw480webp"
            }, ]
        }]

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