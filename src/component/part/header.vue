<script>
import { XHeader, TransferDom, Actionsheet } from 'vux'
import { saveAs } from 'file-saver/FileSaver'

import domtoimage from 'dom-to-image'

export default {
    components: { XHeader, Actionsheet },
    directives: { TransferDom },
    data () {
        return {
            show: false,
            menus: {
                y: '截图',
                z: '退出'
            }
        }
    },
    methods: {
        click (key, val) {
            if (key === 'z') {
                this.local.id = null
                this.local.uname = null
                this.local.ctime = null
                this.local.token = null
                this.local.etime = null

                this.$router.push('/login?v=' + new Date().getTime())
            } else if (key === 'y') {
                var main = document.getElementById('main')
                var width = main.offsetWidth + 12
                var option = { bgcolor: '#FFF', width: width }

                domtoimage.toBlob(main, option).then(function (blob) { saveAs(blob, 'main.bmp') })
            }
        }
    }
}
</script>

<template>
    <div>
        <div v-transfer-dom>
            <actionsheet show-cancel v-model="show" :menus="menus" @on-click-menu="click"></actionsheet>
        </div>
        <x-header :left-options="{backText: null}" :right-options="{showMore: true}" @on-click-more="show = true">{{ $route.meta.htitle }}</x-header>
    </div>
</template>