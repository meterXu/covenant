module.exports = {
    mockySql:`select b.contentType,b.charset,b.headers,b.body from collections a inner join
    response b on a.id = b.collectionId
where a.name=:name and b.path= :path`
}
