export default {
    page: {
        home: { name: 'home', tarbar: 1, header: 1, htitle: '首页' },
        login: { login: 'conf', tarbar: 0, header: 0, htitle: '登录' }
    },
    conf: {
        home: { name: 'conf', action: 'home', tarbar: 1, header: 1, htitle: '配置' },
        list: { name: 'conf', action: 'list', tarbar: 1, header: 1, htitle: '配置列表' },
        create: { name: 'conf', action: 'create', tarbar: 1, header: 1, htitle: '配置新增' },
        modify: { name: 'conf', action: 'modify', tarbar: 1, header: 1, htitle: '配置更新' },
        detail: { name: 'conf', action: 'detail', tarbar: 1, header: 1, htitle: '配置详情' },
        remove: { name: 'conf', action: 'remove', tarbar: 1, header: 1, htitle: '配置删除' },
        search: { name: 'conf', action: 'search', tarbar: 1, header: 1, htitle: '配置查询' }
    },
    note: {
        home: { name: 'note', action: 'home', tarbar: 3, header: 3, htitle: '笔记' },
        list: { name: 'note', action: 'list', tarbar: 3, header: 3, htitle: '笔记列表' },
        read: { name: 'note', action: 'read', tarbar: 3, header: 3, htitle: '笔记详情' },
        create: { name: 'note', action: 'create', tarbar: 3, header: 3, htitle: '笔记新增' },
        modify: { name: 'note', action: 'modify', tarbar: 3, header: 3, htitle: '笔记更新' },
        detail: { name: 'note', action: 'detail', tarbar: 3, header: 3, htitle: '笔记详情' },
        remove: { name: 'note', action: 'remove', tarbar: 3, header: 3, htitle: '笔记删除' },
        search: { name: 'note', action: 'search', tarbar: 3, header: 3, htitle: '笔记查询' }
    },
    bill: {
        home: { name: 'bill', action: 'home', tarbar: 2, header: 2, htitle: '账单' },
        list: { name: 'bill', action: 'list', tarbar: 2, header: 2, htitle: '账单列表' },
        create: { name: 'bill', action: 'create', tarbar: 2, header: 2, htitle: '账单新增' },
        modify: { name: 'bill', action: 'modify', tarbar: 2, header: 2, htitle: '账单更新' },
        detail: { name: 'bill', action: 'detail', tarbar: 2, header: 2, htitle: '账单详情' },
        remove: { name: 'bill', action: 'remove', tarbar: 2, header: 2, htitle: '账单删除' },
        search: { name: 'bill', action: 'search', tarbar: 2, header: 2, htitle: '账单查询' },
        statistics: { name: 'bill', action: 'statistics', tarbar: 2, header: 2, htitle: '账单统计' }
    }
}
