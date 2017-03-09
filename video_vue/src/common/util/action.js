import  UI  from './ui';
var Action = {


    /**
     * 发起网络异步调用
     * @param actionType
     * @param serviceFun
     * @param params
     * @param dispatch
     */
    invokeNetCreator: function (actionType, serviceFun, params, dispatch, hasParams,hasLoading) {

        //发起请求
        Action.request(dispatch, actionType);

        // if(hasLoading){ UI.loading("show");}

        serviceFun(params)
            .then((res)=> {

                if(hasLoading)
                    UI.loading("hide");

                
                //完成拿到请求
                if (hasParams)
                    Action.complete(dispatch, actionType, {data: res.bizData, params: params});
                else
                    Action.complete(dispatch, actionType, res.bizData);

            }, (err)=> {
                //出现错误
                Action.error(dispatch, actionType, err);

                if(hasLoading)
                    UI.loading("hide");

            })
    },

    request: function (dispatch, type) {
        var o = {
            type: type,
            status: 1
        };
        dispatch(o);
        return o;
    },
    complete: function (dispatch, type, data) {
        var o = {
            type: type,
            status: 2,
            payload: data
        };
        dispatch(o);
        return o;
    },
    error: function (dispatch, type, err) {
        var o = {
            type: type,
            status: -1,
            payload: err
        };
        dispatch(o);
        return o;
    }

}

module.exports = Action;