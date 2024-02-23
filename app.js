import Request from './api/request'
import api from './api/index'
import './utils/global'

// 供API使用方便
wx.$request = new Request().request;

// 业务直接可调用
wx.$api = api;

App({
    onLaunch() {
        // 检测小程序发布了新版本，ios缓存比较久无法获取最新版的代码
        this.updateApp()
        this.computedCustomBar();
        // 加载字体
        wx.loadFontFace({
            global: true,
            family: 'Didot',
            source: 'url("https://static.zc0901.com/imola/fonts/Didot.ttf")',
        })
        // 监测网络状态
        wx.onNetworkStatusChange(function (res) {
            console.log('onNetworkStatusChange', res)
            if (!res.isConnected) {
                wx.showToast({
                    title: '网络连接不可用',
                    duration: 50000000,
                    icon: 'none'
                })
            } else {
                wx.showToast({
                    title: '网络连接已正常',
                    duration: 1000,
                    icon: 'none'
                })
            }
        })
    },

    computedCustomBar() {
        const systeminfo = wx.getSystemInfoSync();
        this.globalData.StatusBar = systeminfo.statusBarHeight;
        // 判断设备横竖屏
        this.globalData.isLand = (systeminfo.deviceOrientation == "landscape" || systeminfo.windowWidth > systeminfo.windowHeight) && systeminfo.model.toUpperCase().indexOf("IPAD") > -1;
        let capsule = wx.getMenuButtonBoundingClientRect();
        if (capsule) {
            this.globalData.Custom = capsule;
            this.globalData.CustomBar = capsule.bottom + capsule.top - systeminfo.statusBarHeight;
        } else {
            this.globalData.CustomBar = systeminfo.statusBarHeight + 50;
        }
    },
    onPageNotFound(res) {
        wx.redirectTo({
            url: '/pages/index/index',
        })
    },
    onError(err) {
        console.log('APP onError', err);
        wx.getNetworkType({
            success: (res) => {
                console.log('getNetworkType: ', res)
                if (res.networkType === 'none') {
                    wx.showToast({
                        title: '网络连接不可用',
                        duration: 5000,
                        icon: 'none'
                    })
                }
            }
        })
    },
    updateApp() {
        const updateManager = wx.getUpdateManager()

        updateManager.onCheckForUpdate(function (res) {
            // 请求完新版本信息的回调
            console.log(res.hasUpdate)
        })

        updateManager.onUpdateReady(function () {
            wx.showModal({
                title: '更新提示',
                content: '新版本已经准备好，是否重启应用？',
                success: function (res) {
                    if (res.confirm) {
                        // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                        updateManager.applyUpdate()
                    }
                }
            })
        })

        updateManager.onUpdateFailed(function () {
            // 新版本下载失败
        })

    },
    globalData: {
        userInfo: null
    }
})