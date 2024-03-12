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
            nodes: `<div style="margin-bottom: 10px;">
            · 全部或其中一项具有<span style="color: rgb(192, 0, 0);">极高</span>的观赏价值、游憩价值、使用价值（22-32）
        </div>
        <div style="margin-bottom: 10px;">
            · 全部或其中一项具有<span style="color: rgb(192, 0, 0);">很高</span>的观赏价值、游憩价值、使用价值（21-31）
        </div>
        <div style="margin-bottom: 10px;">
            · 全部或其中一项具有<span style="color: rgb(192, 0, 0);">较高</span>的观赏价值、游憩价值、使用价值（6-12）
        </div>
        <div style="margin-bottom: 10px;">
            · 全部或其中一项具有<span style="color: rgb(192, 0, 0);">一般</span>的观赏价值、游憩价值、使用价值（1-5）
        </div>`
        }, {
            name: "历史文化科学艺术价值（25分）",
            key: "scoreHumanity",
            value: 0,
            min: 0,
            max: 25,
            nodes: `
                <div style="margin-bottom: 10px;">
            · 同时或其中一项具有<span style="color: rgb(192, 0, 0);">世界</span>意义的历史价值、文化价值、科学价值、艺术价值（25－20）</div>
                <div style="margin-bottom: 10px;">
            · 同时或其中一项具有<span style="color: rgb(192, 0, 0);">全国</span>意义的历史价值、文化价值、科学价值、艺术价值（19－13）</div>
                <div style="margin-bottom: 10px;">
            · 同时或其中一项具有<span style="color: rgb(192, 0, 0);">省级</span>意义的历史价值、文化价值、科学价值、艺术价值（12－6）</div>
                <div style="margin-bottom: 10px;">
            · 历史价值、或文化价值、或科学价值，或艺术价值具有<span style="color: rgb(192, 0, 0);">地区</span>意义（5-1）</div>
            `
        }, {
            name: "珍稀奇特程度（15分）",
            key: "scoreScarce",
            value: 0,
            min: 0,
            max: 15,
            nodes: `
                <div style="margin-bottom: 10px;">
                · 有<span style="color: rgb(192, 0, 0);">大量</span>珍稀物种，或景观异常奇特，或此类现象在其他地区罕见（13-15）</div>
                <div style="margin-bottom: 10px;">
                · 有<span style="color: rgb(192, 0, 0);">较多</span>珍稀物种，或景观奇特，或此类现象在其他地区很少见（9-12）</div>
                <div style="margin-bottom: 10px;">
                · 有<span style="color: rgb(192, 0, 0);">少量</span>珍稀物种，或景观突出，或此类现象在其他地区少见（4-8）</div>
                <div style="margin-bottom: 10px;">
                · 有<span style="color: rgb(192, 0, 0);">个别</span>珍稀物种，或景观比较突出，或此类现象在其他地区较多见（1-3）</div>
            `
        }, {
            name: "规模、丰度与几率（10分）",
            key: "scoreScale",
            value: 0,
            min: 0,
            max: 10,
            nodes: `
                <div style="margin-bottom: 10px;">· 独立型旅游资源单体规模、体量<span  style="color: rgb(192, 0, 0);">巨大</span>；集合型旅游资源单体结构<span  style="color: rgb(192, 0, 0);">完美</span>、疏密度优良；自然景象和人文活动周期性发生或频率极高（8-10）</div>
                <div style="margin-bottom: 10px;">· 独立型旅游资源单体规模、体量<span  style="color: rgb(192, 0, 0);">较大</span>；集合型旅游资源单体结构<span  style="color: rgb(192, 0, 0);">很和谐</span>、疏密度良好；自然景象和人文活动周期性发生或频率很高（5-7）</div>
                <div style="margin-bottom: 10px;">· 独立型旅游资源单体规模、体量<span  style="color: rgb(192, 0, 0);">中等</span>；集合型旅游资源单体结构<span  style="color: rgb(192, 0, 0);">和谐</span>、疏密度较好；自然景象和人文活动周期性发生或频率较高（3-4）</div>
                <div style="margin-bottom: 10px;">· 独立型旅游资源单体规模、体量<span  style="color: rgb(192, 0, 0);">较小</span>；集合型旅游资源单体结构<span  style="color: rgb(192, 0, 0);">较和谐</span>、疏密度一般；自然景象和人文活动周期性发生或频率较小（1-2）</div>
            `
        }, {
            name: "完整性（5分）",
            key: "scorePreservationIntegrality",
            value: 0,
            min: 0,
            max: 5,
            nodes: `
            <div style="margin-bottom: 10px;">· 形态与结构<span style="color: rgb(192, 0, 0);">保持完整</span>（4-5）</div>
                <div style="margin-bottom: 10px;">· 形态与结构<span style="color: rgb(192, 0, 0);">有少量变化，但不明显</span>（3）</div>
                <div style="margin-bottom: 10px;">· 形态与结构<span style="color: rgb(192, 0, 0);">有明显变化</span>（2）</div>
                <div style="margin-bottom: 10px;">· 形态与结构<span style="color: rgb(192, 0, 0);">有重大变化</span>（1）</div>
            `
        }, {
            name: "知名度和影响力（10分）",
            key: "scorePopularity",
            value: 0,
            min: 0,
            max: 10,
            nodes: `
                <div style="margin-bottom: 10px;">· 在<span style="color: rgb(192, 0, 0);" >世界</span>范围内知名，或构成<span style="color: rgb(192, 0, 0);">世界</span>承认的名牌（8-10）</div>
                <div style="margin-bottom: 10px;">· 在<span style="color: rgb(192, 0, 0);" >全国</span>范围内知名，或构成<span style="color: rgb(192, 0, 0);">全国</span>性的名牌（5-7）</div>
                <div style="margin-bottom: 10px;">· 在<span style="color: rgb(192, 0, 0);" >本省</span>范围内知名，或构成<span style="color: rgb(192, 0, 0);">省内</span>的名牌（3-4）</div>
                <div style="margin-bottom: 10px;">· 在<span style="color: rgb(192, 0, 0);" >本地区</span>范围内知名，或构成<span style="color: rgb(192, 0, 0);">本地区</span>名牌（1-2）</div>
            `
        }, {
            name: "适游期或使用范围（5分）",
            key: "scoreSuitableTime",
            value: 0,
            min: 0,
            max: 5,
            nodes: `
            <div style="margin-bottom: 10px;">· 适宜游览的日期每年超过<span style="color: rgb(192, 0, 0);">300天</span>，或适宜于<span style="color: rgb(192, 0, 0);">所有游客</span>使用和参与（4-5）</div>
            <div style="margin-bottom: 10px;">· 适宜游览的日期每年超过<span style="color: rgb(192, 0, 0);">250天</span>，或适宜于<span style="color: rgb(192, 0, 0);">80％</span>左右游客使用和参与（3）</div>
            <div style="margin-bottom: 10px;">· 适宜游览的日期超过<span style="color: rgb(192, 0, 0);">150天</span>，或适宜于<span style="color: rgb(192, 0, 0);">60％</span>左右游客使用和参与（2）</div>
            <div style="margin-bottom: 10px;">· 适宜游览的日期每年超过<span style="color: rgb(192, 0, 0);">100天</span>，或适宜于<span style="color: rgb(192, 0, 0);">40％</span>左右游客使用和参与（1）</div>
            `
        }, {
            name: "环境保护与环境安全",
            key: "scoreEnvironment",
            value: 0,
            min: -5,
            max: 3,
            nodes: `
            <div style="margin-bottom: 10px;">· 已受到<span style="color: rgb(192, 0, 0);">严重污染</span>，或存在<span style="color: rgb(192, 0, 0);">严重</span>安全隐患（-5）</div>
            <div style="margin-bottom: 10px;">· 已受到<span style="color: rgb(192, 0, 0);">中度污染</span>，或存在<span style="color: rgb(192, 0, 0);">明显</span>安全隐患（-4）</div>
            <div style="margin-bottom: 10px;">· 已受到<span style="color: rgb(192, 0, 0);">轻度污染</span>，或存在<span style="color: rgb(192, 0, 0);">一定</span>安全隐患（-3）</div>
            <div style="margin-bottom: 10px;">· 已有工程<span style="color: rgb(192, 0, 0);">保护措施</span>，环境<span style="color: rgb(192, 0, 0);">安全得到保证</span>（3）</div>
            `
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