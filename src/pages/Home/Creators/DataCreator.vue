<template>
    <div class="data-creator">
        <number-input 
            v-model="value"
            :max="1000"
            unit="g"
            :accuracy=".1"
        />
    </div>
</template>

<script>
import axios from 'axios'
import NumberInput from '@/components/SingleInputs/NumberInput'
import Upload from './Uploader'

const type = 0;

export default {
    name: 'data-creator',
    components: {
        'number-input': NumberInput,
    },
    data() {
        return {
            value: 5,
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
