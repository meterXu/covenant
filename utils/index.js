function getParams(req){
    const name = new RegExp('(?<=mocky/)\\w*(?=/)',"gi")
    const path = new RegExp('(?<=mocky/\\w*/).*','gi')
    return [name,path]
}

module.exports = {
    getParams
}
