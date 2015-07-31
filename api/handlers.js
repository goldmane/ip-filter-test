module.exports = {
    baseHandler : function(router){
        router.route('/')
            .get(function(req, res){
                var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
                var ret = {
                    'ClientIP':ip
                };
                console.log('Client IP: ', ret);
                res.json(ret);
            });
    },
    testHandler : function(router){
        router.route('/test')
            .get(function(req, res){
                var obj = {
                    sentimentIndex: 0.9,
                    cloudId: 1
                };
                res.json(obj);
            });
    }
};