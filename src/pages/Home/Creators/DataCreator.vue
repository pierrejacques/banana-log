<template>
    <creator-wrapper 
        :title="steps[currentStep].title"
        :nextText="steps[currentStep].nextText"
        @next="nextInput"
    >
        <mt-tab-container v-model="currentStep">
            <mt-tab-container-item :id="0">
                <selector 
                    v-model="dataType"
                    :options="dataTypes"
                />
            </mt-tab-container-item>
            <mt-tab-container-item :id="1" v-if="availableStep > 0">
                <number-input 
                    v-model="dataValue"
                    :unit="dataTypes[dataType].unit"
                /> 
            </mt-tab-container-item>
            <mt-tab-container-item :id="2" v-if="availableStep > 1">
                <double-date-input v-model="date"/>
            </mt-tab-container-item>
        </mt-tab-container>
    </creator-wrapper>
</template>

<script>
import axios from 'axios'
import { date2Str } from '@/utils/tools'
import NumberInput from '@/components/SingleInputs/NumberInput'
import DoubleDateInput from '@/components/SingleInputs/DoubleDateInput'
import Selector from '@/components/SingleInputs/Selector'
import CreatorWrapper from './CreatorWrapper'

const steps = [{
    title: 'step-1',
    nextText: '下一步',
}, {
    title: 'step-2',
    nextText: '下一步',
}, {
    title: 'step-3',
    nextText: '确定',
}];

export default {
    name: 'data-creator',
    components: {
        'creator-wrapper': CreatorWrapper,
        'number-input': NumberInput,
        'double-date-input': DoubleDateInput,
        'selector': Selector,
    },
    data() {
        return {
            steps,
            availableStep: 0,
            currentStep: 0,
            dataTypes: [],
            dataType: null,
            dataValue: 0,
            date: new Date(),
        };
    },
    computed: {
        selectableTypes() {
            return this.dataTypes;
        },
    },
    created() {
        axios.get('/statistic/type/get').then((res) => {
            this.dataTypes = res.data.data.map((i, index) => ({
                label: `${i.name}（${i.unit}）`,
                value: index,
                name: i.name,
                unit: i.unit,
            }));
        }).catch((err) => {});
    },
    methods: {
        selectType() {

        },
        nextInput() {
            if (this.currentStep === this.steps.length - 1) {
                const component = this.dataTypes[this.dataType];
                this.$emit('submit', {
                    type: 0,
                    date: date2Str(this.date, { hasTime: true }),
                    components: [{
                        name: component.name,
                        unit: component.unit,
                        amount: this.dataValue,
                    }],
                });
                return;
            }
            if (this.availableStep === this.currentStep) {
                this.availableStep++;
            }
            this.currentStep++;
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
