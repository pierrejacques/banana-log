<template>
    <ul class="infinite-scroll"
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="hasReachEnd"
        infinite-scroll-distance="10">
        <li v-for="(item, idx) in list" :key="idx" class="record-item">
            {{ item.date }}
            <p>{{ item.name}} : {{item.type}} </p>
        </li>
    </ul>
</template>

<script>
import axios from 'axios';

export default {
    name: 'record-list',
    data() {
        return {
            hasReachEnd: false,
            index: 0,
            list: [],
        };
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
                    this.list = [...this.list, ...res.data.data.recordList];
                    this.index = res.data.data.nextIndex;
                    this.hasReachEnd = res.data.data.reachEnd;
                }).catch((err) => {

                });
            }
        }
    }
}
</script>

<style lang="less" scoped>
.infinite-scroll {
    .record-item {
        line-height: 20px;
    }
}
</style>
