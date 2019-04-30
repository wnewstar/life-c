<script>
import NHeader from '@/component/part/header'
import NTabbar from '@/component/part/tabbar'

export default {
    components: { NHeader, NTabbar },
    name: 'app',
    data () {
        return {}
    }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';

body {
    background: #fbf9fe;
}
body a {
    outline: none;
}
body #main {
    margin: 0 6px 66px 6px;
}

</style>

<template>
    <div id="app">
        <n-header v-if="$route.meta.header"></n-header><n-tabbar v-if="$route.meta.tarbar"></n-tabbar><router-view id="main"></router-view>
    </div>
</template>
