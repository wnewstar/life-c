<script>
import { Card } from 'vux'

export default {
    components: {
        Card
    }
}
</script>

<style scoped>
    .card-content {
        padding: 6px;
    }
</style>

<template>
    <div>
        <card>
            <div slot="content">
                <div class="card-content">
                    <div style="text-align: center; color: red;">没有数据</div>
                </div>
            </div>
        </card>
    </div>
</template>
