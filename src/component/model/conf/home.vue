<script>
import BaseHome from '@/component/model/base/home'

export default {
    components: { BaseHome },
    data () {
        return {
            groups: [
                [
                    {
                        name: '配置列表',
                        link: '/conf/list',
                        icon: 'fa fa-fw fa-list'
                    },
                    {
                        name: '配置新增',
                        link: '/conf/create',
                        icon: 'fa fa-fw fa-plus'
                    }
                ]
            ]
        }
    }
}
</script>

<template>
    <div><base-home :margin="10" :groups="groups"></base-home></div>
</template>
