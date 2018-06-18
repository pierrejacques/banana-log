<template>
    <div class="home-page">
        <record-list 
            :records="records"
            @fetchMore="fetchMore"
        />
        <create-btn @open="openDialog"/>
        <mt-popup
            v-model="visible"
            position="bottom"
        >
            <component :is="component" @submit="submit"/>
            <a class="close-btn" @click="visible = false">
                <i class="iconfont icon-cancel"/>
            </a>
        </mt-popup>
    </div>
</template>

<script>
import IPA, { From } from 'ipa.js';
import { DateString } from '@/utils/ipa.type';
import RecordList from './RecordList/RecordList';
import CreateBtn from './CreateBtn';
import axios from 'axios';

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
    name: 'home',
    data() {
        return {
            hasReachEnd: false,
            index: 0,
            records: [],
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
        reFetch() {
            this.hasReachEnd = false;
            this.index = 0;
            this.records = [];
            this.fetchMore();
        },
        fetchMore() {
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
        openDialog(component) {
            this.visible = true;
            this.component = component;
        },
        submit(data) {
            axios.post('/record/create', data).then(res => {
                if (res.data.code === 200) {
                    this.visible = false;
                    this.reFetch();
                }
            }).catch(err => {
                console.log(err);
            });
        }
    },
    watch: {
        visible(v) {
            if (!v) {
                this.component = null;
            }
        }
    },
}
</script>

<style lang="less" scoped>
    .close-btn {
        position: absolute;
        top: 17px;
        left: 20px;
        .iconfont {
            font-size: 24px;
            color: silver;
        }

    }
</style>
