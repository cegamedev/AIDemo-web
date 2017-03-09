
const Format = {
    getDate : function(time,splitStr){
        var date = new Date(time);
        var M = date.getMonth()+1;
        var y = date.getFullYear();
        var d = date.getDate();

        if(M <= 0) M = "0"+M;
        if(d <= 0) M = "0"+d;
     
        if(splitStr)
            return `${y}${splitStr}${M}${splitStr}${d}`;
        else
            return {
                y : y,
                M : M,
                d : d
            };
    },
    
    getDateTime : function(time){
        var date = new Date(time);
        var M = date.getMonth()+1;
        var y = date.getFullYear();
        var d = date.getDate();
        var h = date.getHours();
        var m = date.getMinutes();
        var s = date.getSeconds();

            return {
                y : y,
                M : M,
                d : d,
                h : h,
                m : m,
                s : s
            };
    }


}

module.exports  = Format;


