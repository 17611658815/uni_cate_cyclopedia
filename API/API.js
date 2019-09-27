import Promise from "./HttpRequest.js";
import Url from "./Url.js";

/**
 * 接口请求
 */
export const Api = {
    /**
     * @param paramObj
     * @returns {Promise}
     */

    /**
     * 热门菜谱
     */
    getHomeList: function(paramObj) {
        return Promise.get(Url.getHomeListUrl(paramObj), paramObj);
    },
    /**
     * 菜谱分类
     */
    getclassList: function (paramObj) {
        return Promise.get(Url.classitemUrl(paramObj), paramObj);
    },
    /**
     * 菜谱详情
     */
    getCatedetaile: function (paramObj) {
        return Promise.get(Url.detailsUrl(paramObj), paramObj);
    },
    /**
     * 搜索联想
     */
    searchSelect: function (paramObj) {
        return Promise.get(Url.searchSelectUrl(paramObj), paramObj);
    },
    /**
     * 热门搜索
     */
    getHotListItem: function (paramObj) {
        return Promise.get(Url.hotSearchUrl(paramObj), paramObj);
    },
    /**
     * 搜索详情
     */
    searchDetaile: function (paramObj) {
        return Promise.get(Url.searchDetaileUrl(paramObj), paramObj);
    },
}