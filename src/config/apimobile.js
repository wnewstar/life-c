const basepath = process.env.API_ROOT

export default {
    base: basepath,
    user: {
        login: `${basepath}/api/user/login`,
        create: `${basepath}/api/bill/create`
    },
    file: {
        upload: `${basepath}/api/file/upload`
    },
    conf: {
        tree: `${basepath}/api/conf/tree`,
        list: `${basepath}/api/conf/list`,
        create: `${basepath}/api/conf/create`,
        delete: `${basepath}/api/conf/delete`,
        detail: `${basepath}/api/conf/detail`,
        modify: `${basepath}/api/conf/modify`,
        search: `${basepath}/api/conf/search`
    },
    note: {
        list: `${basepath}/api/note/list`,
        create: `${basepath}/api/note/create`,
        delete: `${basepath}/api/note/delete`,
        detail: `${basepath}/api/note/detail`,
        modify: `${basepath}/api/note/modify`,
        search: `${basepath}/api/note/search`
    },
    bill: {
        list: `${basepath}/api/bill/list`,
        create: `${basepath}/api/bill/create`,
        delete: `${basepath}/api/bill/delete`,
        detail: `${basepath}/api/bill/detail`,
        modify: `${basepath}/api/bill/modify`,
        search: `${basepath}/api/bill/search`,
        statistics: `${basepath}/api/bill/statistics`
    }
}
