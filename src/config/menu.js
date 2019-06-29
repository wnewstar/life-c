export default {
    conf: [
        [
            { name: '配置列表', link: '/conf/search', icon: 'fa fa-fw fa-list' },
            { name: '配置新增', link: '/conf/create', icon: 'fa fa-fw fa-plus' }
        ]
    ],
    note: [
        [
            { name: '笔记列表', link: '/note/search', icon: 'fa fa-fw fa-list' },
            { name: '笔记新增', link: '/note/create', icon: 'fa fa-fw fa-plus' }
        ]
    ],
    bill: [
        [
            { name: '账单列表', link: '/bill/search', icon: 'fa fa-fw fa-list' },
            { name: '账单新增', link: '/bill/create', icon: 'fa fa-fw fa-plus' },
            { name: '账单统计', link: '/bill/statistics', icon: 'fa fa-fw fa-bar-chart' }
        ]
    ],
    tabbars: [
        { name: '首页', link: '/home', icon: 'fa fa-fw fa-home' },
        { name: '账单', link: '/bill', icon: 'fa fa-fw fa-star' },
        { name: '笔记', link: '/note', icon: 'fa fa-fw fa-edit' }
    ],
    homegrids: [
        { name: '账单', link: '/bill', icon: 'fa fa-fw fa-star', style: { 'font-size': '18px', 'color': '#DC143C' } },
        { name: '笔记', link: '/note', icon: 'fa fa-fw fa-edit', style: { 'font-size': '18px', 'color': '#4B0082' } },
        { name: '计划', link: '/plan', icon: 'fa fa-fw fa-list', style: { 'font-size': '18px', 'color': '#FFA500' } },
        { name: '工作', link: '/work', icon: 'fa fa-fw fa-code', style: { 'font-size': '18px', 'color': '#DA70D6' } },
        { name: '休息', link: '/rest', icon: 'fa fa-fw fa-play', style: { 'font-size': '18px', 'color': '#FF1493' } },
        { name: '读书', link: '/read', icon: 'fa fa-fw fa-book', style: { 'font-size': '18px', 'color': '#006400' } },
        { name: '备忘', link: '/memo', icon: 'fa fa-fw fa-bell', style: { 'font-size': '18px', 'color': '#556B2F' } },
        { name: '操作', link: '/oper', icon: 'fa fa-fw fa-info', style: { 'font-size': '18px', 'color': '#B22222' } },
        { name: '配置', link: '/conf', icon: 'fa fa-fw fa-gear', style: { 'font-size': '18px', 'color': '#6495ED' } }
    ]
}
