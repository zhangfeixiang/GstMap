export let mock = 1;

export const getAppid = () => {
    return wx.getAccountInfoSync().miniProgram.appId;
}

export const getVersion = () => {
    return mock ? '1.0.1' : wx.getAccountInfoSync().miniProgram.version;
}