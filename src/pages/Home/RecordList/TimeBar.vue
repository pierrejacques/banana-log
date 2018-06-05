<template>
    <li class="time-bar bg">
        {{formatDate}}
    </li>
</template>

<script>
import { date2Str } from '@/utils/tools';

export default {
    name: 'time-bar',
    props: {
        time: {
            type: Date,
            default: () => new Date(),
        }
    },
    computed: {
        formatDate() {
            const str = date2Str(this.time);
            const today = date2Str();
            const yesterday = date2Str(new Date(new Date() - 1000 * 60 * 60 * 24));
            if (str === today) {
                return '今天';
            }
            if (str === yesterday) {
                return '昨天35';
            }
            return str;
        }
    }
}
</script>

<style lang="less" scoped>
.time-bar {
    @h: 35px;
    line-height: @h;
    height: @h;
    width: 100%;
    background: #eee;
    color: #888;
}
</style>
