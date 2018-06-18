<template>
    <div class="creator-wrapper" >
        <h1 class="creator-title">{{title}}</h1>
        <section class="creator">
            <slot />
        </section>
        <button class="submit-creation main-bg" @click="$emit('next')">
            {{nextText}}
        </button>
    </div>
</template>

<script>
import IPA from 'ipa.js';

const contentsSchema = new IPA([{
    id: String,
    component: Object,
}]);

export default {
    name: 'creator-wrapper',
    props: {
        title: {
            type: String,
            default: '',
        },
        nextText: {
            type: String,
            default: '',
        },
    },
    methods: {

    }
}
</script>

<style lang="less" scoped>
@import url(../../../assets/less/variables.less);

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
}
</style>
