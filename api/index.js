const api = {
    //小程序登录
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
        })
    },
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
    async getTravelResources(data) {
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
        data.userId = 1;
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
    //行政区tree
    async districtTree(data) {
        return await wx.$request({
            url: `/administrative-regions/tree`,
            data,
            method: 'GET'
        })
    }
}


export default {
    ...api
}