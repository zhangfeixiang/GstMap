const api = {
    async deleteFile(data) {
        return await wx.$request({
            url: "/common/file/delete",
            data,
            method: "POST",
            showError: false
        })
    },
    async getUserInfo(data) {
        return await wx.$request({
            url: "/getInfo",
            data,
            method: "GET",
            showError: false
        })
    },
    async putUserInfo(data) {
        return await wx.$request({
            url: "/system/user/self-edit",
            data,
            method: "PUT",
        })
    },
    //小程序密码登录/免密
    async postLogin(data) {
        return await wx.$request({
            url: '/login',
            data,
            method: 'POST'
        })
    },
    //小程序登录验证码
    async getCaptchaImage(data) {
        return await wx.$request({
            url: '/captchaImage',
            data,
            method: 'GET'
        })
    },
    // 绑定免密登录用户
    async bindUserId(data) {
        return await wx.$request({
            url: '/user/bind',
            data,
            method: 'POST',
            showError: true
        })
    },
    // 查询旅游资源分类树状结构数据
    async getTravelItem(data, id) {
        return await wx.$request({
            url: `/travel-resources/${id}`,
            data,
            method: 'GET',
        })
    },
    // 查询任务列表
    async getTaskList(data) {
        return await wx.$request({
            url: `/tasks/list`,
            data,
            method: 'GET'
        })
    },
    // 根据id查询任务
    async getItemTask(data, id) {
        return await wx.$request({
            url: `/tasks/${id}`,
            data,
            method: 'GET'
        })
    },
    //查询任务要执行的资源	
    async getTaskRes(data) {
        return await wx.$request({
            url: `/travel-resources/assigned`,
            data,
            method: 'GET'
        })
    },
    //对外道路情况 
    async getExternalRoadStatus(data) {
        return await wx.$request({
            url: `/travel-resources/external-road-status`,
            data,
            method: 'GET'
        })
    },
    //单体保存现状 
    async getSaveState(data) {
        return await wx.$request({
            url: `/travel-resources/preservation-situational`,
            data,
            method: 'GET'
        })
    },
    //单体现状
    async getState(data) {
        return await wx.$request({
            url: `/travel-resources/situational`,
            data,
            method: 'GET'
        })
    },
    //查询资源列表
    async getTravelResList(data) {
        return await wx.$request({
            url: `/travel-resources/list`,
            data,
            method: 'GET'
        })
    },
    //查询旅游资源分类树状结构数据
    async getTravelResTree(data) {
        return await wx.$request({
            url: `/travel_resource_categories/tree`,
            data,
            method: 'GET'
        })
    },
    //地址列表
    async getAddressList(data) {
        return await wx.$request({
            url: `/address/list`,
            data,
            method: 'GET'
        })
    },
    //查询地址详情
    async getAddressDetail(data, id) {
        return await wx.$request({
            url: `/address/${id}`,
            data,
            method: 'GET'
        })
    },
    // 新增地址
    async addAddress(data) {
        return await wx.$request({
            url: '/address',
            method: "POST",
            data
        })
    },
    // 编辑地址
    async editAddress(data) {
        return await wx.$request({
            url: `/address`,
            method: "PUT",
            data
        })
    },
    // 删除地址
    async deleteAddress(data, id) {
        return await wx.$request({
            url: `/address/${id}`,
            method: "DELETE",
            data
        })
    },
    // --------------------------
    //查询)区县数据
    async getCounty(data) {
        return await wx.$request({
            url: '/administrative-regions/county',
            data,
        })
    },
    //查询)街道数据
    async getStreet(data) {
        return await wx.$request({
            url: '/administrative-regions/street',
            data,
        })
    },
    //更新)文旅资源
    async putTravelResources(data) {
        return await wx.$request({
            url: '/travel-resources',
            data,
            method: 'PUT'
        })
    },
    //保护措施情况
    async getProtective(data) {
        return await wx.$request({
            url: `/travel-resources/preservation-measure-situational`,
            data,
            method: 'GET'
        })

    },
    //根据资源单体ID查询评分
    async getResources(data, id) {
        return await wx.$request({
            url: `/travel-resource-scores/resources/${id}`,
            data,
            method: 'GET',
            showError: false
        })

    },
    //查询旅游资源评分标准
    async getTravelResScore(data) {
        return await wx.$request({
            url: `/travel-resource-criterions/`,
            data,
            method: 'GET'
        })

    },
    //修改单体资源评分
    async editSaveResScore(data) {
        return await wx.$request({
            url: `/travel-resource-scores`,
            data,
            method: 'PUT'
        })
    },
    async addSaveResScore(data) {
        return await wx.$request({
            url: `/travel-resource-scores`,
            data,
            method: 'POST'
        })
    },
    //行政区tree
    async districtTree(data) {
        return await wx.$request({
            url: `/administrative-regions/tree`,
            data,
            method: 'GET'
        })
    },

    // 地名--------

    // 获取地名列表
    async getPlaceList(data) {
        return await wx.$request({
            url: `/placenames/list`,
            data,
            method: "GET"
        })
    },
    // 获取地名详情
    async getPlaceDetail(data, id) {
        return await wx.$request({
            url: `/placenames/${id}`,
            data,
            method: "GET"
        })
    },
    // 地名使用类型
    async getUseType(data) {
        return await wx.$request({
            url: '/placenames/use-type',
            data,
            method: "GET"
        })
    },
    // 地名分类树
    async getPlaceCategories(data) {
        return await wx.$request({
            url: '/place-name-categories/tree',
            data,
            method: "GET"
        })
    },
    // 新增地名
    async addPlace(data) {
        return await wx.$request({
            url: '/placenames',
            method: "POST",
            data
        })
    },
    // 编辑地名
    async editPlace(data) {
        return await wx.$request({
            url: '/placenames',
            method: "PUT",
            data
        })
    },
    // 删除地名
    async deletePlace(data, id) {
        return await wx.$request({
            url: `/placenames/${id}`,
            method: "DELETE",
            data
        })
    },

    // 标准地图
    async getNormalMapList(data) {
        return await wx.$request({
            url: `/normal-map/list`,
            method: "GET",
            data
        })
    },
    async getNormalMapDetail(data, id) {
        return await wx.$request({
            url: `/normal-map/${id}`,
            method: "GET",
            data
        })
    },
    // 专题图层
    async getSubjectsList(data) {
        return await wx.$request({
            url: `/subjects/list`,
            method: "GET",
            data
        })
    },
    // 产品展示
    async getProductsList(data) {
        return await wx.$request({
            url: `/products/list`,
            method: "GET",
            data
        })
    },
    // 我的上报列表
    async getReportList(data) {
        return await wx.$request({
            url: `/system/feedbacks/list`,
            method: "GET",
            data
        })
    },

    // 提交反馈
    async postReport(data) {
        return await wx.$request({
            url: `/system/feedbacks`,
            method: "POST",
            data
        })
    },

    async getHomeBanners(data) {
        return await wx.$request({
            url: '/system/banners/list',
            method: 'GET',
            data
        })
    }


}


export default {
    ...api
}