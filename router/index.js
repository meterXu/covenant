const router = require('@koa/router')();
const {getParams} = require('../utils/index')

router.all('(/mocky.*)', async (ctx, next) => {
    const [name,path] = getParams(ctx.req)
    switch (name){
        case 'police':{
            switch (path){
                case 'message/exchange/list':{
                    ctx.body = {
                        "success": true,
                        "message": "操作成功！",
                        "code": 200,
                        "result": {
                            "records": [
                                {
                                    "code": "ccff",
                                    "durable_dictText": "是",
                                    "type_dictText": "fanout",
                                    "updateTime": "2021-03-04 09:34:26",
                                    "delFlag": 0,
                                    "type": 2,
                                    "updateId": null,
                                    "durable": 1,
                                    "vhost": null,
                                    "publishStatus_dictText": "已发布",
                                    "userList": [],
                                    "application": null,
                                    "createTime": "2021-03-04 09:34:26",
                                    "createId": null,
                                    "name": "ccc",
                                    "autoDelete": 0,
                                    "arguments": null,
                                    "id": 40,
                                    "tag": "fwa,fweaf,fwafwa",
                                    "publishStatus": 1,
                                    "autoDelete_dictText": "否",
                                    "status": 0
                                },
                                {
                                    "code": "exchange_1",
                                    "durable_dictText": "是",
                                    "type_dictText": "topic",
                                    "updateTime": "2021-03-04 10:48:09",
                                    "delFlag": 0,
                                    "type": 3,
                                    "updateId": null,
                                    "durable": 1,
                                    "vhost": null,
                                    "publishStatus_dictText": "已发布",
                                    "userList": [],
                                    "application": null,
                                    "createTime": "2021-03-04 10:48:09",
                                    "createId": null,
                                    "name": "主题1",
                                    "autoDelete": 0,
                                    "arguments": null,
                                    "id": 41,
                                    "tag": "测试主题1",
                                    "publishStatus": 1,
                                    "autoDelete_dictText": "否",
                                    "status": 1
                                },
                                {
                                    "code": "exchange_2",
                                    "durable_dictText": "是",
                                    "type_dictText": "topic",
                                    "updateTime": "2021-03-08 15:38:30",
                                    "delFlag": 0,
                                    "type": 3,
                                    "updateId": null,
                                    "durable": 1,
                                    "vhost": null,
                                    "publishStatus_dictText": "已发布",
                                    "userList": [],
                                    "application": null,
                                    "createTime": "2021-03-08 15:38:30",
                                    "createId": null,
                                    "name": "测试主题2",
                                    "autoDelete": 0,
                                    "arguments": null,
                                    "id": 42,
                                    "tag": "",
                                    "publishStatus": 1,
                                    "autoDelete_dictText": "否",
                                    "status": 1
                                }
                            ],
                            "total": 3,
                            "size": 10,
                            "current": 1,
                            "orders": [],
                            "optimizeCountSql": true,
                            "hitCount": false,
                            "searchCount": true,
                            "pages": 1
                        },
                        "timestamp": 1615527327737
                    }
                    return
                }
            }
        }
    }

    ctx.body = 'hello mocky!'
});




module.exports = router;
