<template>
    <ul class="infinite-scroll record-list"
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="hasReachEnd"
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
import IPA, { From } from 'ipa.js';
import axios from 'axios';
import { date2Str } from '@/utils/tools';
import { DateString } from '@/utils/ipa.type';
import Record from './Record';
import TimeBar from './TimeBar';

const listSchema = new IPA([{
    type: From(0, 1, 2, 3, 4),
    name: String,
    date: DateString,
    message: String,
    location: String,
    components: [{
        name: String,
        unit: String,
        amount: Number,
    }],
}]);

export default {
    name: 'record-list',
    components: {
        record: Record,
        'time-bar': TimeBar,
    },
    data() {
        return {
            hasReachEnd: false,
            index: 0,
            records: [],
        };
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
            if (!this.hasReachEnd) {
                axios.get('record/get', {
                    params: {
                        index: this.index,
                        amount: 15,
                    }
                }).then((res) => {
                    if (res.data.code !== 200) throw new Error(res.data.msg);
                    const list = listSchema.guarantee(res.data.data.recordList);
                    list.forEach(i => i.date = new Date(i.date));
                    this.records = [...this.records, ...list];
                    this.index = res.data.data.nextIndex;
                    this.hasReachEnd = res.data.data.reachEnd;
                }).catch((err) => {

                });
            }
        },
    }
}
</script>

<style lang="less" scoped>
.record-list {
}
</style>
