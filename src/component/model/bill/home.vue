<script>
import BaseHome from '@/component/model/base/home'

export default {
    components: { BaseHome },
    data () {
        return {
            groups: [
                [
                    {
                        name: '账单列表',
                        link: '/bill/list',
                        icon: 'fa fa-fw fa-list'
                    },
                    {
                        name: '账单新增',
                        link: '/bill/create',
                        icon: 'fa fa-fw fa-plus'
                    },
                    {
                        name: '账单统计',
                        link: '/bill/statistics',
                        icon: 'fa fa-fw fa-bar-chart'
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
