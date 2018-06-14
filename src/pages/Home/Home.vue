<template>
    <div class="home-page">
        <record-list />
        <create-btn @open="openDialog"/>
        <mt-popup
            v-model="visible"
            position="bottom"
        >
            <div class="creator-wrapper" >
                <h1 class="creator-title">新建{{popupTitle}}记录</h1>
                <component :is="component" class="creator"/>
                <button class="submit-creation main-bg" @click="submit">
                    确定
                </button>
                <a class="close-btn" @click="visible = false">
                    <i class="iconfont icon-cancel"/>
                </a>
            </div>
        </mt-popup>
    </div>
</template>

<script>
import RecordList from './RecordList/RecordList';
import CreateBtn from './CreateBtn';

export default {
    name: 'home',
    data() {
        return {
            visible: false,
            popupTitle: '',
            component: null,
        };
    },
    components: {
        'record-list': RecordList,
        'create-btn': CreateBtn,
    },
    methods: {
        openDialog({ component, name }) {
            this.visible = true;
            this.component = component;
            this.popupTitle = name;
        },
        submit() {

        }
    }
}
</script>

<style lang="less" scoped>
@import url(../../assets/less/variables.less);

.creator-wrapper {
    display: flex;
    flex-direction: column;
    position: relative;
    box-sizing: border-box;
    width: 100vw;
    min-height: 70vh;
    background: white;
    padding: 0 20px 20px;
    .creator {
        flex-grow: 1;
    }
    .creator-title {
        font-size: 20px;
        font-weight: 600;
        line-height: @header-h;
        border-bottom: 1px solid #eee;
    }
    .submit-creation {
        border: none;
        line-height: 45px;
        font-size: 20px;
        outline: none;
    }
    .close-btn {
        position: absolute;
        top: 17px;
        left: 20px;
        .iconfont {
            font-size: 24px;
            color: silver;
        }

    }
}
</style>
