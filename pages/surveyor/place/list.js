import {
    gps84_To_Gcj02
} from '../../../utils/GPSUtil';
import {
    decimalToDMS,
    DMSToDecimal
} from './../../../utils/util'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        list: [],
        hasMore: true,
        isLoading: true
    },

    openMap(e) {
        const {
            index
        } = e.currentTarget.dataset;
        const current = this.data.list[index];
        if (current.beginLatitude || current.endLatitude) {
            // wx.openLocation({
            //     latitude: current.beginLatitude - 0,
            //     longitude: current.beginLongitude - 0,
            // })
            wx.navigateTo({
                url: 'area',
                success: (res) => {
                    if (current.beginLongitude) {
                        const beginGps84 = [DMSToDecimal(current.beginLongitude), DMSToDecimal(current.beginLatitude)]
                        const beginCgc02 = gps84_To_Gcj02(beginGps84[0], beginGps84[1]);
                        res.eventChannel.emit('maker', {
                            latitude: beginCgc02[1],
                            longitude: beginCgc02[0]
                        })

                        return
                    } else if (current.endLongitude) {
                        const endGps84 = [DMSToDecimal(current.endLongitude), DMSToDecimal(current.endLatitude)]
                        const endCgc02 = gps84_To_Gcj02(endGps84[0], endGps84[1])
                        res.eventChannel.emit('maker', {
                            latitude: endCgc02[1],
                            longitude: endCgc02[0]
                        })
                        return
                    }

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
                    res.eventChannel.emit('current', data)

                }
            })
        } else {
            wx.showToast({
                title: '该地名未完善经纬度',
                icon: 'none'
            })
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
                hasMore: res.rows.length >= 10,
                isLoading: false,
                list: this.page == 1 ? list : this.data.list.concat(list)
            });
        }
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
        if (this.data.hasMore) {
            this.page++
            this.getData();
        }

    }
})