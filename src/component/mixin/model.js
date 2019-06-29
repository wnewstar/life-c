import base from '@/component/mixin/base'

export default {
    mixins: [base],
    data () {
        return {
            name: null,
            action: null,
            create: {
                flag: 0,
                item: {}
            },
            detail: {
                flag: 0,
                item: {}
            },
            modify: {
                flag: 0,
                item: {}
            },
            search: {
                flag: 0,
                page: 1,
                size: 10,
                item: {},
                total: 0,
                items: []
            },
            tempset: { tpid: '0' },
            iconset: {
                detail: 'fa fa-fw fa-file',
                delete: 'fa fa-fw fa-trash',
                modify: 'fa fa-fw fa-pencil'
            },
            optionset: {
                ios: [{ key: 'i', value: '收入' }, { key: 'o', value: '支出' }]
            }
        }
    },
    created () {
        this.initMeta()
        this.initConf(false)
    },
    methods: {
        initMeta () {
            this.name = this.$route.meta.name
            this.action = this.$route.meta.action
        },
        initConf () {
            this.showLoading(true)
            this.$store.dispatch('initConf')
            .then(back => {
                this.showLoading(false)
            })
            .catch(back => {
                this.showLoading(false)
                this.showAlertMessage({ title: back.name, content: back.message })
            })
        },
        itemCreate () {

        },
        itemModify () {

        },
        itemRemove () {

        },
        gotoRemove (id) {
            this.deleteid = id
            this.showConfirmMessage(
                {
                    title: '警告',
                    content: '确定删除吗',
                    oncancel: () => {},
                    onconfirm: () => { this.mainDelete(this) }
                }
            )
        },
        gotoDetail (id) {
            var path = `${this.name}/detail`
            this.$router.push({ path: path, query: { id: id } })
        },
        gotoCreate (id) {
            var path = `${this.name}/create`
            this.$router.push({ path: path, query: { id: id } })
        },
        gotoModify (id) {
            var path = `${this.name}/modify`
            this.$router.push({ path: path, query: { id: id } })
        },
        gotoSearch (data) {

        },
        httpDetail (data) {
            return Promise.resolve(new Promise((resolve, reject) => {
                this.$http.post(this.api[this.name].detail, data).then(r => { resolve(r) }, r => { reject(r) })
            }))
        },
        httpCreate (data) {
            return Promise.resolve(new Promise((resolve, reject) => {
                this.$http.post(this.api[this.name].create, data).then(r => { resolve(r) }, r => { reject(r) })
            }))
        },
        httpModify (data) {
            return Promise.resolve(new Promise((resolve, reject) => {
                this.$http.post(this.api[this.name].modify, data).then(r => { resolve(r) }, r => { reject(r) })
            }))
        },
        httpRemove (data) {
            return Promise.resolve(new Promise((resolve, reject) => {
                this.$http.post(this.api[this.name].remove, data).then(r => { resolve(r) }, r => { reject(r) })
            }))
        },
        httpSearch (data) {
            return Promise.resolve(new Promise((resolve, reject) => {
                this.$http.post(this.api[this.name].search, data).then(r => { resolve(r) }, r => { reject(r) })
            }))
        }
    }
}
