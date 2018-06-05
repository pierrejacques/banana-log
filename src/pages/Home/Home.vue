<template>
    <div class="home-page">
        <record-list />
        <create-btn @open="openDialog"/>
        <app-dialog
            :visible="visible"
            :component="component"
            @close="closeDialog"
        />
    </div>
</template>

<script>
import AppDialog from '@/components/AppDialog';
import RecordList from './RecordList/RecordList';
import CreateBtn from './CreateBtn';

export default {
    name: 'home',
    data() {
        return {
            visible: false,
            component: null,
        };
    },
    components: {
        'app-dialog': AppDialog,
        'record-list': RecordList,
        'create-btn': CreateBtn,
    },
    methods: {
        openDialog({ component, name }) {
            this.visible = true;
            this.component = component;
            this.$emit('changeTitle', `创建${name}记录`);
        },
        closeDialog() {
            this.visible = false;
            this.$emit('changeTitle', '');
        },
    }
}
</script>

<style lang="less" scoped>

</style>
