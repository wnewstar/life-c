import Vue from 'vue'
import Router from 'vue-router'

import conf from '@/config/router'

import Home from '@/component/page/home'
import Login from '@/component/page/login'

import ModelConf from '@/component/model/conf'

/*
import NoteHome from '@/component/model/note/home'
import NoteList from '@/component/model/note/list'
import NoteRead from '@/component/model/note/read'
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
*/

Vue.use(Router)

export default new Router({
    routes: [
        { meta: conf.page.home, path: '/', component: Home },
        { meta: conf.page.home, path: '/home', component: Home },
        { meta: conf.page.login, path: '/login', component: Login },

        { meta: conf.conf.home, path: '/conf', component: ModelConf },
        { meta: conf.conf.create, path: '/conf/create', component: ModelConf },
        { meta: conf.conf.detail, path: '/conf/detail', component: ModelConf },
        { meta: conf.conf.modify, path: '/conf/modify', component: ModelConf },
        { meta: conf.conf.search, path: '/conf/search', component: ModelConf }

        /*
        { meta: conf.note.home, path: '/note', component: NoteHome },
        { meta: conf.note.list, path: '/note/list', component: NoteList },
        { meta: conf.note.read, path: '/note/read', component: NoteRead },
        { meta: conf.note.create, path: '/note/create', component: NoteCreate },
        { meta: conf.note.detail, path: '/note/detail', component: NoteDetail },
        { meta: conf.note.modify, path: '/note/modify', component: NoteModify },
        { meta: conf.note.search, path: '/note/search', component: NoteSearch },

        { meta: conf.bill.home, path: '/bill', component: BillHome },
        { meta: conf.bill.list, path: '/bill/list', component: BillList },
        { meta: conf.bill.create, path: '/bill/create', component: BillCreate },
        { meta: conf.bill.detail, path: '/bill/detail', component: BillDetail },
        { meta: conf.bill.modify, path: '/bill/modify', component: BillModify },
        { meta: conf.bill.search, path: '/bill/search', component: BillSearch },
        { meta: conf.bill.statistics, path: '/bill/statistics', component: BillStatistics }
        */
    ]
})
