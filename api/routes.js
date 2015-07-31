function setup(router, handlers, request){
    handlers.baseHandler(router);
    handlers.testHandler(router);
};

exports.setup = setup;