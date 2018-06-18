<template>
    <ul class="infinite-scroll record-list"
        v-infinite-scroll="loadMore"
        infinite-scroll-distance="10">
        <template v-for="(item, i) in transmittedList" >
            <time-bar
                v-if="item.isTime"
                :time="item.date"
                :key="i"
            />
            <record 
                v-else
                class="record-item"
                :data="item"
                :key="i"
            />
        </template>
    </ul>
</template>

<script>
import { date2Str } from '@/utils/tools';
import Record from './Record';
import TimeBar from './TimeBar';

export default {
    name: 'record-list',
    props: {
        records: {
            type: Array,
            default: () => [],
        },
    },
    components: {
        record: Record,
        'time-bar': TimeBar,
    },
    computed: {
        transmittedList() {
            const list = [];
            let currentDate = '';
            this.records.forEach((item) => {
                if (date2Str(item.date) !== currentDate) {
                    currentDate = date2Str(item.date);
                    list.push({
                        isTime: true,
                        date: item.date,
                    });
                }
                list.push({
                    ...item,
                    time: date2Str(item.date, { 
                        hasDate: false, 
                        hasTime: true,
                    }),
                });
            });
            return list;
        }
    },
    methods: {
        loadMore() {
            this.$emit('fetchMore');
        }
    }
}
</script>

<style lang="less" scoped>
.record-list {
}
</style>
