module.exports = {
    mockySql:`select b.contentType,b.charset,b.headers,b.body from collections a inner join
    response b on a.id = b.collectionId
where a.name=? and b.path= ?`,
    collectionList:`select * from collections where 1=1 `,
    addCollection:`insert into collections SET ?`,
    deleteCollection:`delete from collections where id = ?`,
    editCollection:`update collections set name=?,identifier=?,remark=? where id=?`,
    searchCollection:`select id,name,identifier where name like %?%`
}
