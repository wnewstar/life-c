<script>
import model from '@/component/mixin/model'

import BxHome from '@/component/model/base/home'

import XxLayer from '@/component/frame/layer'
import XxListZero from '@/component/widget/listzero'
import XxPopupRadioTree from '@/component/widget/popupradiotree'

import { Group, XInput, XButton, Card, Flexbox, FlexboxItem, Swipeout, SwipeoutItem, SwipeoutButton } from 'vux'

export default {
    components: {
        Group,
        XInput,
        XButton,
        Card,
        Flexbox,
        FlexboxItem,
        Swipeout,
        SwipeoutItem,
        SwipeoutButton,
        BxHome,
        XxLayer,
        XxListZero,
        XxPopupRadioTree
    },
    mixins: [model],
    created () {
        console.log(this.name)
        if (this.action === 'create') {
            this.create.item = {
                pid: 0,
                path: '0',
                tpid: '0',
                name: String()
            }
        }
    }
}
</script>

<style scoped lang="less">
@import '~vux/src/styles/1px.less';
</style>

<template>
    <div>
        <xx-layer
            :alert="alert"
            :confirm="confirm"
            :loading="loading"></xx-layer>
        <div v-if="action == 'home'">
            <bx-home :groups="$confmenu.conf"></bx-home>
        </div>
        <div v-if="action == 'create'">
            <group>
                <xx-popup-radio-tree
                    title="上级"
                    v-model="create.item.tpid"
                    :items="$store.state.confdata.tree"></xx-popup-radio-tree>
            </group>
            <group>
                <x-input
                    required
                    type="text"
                    title="名称"
                    text-align="right"
                    v-model="create.item.name"></x-input>
            </group>
            <group>
                <x-button type="primary" @click.native="createConf">保存</x-button>
            </group>
        </div>
        <div v-if="action == 'detail'">
            <group>
                <xx-popup-radio-tree
                    title="上级"
                    v-model="detail.item.tpid"
                    :items="$store.state.confdata.tree"></xx-popup-radio-tree>
            </group>
            <group>
                <x-input
                    required
                    type="text"
                    title="名称"
                    text-align="right"
                    v-model="detail.item.name"></x-input>
            </group>
        </div>
        <div v-if="action == 'modify'">
            <group>
                <xx-popup-radio-tree
                    title="上级"
                    v-model="modify.item.tpid"
                    :items="$store.state.confdata.tree"></xx-popup-radio-tree>
            </group>
            <group>
                <x-input
                    required
                    type="text"
                    title="名称"
                    text-align="right"
                    v-model="modify.item.name"></x-input>
            </group>
            <group>
                <x-button type="primary" @click.native="modifyConf">更新</x-button>
            </group>
        </div>
        <div v-if="action == 'search'">
            <xx-list-zero v-if="list.length == 0"></xx-list-zero>
            <swipeout v-for="(item, key) in search.items" :key="key" style="margin-bottom: 10px;">
                <swipeout-item transition-mode="follow">
                    <div slot="content" class="vux-1px-t">
                        <card>
                            <div slot="content">
                                <div class="card-flex card-content main-content">
                                    <div style="text-align: left;">{{ item.name }}</div>
                                    <div style="text-align: right;">{{ getPathText(item.path) }}</div>
                                </div>
                            </div>
                        </card>
                    </div>
                    <div slot="right-menu" style="font-size: 0px;">
                        <swipeout-button background-color="#1AAD19" :width="70" @click.native="gotoDetail(item.id)">
                            <i :class="iconset.detail"></i>
                        </swipeout-button>
                        <swipeout-button background-color="#336DD6" :width="70" @click.native="gotoModify(item.id)">
                            <i :class="iconset.modify"></i>
                        </swipeout-button>
                        <swipeout-button background-color="#D23934" :width="70" @click.native="gotoDelete(item.id)">
                            <i :class="iconset.delete"></i>
                        </swipeout-button>
                    </div>
                </swipeout-item>
            </swipeout>
        </div>
    </div>
</template>
