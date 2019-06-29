<script>
import { XHeader, TransferDom, Actionsheet } from 'vux'
import { saveAs } from 'file-saver/FileSaver'

import domtoimage from 'dom-to-image'

export default {
    components: {
        XHeader,
        Actionsheet
    },
    directives: {
        TransferDom
    },
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
                this.$localdata.id = null
                this.$localdata.uname = null
                this.$localdata.ctime = null
                this.$localdata.token = null
                this.$localdata.etime = null

                this.$router.push('/login?v=' + new Date().getTime())
            } else if (key === 'y') {
                var main = document.getElementById('main')
                var width = main.offsetWidth
                var height = main.offsetHeight + 65
                var option = { bgcolor: '#FFF', quality: 1, width, height }

                domtoimage.toBlob(main, option).then(function (blob) { saveAs(blob, 'main.jpg') })
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
        <x-header class="x-header" :left-options="{backText: null}" :right-options="{showMore: true}" @on-click-more="show = true">{{ $route.meta.htitle }}</x-header>
    </div>
</template>
