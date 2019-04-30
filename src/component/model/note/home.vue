<script>
import { Group, CellBox } from 'vux'

export default {
    data () {
        return {}
    },
    components: { Group, CellBox }
}
</script>

<template>
    <div>
        <group><cell-box link="/note/list"><i class="fa fa-fw fa-list"></i>&nbsp;笔记列表</cell-box></group>
        <group><cell-box link="/note/create"><i class="fa fa-fw fa-plus"></i>&nbsp;笔记新增</cell-box></group>
    </div>
</template>
