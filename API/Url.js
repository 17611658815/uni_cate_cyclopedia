export default class Url {
    static PATH = "https://www.xiachufang.com/juno/api/v2"

    //主页热门
    static getHomeListUrl(data) {
        return this.PATH + '/recipes/popular_v3.json?weapp_src=xcf&is_weapp=1&limit=' + data.limit+'&offset=' + data.offset
    };
    //分类
    static classitemUrl(data) {
        return this.PATH + '/categories/tree_plus.json?is_weapp=' + data.is_weapp + '&weapp_src=' + data.xcf
    }; 
    //菜品详情
    static detailsUrl(data) {
        return this.PATH + '/recipes/show_v2.json?is_weapp=' + data.is_weapp + '&weapp_src=' + data.xcf + "&&mode=full" + "&id=" + data.id
    }; 
    //菜品详情
    static searchSelectUrl(data) {
        return this.PATH + '/search/prefix_keyword_suggester.json?is_weapp=' + data.is_weapp + '&weapp_src=' + data.xcf + "&&mode=full" + "&q=" + data.q
    }; 
    //热门搜索
    static hotSearchUrl(data) {
        return this.PATH + '/search/keyword_hour.json?is_weapp=' + data.is_weapp + '&weapp_src=' + data.xcf;
    }; 
    //搜索详
    static searchDetaileUrl(data) {
        return Url.PATH + '/search/universal_search_v2.json'
    }; 
}