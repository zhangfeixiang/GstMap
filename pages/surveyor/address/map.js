// pages/surveyor/address/map.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        list: [],
        hasMore: true,
        longitude: 116.39479288997632,
        latitude: 40.0772127801174,
        scale: 10,
        marker: null, //改变圆半径时圆心的坐标点
        markers: [],
        polyline: [],
        polygons: [],
        markerId: 1
    },

    handTap(event) {
        let lnglat = event.detail
        let marker = this.generateMarker(lnglat)
        let markers = this.data.markers
        markers.push(marker) //push是不断给地图添加坐标点，如果只需要一个，直接赋值即可
        this.setData({
            marker: marker,
            markers: markers
        })
        let circle = this.generateCircle(marker, 200)

        let circles = []
        circles.push(circle)
        this.setData({
            longitude: marker.longitude, //画圆时需要把圆心定为地图的中心，不画圆可以不要
            latitude: marker.latitude,
            scale: 16,
            circles: circles
        })
        if (markers.length > 1) {
            let polyline = this.generatePolyline(markers)
            let polylines = []
            polylines.push(polyline)
            this.setData({
                polyline: polylines
            })
        }
        if (markers.length > 2) {
            let polygon = this.generatePolygon(markers)
            let polygons = []
            polygons.push(polygon)
            this.setData({
                polygons: polygons
            })
        }
    },
    slider3change(event) {
        let value = event.detail.value
        let marker = this.data.marker
        if (marker == null) return
        let circle = this.generateCircle(marker, value)
        let circles = []
        let scale = 0
        if (value < 500) {
            scale = 16
        } else if (value < 1000) {
            scale = 14
        } else if (value < 5000) {
            scale = 12
        } else if (value < 10000) {
            scale = 10
        } else if (value < 35000) {
            scale = 9
        } else {
            scale = 12
        }
        circles.push(circle)
        this.setData({
            circles: circles,
            scale: scale
        })
    },
    generateMarker(data) { //创建坐标点的函数
        let longitude = data.longitude || data.lng
        let latitude = data.latitude || data.lat
        let markerId = data.markerId
        let iconPath = "https://static.zc0901.com/zfx/gst-map/marker.png"
        let marker = {
            longitude: longitude, //必填经度
            latitude: latitude, //必填纬度
            iconPath: iconPath, //必填图标路径
            callout: {
                content: data.standardName,
                color: '#ff0000',
                fontSize: 12,
                borderWidth: 1,
                borderRadius: 10,
                borderColor: '#333',
                bgColor: '#fff',
                padding: 5,
                display: 'ALWAYS',
                textAlign: 'center'
            },
            id: markerId, //选填点位id，id作为唯一的标识符，我觉得填上会好点，可以不填。
            width: 20, //图片的宽度，默认为实际宽度
            height: 20, //图片的高度，默认为实际高度
            anchor: { //图标的中心点（0-1选值）
                x: .5,
                y: .5
            }
        }
        this.setData({
            markerId: markerId++ //每次生成坐标点给这个值加1，保证点位内的id唯一性        
        })
        return marker
    },
    generatePolyline(data = []) { //创建线条
        let polyline = {}
        let points = []
        for (let ite of data) {
            points.push({
                longitude: ite.longitude,
                latitude: ite.latitude
            })
        }
        polyline = {
            points: points, //坐标点集合
            color: "#333333", //线条的颜色
            colorList: [], //彩虹线，使用时会忽略color的值
            width: 5, //线条的宽度
            dottedLine: true, //是否虚线
            //arrowLine:false,          //是否有箭头
            //arrowIconPath:'',         //箭头更换时的图标地址，arrline为true时生效
            //borderColor:'blue',       //线条边框的颜色
            //borderWidth:3,            //线条边框的宽度
            abovelabels: 'abovelabels' //压盖层级：('aboveroads':道路之上楼块之下，'abovebuildings':楼块之上POI之下，'abovelabels':所有的POI之上，默认是这个)    
        }
        return polyline
    },
    generatePolygon(data) { //创建多边形
        let polygon = {}
        let points = []
        for (let ite of data) {
            points.push({
                longitude: ite.longitude,
                latitude: ite.latitude
            })
        }
        polygon = {
            points: points, //坐标点集合  
            dashArray: [10, 10], //描边线默认为实线，如果需要虚线使用这个属性，接收两个值的数组，分别是实线和虚线的长度
            strokeWidth: 4, //描边的宽度
            strokeColor: "#555555", //描边的颜色,只接受16进制和RGBA格式
            fillColor: "rgba(152,132,152,.5)", //多边形围绕成的空间的填充色
            zindex: 4, //多边形z轴数值
            level: 'abovelabels' //压盖层级
        }
        return polygon
    },
    generateCircle(marker, radius) { //创建圆
        let circle = {
            longitude: marker.longitude, //圆中心坐标点的经度
            latitude: marker.latitude, //圆中心坐标点的纬度
            radius: radius, //圆的半径
            color: '#555555', //描边颜色
            fillColor: '#666666', //填充颜色
            strokeWidth: 3, //描边宽度
            level: 'abovelabels' //压盖层级
        }
        return circle
    },
    // 

    init() {
        this.data.list.forEach(it => {
            const marker = this.generateMarker(it)
            this.data.markers.push(marker)
        })
        this.setData({
            markers: this.data.markers
        })
    },

    page: 1,
    async getData() {
        const res = await wx.$api.getAddressList({
            pageNum: this.page,
            pageSize: 200,
            userId: this.data.userId
        })

        if (res.code === 200) {
            const list = res.rows.map(it => {
                return {
                    ...it,
                }
            })
            this.setData({
                hasMore: res.rows.length >= 10,
                isLoading: false,
                list: this.page == 1 ? list : this.data.list.concat(list)
            });
            this.init()
        }
    },

    async getUserInfo() {
        const res = await wx.$api.getUserInfo();
        if (res.code == 200) {
            this.setData({
                isSurveyor: (res.user.roles.map(it => it.roleKey) || []).includes('surveyor'),
                userId: res.user.userId
            })
            this.getData()
        }
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.getUserInfo();
        if (options.longitude) {
            this.setData({
                longitude: options.longitude,
                latitude: options.latitude
            })
        }
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

})