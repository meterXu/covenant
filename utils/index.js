function getParams(req){
    const nameRegexp = new RegExp('(?<=mocky/)\\w*(?=/)',"gi")
    const pathRegexp = new RegExp('(?<=mocky/\\w*/).*','gi')

    let name = req.url.match(nameRegexp)
    let path = req.url.match(pathRegexp)

    name  = name?name[0]:null
        path= path?path[0]:null

    return [name,path]
}

module.exports = {
    getParams
}
