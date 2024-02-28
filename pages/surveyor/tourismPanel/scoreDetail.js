// pages/surveyor/tourismPanel/scoreDetail.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        score: 0,
        activeNames: [],
        list: [{
            name: "观赏游憩使用价值（30分）",
            key: "scoreLandscape",
            value: 0,
            min: 0,
            max: 30,
            list: ["全部或其中一项具有极高的观赏价值、游憩价值、使用价值。 32－22", "全部或其中一项具有很高的观赏价值、游憩价值、使用价值。 21－13", "全部或其中一项具有较高的观赏价值、游憩价值、使用价值。 12－6", "全部或其中一项具有一般观赏价值、游憩价值、使用价值。 5-1"]
        }, {
            name: "历史文化科学艺术价值（25分）",
            key: "scoreHumanity",
            value: 0,
            min: 0,
            max: 25,
            list: ["同时或其中一项具有世界意义的历史价值、文化价值、科学价值、艺术价值。 25－20",
                "同时或其中一项具有全国意义的历史价值、文化价值、科学价值、艺术价值。 19－13",
                "同时或其中一项具有省级意义的历史价值、文化价值、科学价值、艺术价值。 12－6",
                "历史价值、或文化价值、或科学价值,或艺术价值具有地区意义。 5-1"
            ]
        }, {
            name: "珍稀奇特程度（15分）",
            key: "scoreScarce",
            value: 0,
            min: 0,
            max: 15,
            list: ["有大量珍稀物种，或景观异常奇特，或此类现象在其他地区罕见。 15－13",
                "有较多珍稀物种，或景观奇特，或此类现象在其他地区很少见。 12-9",
                "有少量珍稀物种，或景观突出，或此类现象在其他地区少见。 8-4",
                "有个别珍稀物种，或景观比较突出，或此类现象在其他地区较多见。 3-1",
            ]
        }, {
            name: "规模、丰度与几率（10分）",
            key: "scoreScale",
            value: 0,
            min: 0,
            max: 10,
            list: ["独立型旅游资源单体规模、体量巨大；集合型旅游资源单体结构完美、疏密度优良；自然景象和人文活动周期性发生或频率极高。 10-8",
                "独立型旅游资源单体规模、体量较大；集合型旅游资源单体结构很和谐、疏密度良好；自然景象和人文活动周期性发生或频率很高。 7-5",
                "独立型旅游资源单体规模、体量中等；集合型旅游资源单体结构和谐、疏密度较好；自然景象和人文活动周期性发生或频率较高。 4-3",
                "独立型旅游资源单体规模、体量较小；集合型旅游资源单体结构较和谐、疏密度一般；自然景象和人文活动周期性发生或频率较小。 2-1",
            ]
        }, {
            name: "完整性（5分）",
            key: "scorePreservationIntegrality",
            value: 0,
            min: 0,
            max: 5,
            list: ["形态与结构保持完整。 5-4",
                "形态与结构有少量变化，但不明显。 3",
                "形态与结构有明显变化。 2",
                "形态与结构有重大变化。 1",
            ]
        }, {
            name: "知名度和影响力（10分）",
            key: "scorePopularity",
            value: 0,
            min: 0,
            max: 10,
            list: ["在世界范围内知名，或构成世界承认的名牌。 10-8",
                "在全国范围内知名，或构成全国性的名牌。 7-5",
                "在本省范围内知名，或构成省内的名牌。 4-3",
                "在本地区范围内知名，或构成本地区名牌。 2-1",
            ]
        }, {
            name: "适游期或使用范围（5分）",
            key: "scoreSuitableTime",
            value: 0,
            min: 0,
            max: 5,
            list: ["适宜游览的日期每年超过300天，或适宜于所有游客使用和参与。 5-4",
                "适宜游览的日期每年超过250天，或适宜于80％左右游客使用和参与。 3",
                "适宜游览的日期超过150天，或适宜于60％左右游客使用和参与。 2",
                "适宜游览的日期每年超过100天，或适宜于40％左右游客使用和参与。 1",
            ]
        }, {
            name: "环境保护与环境安全",
            key: "scoreEnvironment",
            value: 0,
            min: -5,
            max: 3,
            list: ["已受到严重污染，或存在严重安全隐患。 -5",
                "已受到中度污染，或存在明显安全隐患。 -4",
                "已受到轻度污染，或存在一定安全隐患。 -3",
                "已有工程保护措施，环境安全得到保证。 3",
            ]
        }, ]
    },
    stopPrevent() {},

    onChange(e) {
        this.setData({
            activeNames: e.detail,
        });
    },
    onChangeSlider(e) {
        console.log(e.detail)
        const {
            index
        } = e.currentTarget.dataset;
        this.data.list[index].value = e.detail;
        this.computedTotal()
    },

    computedTotal() {
        const total = this.data.list.map(it => it.value).reduce((a, b) => {
            return Number(a) + Number(b);
        }, 0);
        this.setData({
            score: total * 100
        });
    },
    onDrag(e) {
        this.data.list[e.currentTarget.dataset.index].value = e.detail.value;

        this.setData({
            list: this.data.list,
        });
    },


    async getData() {
        const res = await wx.$api.getResources({}, this.options.id);
        if (res.code == 200) {
            console.log(res)
            this.data.list.forEach(it => {
                it.value = res.data[0][it.key]
            })
            this.setData({
                list: this.data.list
            })
            this.computedTotal();
        }
    },
    async onSubmit(e) {
        const data = {
            id: this.options.id
        }
        this.data.list.forEach(it => {
            data[it.key] = it.value
        });
        console.log(data)
        const res = await wx.$api.editSaveResScore(data);
        console.log()
        if (res.code === 200) {
            // 后续返回？
        }
        wx.showToast({
            title: res.msg,
            icon: 'none'
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.getData()
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