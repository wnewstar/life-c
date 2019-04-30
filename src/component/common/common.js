export default {
    data () {
        return {
            api: {
                conf: this.apim.conf
            },
            alert: {
                show: false,
                title: null,
                content: null
            },
            confirm: {
                show: false,
                title: null,
                content: null,
                oncancel: () => {},
                onconfirm: () => {}
            },
            flagm: { a: false },
            temporary: { confdata: {}, conftree: {} }
        }
    },
    methods: {
        getPathText (path) {
            var show = []
            var tree = this.temporary.conftree
            var paths = path.split('-').map(Number)
            for (var i = 1; i < paths.length; i++) {
                if (paths[i] === 0) {
                    continue
                }

                show.push(tree[paths[i]]['conf']['name']), tree = tree[paths[i]]['list']
            }

            return show.join('*')
        },
        setConfTree (data) {
            if (data.body.code === '0') {
                this.temporary.conftree = data.body.data
            } else {
                this.showAlertMessage({ title: '错误', content: data.body.text })
            }
        },
        getConfTree (bool) {
            return new Promise((resolve, reject) => {
                this.http.get(this.api.conf.tree).then(response => { resolve(response) }, response => { reject(response) })
            })
        },
        setConfData (data) {
            if (data.body.code === '0') {
                var list = data.body.data
                for (var i in list) {
                    var item = list[i]
                    item.path = `${item.path}-${item.id}`
                    this.temporary.confdata[list[i].id] = item
                }
            } else {
                this.showAlertMessage({ title: '错误', content: data.body.text })
            }
        },
        getConfData (bool) {
            return new Promise((resolve, reject) => {
                this.http.get(this.api.conf.list).then(response => { resolve(response) }, response => { reject(response) })
            })
        },
        setLoading (bool) {
            this.flagm.a = bool
        },
        showAlertMessage (data) {
            this.alert.show = true, this.alert.title = data.title, this.alert.content = data.content
        },
        showConfirmMessage (data) {
            this.confirm.show = true, this.confirm.title = data.title
            this.confirm.content = data.content, this.confirm.oncancel = data.oncancel, this.confirm.onconfirm = data.onconfirm
        }
    }
}
