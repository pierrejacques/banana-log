<template>
    <div class="data-creator">
        <!-- <number-input 
            v-model="value"
            :max="10"
            unit="g"
            :accuracy="10"
        /> -->
        <double-date-input
            v-model="value"
        />
    </div>
</template>

<script>
import axios from 'axios'
import NumberInput from '@/components/SingleInputs/NumberInput'
import DoubleDateInput from '@/components/SingleInputs/DoubleDateInput'
import Upload from './Uploader'

const type = 0;

export default {
    name: 'data-creator',
    components: {
        'number-input': NumberInput,
        'double-date-input': DoubleDateInput,
    },
    data() {
        return {
            value: new Date(),
            record: {
                date: '',
                components: [],
                message: '',
            },
            dataTypes: [],
        };
    },
    computed: {
        selectableTypes() {
            return this.dataTypes;
        },
    },
    created() {
        axios.get('/statistic/type/get').then((res) => {
            this.dataTypes = res.data.data;
        }).catch((err) => {});
    },
    methods: {
        selectType() {

        }
    }
}
</script>

<style lang="less" scoped>
.new-data {
    text-align: left;
    .new-data-form {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
}


</style>
