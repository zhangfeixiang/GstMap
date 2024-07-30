// pages/surveyor/place/area.js
import {
    decimalToDMS,
    DMSToDecimal
} from './../../../utils/util'
import {
    gps84_To_Gcj02
} from './../../../utils/GPSUtil'

function getRandomColor() {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
Page({

    /**
     * 页面的初始数据
     */
    data: {
        list: [],
        hasMore: true,
        showPosition: true,
        polygons: [],
        markers: [],

    },

    center(begin, end) {
        return {
            latitude: (begin.latitude + end.latitude) / 2,
            longitude: (begin.longitude + end.longitude) / 2,
        }
    },

    page: 1,
    async getData() {
        const res = await wx.$api.getPlaceList({
            pageNum: this.page,
        })

        if (res.code === 200) {
            const list = res.rows.map(it => {
                return {
                    ...it,
                    // time: parseTime(new Date(it.endTime))
                }
            })
            this.setData({
                isLoading: false,
                list: this.page == 1 ? list : this.data.list.concat(list)
            });
            if (res.rows.length >= 10) {
                this.page++
                this.getData()
            } else {
                this.genPolylines()
                this.generateMarkers()
            }
        }
    },

    genPolygons() {
        const polygons = [];
        this.data.list.filter(it => it.beginLatitude && it.endLatitude).forEach(current => {
            console.log('genPolygons===', current)
            const beginGps84 = [DMSToDecimal(current.beginLongitude), DMSToDecimal(current.beginLatitude)]
            const beginCgc02 = gps84_To_Gcj02(beginGps84[0], beginGps84[1])
            const endGps84 = [DMSToDecimal(current.endLongitude), DMSToDecimal(current.endLatitude)]
            const endCgc02 = gps84_To_Gcj02(endGps84[0], endGps84[1])
            const data = {
                begin: {
                    latitude: beginCgc02[1],
                    longitude: beginCgc02[0]
                },
                end: {
                    latitude: endCgc02[1],
                    longitude: endCgc02[0]
                }
            }
            let polygon = {
                dashArray: [10, 10], //描边线默认为实线，如果需要虚线使用这个属性，接收两个值的数组，分别是实线和虚线的长度
                strokeWidth: 2, //描边的宽度
                strokeColor: "#E80010", //描边的颜色,只接受16进制和RGBA格式
                fillColor: "#7cb5ec88", //多边形围绕成的空间的填充色
                zindex: 4, //多边形z轴数值
                level: 'abovelabels', //压盖层级
                points: [{
                    latitude: data.begin.latitude,
                    longitude: data.begin.longitude
                }, {
                    latitude: data.begin.latitude,
                    longitude: data.end.longitude
                }, {
                    latitude: data.end.latitude,
                    longitude: data.end.longitude
                }, {
                    latitude: data.end.latitude,
                    longitude: data.begin.longitude
                }, ]
            }
            polygons.push(polygon)
        });

        this.setData({
            polygons
        })

    },
    generateMarkers() { //创建坐标点的函数

        const markers = [];
        this.data.list.filter(it => it.beginLatitude || it.endLatitude).forEach((current, index) => {
            console.log('generateMarkers===', current)
            const beginGps84 = [DMSToDecimal(current.beginLongitude || current.endLongitude), DMSToDecimal(current.beginLatitude || current.endLatitude)]
            const beginCgc02 = gps84_To_Gcj02(beginGps84[0], beginGps84[1])


            let longitude = beginCgc02[0]
            let latitude = beginCgc02[1]
            let markerId = index
            let iconPath = "https://static.zc0901.com/zfx/gst-map/marker.png"
            let marker = {
                longitude: longitude, //必填经度
                latitude: latitude, //必填纬度
                iconPath: iconPath, //必填图标路径
                callout: {
                    content: current.standardName,
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
            markers.push(marker)
        })
        this.setData({
            markers
        })
    },

    genPolylines() {
        const polylines = [];
        this.data.list.filter(it => it.beginLatitude && it.endLatitude).forEach(current => {
            console.log('genPolylines===', current)
            const beginGps84 = [DMSToDecimal(current.beginLongitude), DMSToDecimal(current.beginLatitude)]
            const beginCgc02 = gps84_To_Gcj02(beginGps84[0], beginGps84[1])
            const endGps84 = [DMSToDecimal(current.endLongitude), DMSToDecimal(current.endLatitude)]
            const endCgc02 = gps84_To_Gcj02(endGps84[0], endGps84[1])
            const data = {
                begin: {
                    latitude: beginCgc02[1],
                    longitude: beginCgc02[0]
                },
                end: {
                    latitude: endCgc02[1],
                    longitude: endCgc02[0]
                }
            }
            let polyline = {
                width: 8,
                arrowLine: true,
                color: getRandomColor(),
                borderColor: "#000000",
                borderWidth: 1,
                level: 'aboveroads',
                id: 0,
                style: 4,
                points: [{
                    latitude: data.begin.latitude,
                    longitude: data.begin.longitude
                }, {
                    latitude: data.end.latitude,
                    longitude: data.end.longitude
                }],
                segmentTexts: [{
                    name: current.standardName,
                    startIndex: 0,
                    endIndex: 1
                }]
            }
            polylines.push(polyline)
        });

        this.setData({
            polylines
        })

    },

    getLocGeo() {
        wx.getLocation({
            success: res => {
                this.setData({
                    longitude: res.longitude,
                    latitude: res.latitude,
                })
            }
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        const eventChannel = this.getOpenerEventChannel();
        eventChannel && eventChannel.on('current', (data) => {
            console.log(data)
            this.setData({
                ...this.center(data.begin, data.end),
            })
            this.getData()
        })
        eventChannel && eventChannel.on('maker', (data) => {
            console.log(data)
            this.setData({
                ...data
            })
            this.getData()
        })
        this.getLocGeo()
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

    }
})