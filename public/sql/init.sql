create database IF NOT EXISTS covenant DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;

create table collections
(
	id int auto_increment
		primary key,
	name varchar(100) null,
	identifier varchar(100) null,
	remark varchar(2000) null,
	createTime datetime not null
);

create index collections__index_1
	on collections (identifier);

create index collections__index_2
	on collections (name);


create table dic
(
	id int auto_increment
		primary key,
	code varchar(20) not null,
	text varchar(100) not null,
	value varchar(100) not null,
	remark varchar(2000) null
);

create index dic_code_index_1
	on dic (code, text);

INSERT INTO dic ( code, text, value, remark) VALUES ( 'method', 'GET', 'GET', '安全、幂等；用于获取资源；');
INSERT INTO dic ( code, text, value, remark) VALUES ( 'method', 'POST', 'POST', '非安全、非幂等；用于创建子资源');
INSERT INTO dic ( code, text, value, remark) VALUES ( 'method', 'PUT', 'PUT', '非安全、幂等；用于创建、更新资源；');
INSERT INTO dic ( code, text, value, remark) VALUES ( 'method', 'DELETE', 'DELETE', '非安全、幂等；删除资源；');
INSERT INTO dic ( code, text, value, remark) VALUES ( 'method', 'OPTIONS', 'OPTIONS', '安全、幂等；用于url验证，验证接口服务是否正常；');
INSERT INTO dic ( code, text, value, remark) VALUES ( 'method', 'TEACE', 'TEACE', '安全、幂等；维基百科“回显服务器收到的请求，这样客户端可以看到（如果有）哪一些改变或者添加已经被中间服务器实现。”');
INSERT INTO dic ( code, text, value, remark) VALUES ( 'method', 'PATCH', 'PATCH', '非安全、幂等；用于创建、更新资源，于PUT类似，区别在于PATCH代表部分更新；后来提出的接口方法，使用时可能去要验证客户端和服务端是否支持；');
INSERT INTO dic ( code, text, value, remark) VALUES ( 'method', 'HEAD', 'HEAD', '安全、幂等；与get方法类似，但不返回message body内容，仅仅是获得获取资源的部分信息（content-type、content-length）；');
INSERT INTO dic ( code, text, value, remark) VALUES ( 'status', '100', '100', 'continue');
INSERT INTO dic ( code, text, value, remark) VALUES ( 'status', '101', '101', 'switching protocols');
INSERT INTO dic ( code, text, value, remark) VALUES ( 'status', '102', '102', 'processing');
INSERT INTO dic ( code, text, value, remark) VALUES ( 'status', '200', '200', 'ok');
INSERT INTO dic ( code, text, value, remark) VALUES ( 'status', '201', '201', 'created');
INSERT INTO dic ( code, text, value, remark) VALUES ( 'status', '202', '202', 'accepted');
INSERT INTO dic ( code, text, value, remark) VALUES ( 'status', '203', '203', 'non-authoritative information');
INSERT INTO dic ( code, text, value, remark) VALUES ( 'status', '204', '204', 'no content');
INSERT INTO dic ( code, text, value, remark) VALUES ( 'status', '205', '205', 'reset content');
INSERT INTO dic ( code, text, value, remark) VALUES ( 'status', '206', '206', 'partial content');
INSERT INTO dic ( code, text, value, remark) VALUES ( 'status', '207', '207', 'multi-status');
INSERT INTO dic ( code, text, value, remark) VALUES ( 'status', '208', '208', 'already reported');
INSERT INTO dic ( code, text, value, remark) VALUES ( 'status', '226', '226', 'im used');
INSERT INTO dic ( code, text, value, remark) VALUES ( 'status', '300', '300', 'multiple choices');
INSERT INTO dic ( code, text, value, remark) VALUES ( 'status', '301', '301', 'moved permanently');
INSERT INTO dic ( code, text, value, remark) VALUES ( 'status', '302', '302', 'found');
INSERT INTO dic ( code, text, value, remark) VALUES ( 'status', '303', '303', 'see other');
INSERT INTO dic ( code, text, value, remark) VALUES ( 'status', '304', '304', 'not modified');
INSERT INTO dic ( code, text, value, remark) VALUES ( 'status', '305', '305', 'use proxy');
INSERT INTO dic ( code, text, value, remark) VALUES ( 'status', '307', '307', 'temporary redirect');
INSERT INTO dic ( code, text, value, remark) VALUES ( 'status', '308', '308', 'permanent redirect');
INSERT INTO dic ( code, text, value, remark) VALUES ( 'status', '400', '400', 'bad request');
INSERT INTO dic ( code, text, value, remark) VALUES ( 'status', '401', '401', 'unauthorized');
INSERT INTO dic ( code, text, value, remark) VALUES ( 'status', '402', '402', 'payment required');
INSERT INTO dic ( code, text, value, remark) VALUES ( 'status', '403', '403', 'forbidden');
INSERT INTO dic ( code, text, value, remark) VALUES ( 'status', '404', '404', 'not found');
INSERT INTO dic ( code, text, value, remark) VALUES ( 'status', '405', '405', 'method not allowed');
INSERT INTO dic ( code, text, value, remark) VALUES ( 'status', '406', '406', 'not acceptable');
INSERT INTO dic ( code, text, value, remark) VALUES ( 'status', '407', '407', 'proxy authentication required');
INSERT INTO dic ( code, text, value, remark) VALUES ( 'status', '408', '408', 'request timeout');
INSERT INTO dic ( code, text, value, remark) VALUES ( 'status', '409', '409', 'conflict');
INSERT INTO dic ( code, text, value, remark) VALUES ( 'status', '410', '410', 'gone');
INSERT INTO dic ( code, text, value, remark) VALUES ( 'status', '411', '411', 'length required');
INSERT INTO dic ( code, text, value, remark) VALUES ( 'status', '412', '412', 'precondition failed');
INSERT INTO dic ( code, text, value, remark) VALUES ( 'status', '413', '413', 'payload too large');
INSERT INTO dic ( code, text, value, remark) VALUES ( 'status', '414', '414', 'uri too long');
INSERT INTO dic ( code, text, value, remark) VALUES ( 'status', '415', '415', 'unsupported media type');
INSERT INTO dic ( code, text, value, remark) VALUES ( 'status', '416', '416', 'range not satisfiable');
INSERT INTO dic ( code, text, value, remark) VALUES ( 'status', '417', '417', 'expectation failed');
INSERT INTO dic ( code, text, value, remark) VALUES ( 'status', '418', '418', 'I''m a teapot');
INSERT INTO dic ( code, text, value, remark) VALUES ( 'status', '422', '422', 'unprocessable entity');
INSERT INTO dic ( code, text, value, remark) VALUES ( 'status', '423', '423', 'locked');
INSERT INTO dic ( code, text, value, remark) VALUES ( 'status', '424', '424', 'failed dependency');
INSERT INTO dic ( code, text, value, remark) VALUES ( 'status', '426', '426', 'upgrade required');
INSERT INTO dic ( code, text, value, remark) VALUES ( 'status', '428', '428', 'precondition required');
INSERT INTO dic ( code, text, value, remark) VALUES ( 'status', '429', '429', 'too many requests');
INSERT INTO dic ( code, text, value, remark) VALUES ( 'status', '431', '431', 'request header fields too large');
INSERT INTO dic ( code, text, value, remark) VALUES ( 'status', '500', '500', 'internal server error');
INSERT INTO dic ( code, text, value, remark) VALUES ( 'status', '501', '501', 'not implemented');
INSERT INTO dic ( code, text, value, remark) VALUES ( 'status', '502', '502', 'bad gateway');
INSERT INTO dic ( code, text, value, remark) VALUES ( 'status', '503', '503', 'service unavailable');
INSERT INTO dic ( code, text, value, remark) VALUES ( 'status', '504', '504', 'gateway timeout');
INSERT INTO dic ( code, text, value, remark) VALUES ( 'status', '505', '505', 'http version not supported');
INSERT INTO dic ( code, text, value, remark) VALUES ( 'status', '506', '506', 'variant also negotiates');
INSERT INTO dic ( code, text, value, remark) VALUES ( 'status', '507', '507', 'insufficient storage');
INSERT INTO dic ( code, text, value, remark) VALUES ( 'status', '508', '508', 'loop detected');
INSERT INTO dic ( code, text, value, remark) VALUES ( 'status', '510', '510', 'not extended');
INSERT INTO dic ( code, text, value, remark) VALUES ( 'status', '511', '511', 'network authentication required');
INSERT INTO dic ( code, text, value, remark) VALUES ( 'contentType', 'application/json', 'application/json', null);
INSERT INTO dic ( code, text, value, remark) VALUES ( 'contentType', 'application/x-www-form-urlencoded', 'application/x-www-form-urlencoded', null);
INSERT INTO dic ( code, text, value, remark) VALUES ( 'contentType', 'application/xhtml+xml', 'application/xhtml+xml', null);
INSERT INTO dic ( code, text, value, remark) VALUES ( 'contentType', 'application/xml', 'application/xml', null);
INSERT INTO dic ( code, text, value, remark) VALUES ( 'contentType', 'multipart/form-data', 'multipart/form-data', null);
INSERT INTO dic ( code, text, value, remark) VALUES ( 'contentType', 'text/css', 'text/css', null);
INSERT INTO dic ( code, text, value, remark) VALUES ( 'contentType', 'text/csv', 'text/csv', null);
INSERT INTO dic ( code, text, value, remark) VALUES ( 'contentType', 'text/html', 'text/html', null);
INSERT INTO dic ( code, text, value, remark) VALUES ( 'contentType', 'text/json', 'text/json', null);
INSERT INTO dic ( code, text, value, remark) VALUES ( 'contentType', 'text/plain', 'text/plain', null);
INSERT INTO dic ( code, text, value, remark) VALUES ( 'contentType', 'text/xml', 'text/xml', null);
INSERT INTO dic ( code, text, value, remark) VALUES ( 'charset', 'utf-8', 'utf-8', null);
INSERT INTO dic ( code, text, value, remark) VALUES ( 'charset', 'utf-16', 'utf-16', null);
INSERT INTO dic ( code, text, value, remark) VALUES ( 'charset', 'iso-8859-1', 'iso-8859-1', null);
INSERT INTO dic ( code, text, value, remark) VALUES ( 'charset', 'gb2312', 'gb2312', null);


create table response
(
	id int auto_increment
		primary key,
	identifier varchar(255) null,
	path varchar(255) not null,
	method varchar(20) default 'get' not null,
	collectionId int not null,
	status int default 200 not null,
	contentType varchar(100) default 'application/json' not null,
	charset varchar(50) default 'UTF-8' not null,
	headers varchar(2000) null,
	body longtext null,
	remark varchar(2000) null,
	createTime datetime not null
);

create index response__index_1
	on response (collectionId);

create index response__index_2
	on response (path);

create index response__index_3
	on response (identifier);


