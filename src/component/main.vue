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
</style>

<template>
    <div id="app">
        <n-header v-if="$route.meta.header"></n-header><n-tabbar v-if="$route.meta.tarbar"></n-tabbar><router-view id="main"></router-view>
    </div>
</template>
