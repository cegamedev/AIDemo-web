
var CONST = {
  SYS : {
    CDN : "http://img.fangshibang.com",
    GD_KEY : "cbce173f805fd1569c741631013e37eb",
    APP : ""
  },

  ORDER : {
    PEOPLE_COUNT : [
      {key : 1,desc : '1人'},
      {key : 2,desc : '2人'},
      {key : 3,desc : '3人'},
      {key : 4,desc : '4人'},
      {key : 0,desc : '包场'}
    ]
  },

  BILL_STATUS : {
    NOT :  0,
    BEGIN : 20,
    RUNNING : 1,
    END  :2
  },

  ORDER_RESULT_STATUS  : {
    FIRST : 0,
    RUNNING : 1,
    END : 2,
    TIME_OUT : 3
  },

  PAY_ORDER_STATUS : {
     WAIT : 0,
     SUCCESS : 1,
     CANCEL : 2,
     FINISH : 3,
     TIME_OUT : 4,
     REFUND : 5
  }

}



module.exports  =  CONST;


