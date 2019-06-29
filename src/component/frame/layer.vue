<script>
import { Alert, Confirm, Loading, TransferDom } from 'vux'

export default {
    components: {
        Alert,
        Confirm,
        Loading
    },
    directives: {
        TransferDom
    },
    props: { alert: null, confirm: null, loading: null }
}
</script>

<style scoped>
</style>

<template>
    <div>
        <div v-transfer-dom>
            <loading :show="loading.show"></loading>
        </div>
        <div v-transfer-dom>
            <alert v-model="alert.show" :title="alert.title" :content="alert.content"></alert>
        </div>
        <div v-transfer-dom>
            <confirm v-model="confirm.show" :title="confirm.title" @on-cancel="confirm.oncancel" @on-confirm="confirm.onconfirm">{{ confirm.content }}</confirm>
        </div>
    </div>
</template>
