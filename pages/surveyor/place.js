// pages/surveyor/place.js

Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo: {
            code: "",
            standardName: "",
            // 地名类别
            placeNameCategory: "",
            city: "",
            county: "",
            street: "",
            longitudeSpan: "",
            latitudeSpan: "",
            useTime: "",
            imgUrl: ""
        },
        fieldCustom: {
            text: 'text',
            value: 'text',
            children: 'children',
        },
        // 地名类别
        showPopupPlaceNameCategory: false,
        placeNameCategoryOptions: [{
                text: "（一）自然地理实体",
                children: [{
                        text: "河流"
                    },
                    {
                        text: "湖泊"
                    },
                    {
                        text: "瀑布"
                    },
                    {
                        text: "泉"
                    },
                    {
                        text: "山地"
                    },
                ]
            },
            {
                text: "（二）行政区划",
                children: []
            },
            {
                text: "（三）村民委员会、居民委员会所在地",
                children: []
            },
            {
                text: "（四）城市公园、自然保护地",
                children: []
            },
            {
                text: "（五）街路巷",
                children: []
            },
            {
                text: "（六）具有重要地理方位意义的住宅区、楼宇",
                children: []
            },
            {
                text: "（七）交通运输设施",
                children: []
            },
            {
                text: "（八）具有重要地理方位意义的水务、电力、通信、气象等设施",
                children: []
            },
            {
                text: "（九）具有重要地理方位意义的其他地理实体",
                children: []
            },
        ],
        locationStr: ""
    },
    async onGetLocation() {
        const res = await wx.chooseLocation();
        this.setData({
            locationStr: res.longitude + "," + res.latitude,
            "userInfo.longitudeSpan": res.longitude + "-" + res.longitude,
            "userInfo.latitudeSpan": res.latitude + "-" + res.latitude
        })
    },
    // 地名类别
    onFinishPlaceNameCategory(e) {
        const {
            value
        } = e.detail;
        this.setData({
            'userInfo.placeNameCategory': value,
            showPopupPlaceNameCategory: false
        })
    },
    onShowPopupPlaceNameCategory() {
        this.setData({
            showPopupPlaceNameCategory: true
        })
    },
    onClosePlaceNameCategory() {
        this.setData({
            showPopupPlaceNameCategory: false
        })
    },

    onChangeUseTime(e) {
        this.setData({
            "userInfo.useTime": e.detail,
        });
    },

    // 表单提交
    handleFormSubmit() {
        const {
            form
        } = this.data
        formRules(rules, form, (status) => {
            if (status) {
                console.log('校验通过')
            }
        })
    },


    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {},

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