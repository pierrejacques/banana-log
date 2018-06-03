<template>
    <li class="record-wrapper bg">
        <span class="time">
            {{data.time}}
        </span>
        <i 
            class="icon iconfont" 
            :class="`icon-${iconInfo[data.type].class}`" 
            :style="{ color: iconInfo[data.type].color }"
        />
        <div class="content">
            <h2 v-if="data.name" class="title">{{data.name}}</h2>
            <div v-if="data.message" class="msg">{{data.message}}</div>
            <ul v-if="data.components.length > 0">
                <li 
                    class="component-item"
                    v-for="(component, idx) in data.components"
                    :key="idx"
                >
                    <span class="component-name">
                        {{component.name}}
                    </span>
                    <span class="component-amount">
                        {{component.amount}}
                    </span>
                    <span class="component-unit">
                        {{component.unit}}
                    </span>
                </li>
            </ul>
            <div v-if="data.location">{{data.location}}</div>
        </div>
    </li>
</template>

<script>
import { date2Str } from '@/utils/tools';

const iconInfo = [{
    class: 'measurement',
    color: '#536860',
}, {
    class: 'meal',
    color: '#ff992c',
}, {
    class: 'shit',
    color: '#61382c',
}, {
    class: 'location',
    color: '#ca2525',
}, {
    class: 'message',
    color: '#493c82',
}];

export default {
    name: 'record',
    props: {
        data: {
            type: Object,
            default: () => {},
        },
    },
    data() {
        return {
            iconInfo,
        }
    },
    computed: {
        formatTime() {
            return date2Str(this.date, { hasDate: false, hasTime: true });
        }
    }
}
</script>

<style lang="less" scoped>
.record-wrapper {
    display: flex;
    align-items: center;
    text-align: left;
    min-height: 50px;
    margin: 0 5px;
    padding: 10px;
    border-bottom: 1px solid #eee;
    .time {
        color: #888;
    }
    .icon {
        width: 60px;
        font-size: 35px;
        text-align: center;
    }
    .content {
        line-height: 20px;
    }
}
</style>
