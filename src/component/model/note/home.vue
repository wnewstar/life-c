<script>
import BaseHome from '@/component/model/base/home'

export default {
    components: { BaseHome },
    data () {
        return {
            groups: [
                [
                    {
                        name: '笔记列表',
                        link: '/note/list',
                        icon: 'fa fa-fw fa-list'
                    },
                    {
                        name: '笔记新增',
                        link: '/note/create',
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
