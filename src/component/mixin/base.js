export default {
    data () {
        return {
            alert: {
                show: false,
                title: null,
                content: null
            },
            loading: {
                show: false
            },
            confirm: {
                show: false,
                title: null,
                content: null,
                oncancel: () => {},
                onconfirm: () => {}
            }
        }
    },
    methods: {
        getPathText (path) {
            var show = []
            var tree = this.$store.configdata.tree
            var paths = path.split('-').map(Number)
            for (var i = 1; i < paths.length; i++) {
                if (paths[i] === 0) {
                    continue
                }

                if (paths.length === i) {
                    return show.join('*')
                }

                show.push(tree[paths[i]]['conf']['name']), tree = tree[paths[i]]['list']
            }
        },
        showLoading (bool) {
            this.loading.show = bool
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
