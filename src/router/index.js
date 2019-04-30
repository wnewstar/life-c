import Vue from 'vue'
import VueRouter from 'vue-router'

import Meta from '@/config/menuconf.js'

import Home from '@/component/page/home'
import Login from '@/component/page/login'

import ConfHome from '@/component/model/conf/home'
import ConfList from '@/component/model/conf/list'
import ConfCreate from '@/component/model/conf/create'
import ConfDetail from '@/component/model/conf/detail'
import ConfModify from '@/component/model/conf/modify'
import ConfSearch from '@/component/model/conf/search'

import NoteHome from '@/component/model/note/home'
import NoteList from '@/component/model/note/list'
import NoteCreate from '@/component/model/note/create'
import NoteDetail from '@/component/model/note/detail'
import NoteModify from '@/component/model/note/modify'
import NoteSearch from '@/component/model/note/search'

import BillHome from '@/component/model/bill/home'
import BillList from '@/component/model/bill/list'
import BillCreate from '@/component/model/bill/create'
import BillDetail from '@/component/model/bill/detail'
import BillModify from '@/component/model/bill/modify'
import BillSearch from '@/component/model/bill/search'
import BillStatistics from '@/component/model/bill/statistics'

Vue.use(VueRouter)

export default new VueRouter({
    routes: [
        { meta: Meta.home, path: '/', component: Home },
        { meta: Meta.home, path: '/home', component: Home },
        { meta: Meta.login, path: '/login', component: Login },

        { meta: Meta.conf, path: '/conf', component: ConfHome },
        { meta: Meta.conf.list, path: '/conf/list', component: ConfList },
        { meta: Meta.conf.create, path: '/conf/create', component: ConfCreate },
        { meta: Meta.conf.detail, path: '/conf/detail', component: ConfDetail },
        { meta: Meta.conf.modify, path: '/conf/modify', component: ConfModify },
        { meta: Meta.conf.search, path: '/conf/search', component: ConfSearch },

        { meta: Meta.note, path: '/note', component: NoteHome },
        { meta: Meta.note.list, path: '/note/list', component: NoteList },
        { meta: Meta.note.create, path: '/note/create', component: NoteCreate },
        { meta: Meta.note.detail, path: '/note/detail', component: NoteDetail },
        { meta: Meta.note.modify, path: '/note/modify', component: NoteModify },
        { meta: Meta.note.search, path: '/note/search', component: NoteSearch },

        { meta: Meta.bill, path: '/bill', component: BillHome },
        { meta: Meta.bill.list, path: '/bill/list', component: BillList },
        { meta: Meta.bill.create, path: '/bill/create', component: BillCreate },
        { meta: Meta.bill.detail, path: '/bill/detail', component: BillDetail },
        { meta: Meta.bill.modify, path: '/bill/modify', component: BillModify },
        { meta: Meta.bill.search, path: '/bill/search', component: BillSearch },
        { meta: Meta.bill.statistics, path: '/bill/statistics', component: BillStatistics }
    ]
})
