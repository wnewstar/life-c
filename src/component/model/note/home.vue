<script>
import { Group, CellBox } from 'vux'

export default {
    components: { Group, CellBox },
    data () {
        return {
            iconm: {
                list: 'fa fa-fw fa-list',
                create: 'fa fa-fw fa-plus'
            }
        }
    }
}
</script>

<template>
    <div>
        <group><cell-box link="/note/list"><i :class="iconm.list"></i>&nbsp;笔记列表</cell-box></group>
        <group><cell-box link="/note/create"><i :class="iconm.create"></i>&nbsp;笔记新增</cell-box></group>
    </div>
</template>
