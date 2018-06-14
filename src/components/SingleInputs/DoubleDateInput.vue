<template>
    <div class="double-date-input-wrapper">
        <mt-picker :slots="dateSlots" @change="onDateChange" :visibleItemCount="3"/>
        <mt-picker :slots="timeSlots" @change="onTimeChange" :visibleItemCount="3"/>
    </div>
</template>

<script>
import { __, date2Str } from '@/utils/tools';

const dateManager = {
    isLeapYear(y) {
        if (y % 100 === 0 && y % 400 !== 0) return false;
        return y % 4 === 0;
    },
    getRange(len, start = 1) {
        return Array(len).fill(null).map((_, idx) => __(start + idx));
    },
    getYYYYs() {
        const current = new Date().getFullYear();
        return this.getRange(10, current - 8);
    },
    getMMs() {
        return this.getRange(12);
    },
    getDDs(yIn, mIn) {
        const y = parseInt(yIn);
        const m = parseInt(mIn);
        const big = new Set([1, 3, 5, 7, 8, 10, 12]);
        if (m == 2) {
            return this.getRange(this.isLeapYear(y) ? 29 : 28);
        }
        return this.getRange(big.has(m) ? 31 : 30);
    },
    getHHs() {
        return this.getRange(24, 0);
    },
    getmms() {
        return this.getRange(60, 0);
    }
};

const dateSlots = [{
    flex: 2,
    values: dateManager.getYYYYs(),
    textAlign: 'center',
    defaultIndex: 0,
}, {
    flex: 1,
    divider: true,
    content: '年',
}, {
    flex: 2,
    values: dateManager.getMMs(),
    textAlign: 'center',
    defaultIndex: 0,
}, {
    flex: 1,
    divider: true,
    content: '月',
}, {
    flex: 2,
    values: dateManager.getDDs(new Date().getFullYear(), 1),
    defaultIndex: 0,
}, {
    flex: 1,
    divider: true,
    content: '日'
}];

const timeSlots = [{
    flex: 2,
    values: dateManager.getHHs(),
    textAlign: 'center',
    defaultIndex: 0,
}, {
    flex: 1,
    divider: true,
    content: '时',
}, {
    flex: 2,
    values: dateManager.getmms(),
    textAlign: 'center',
    defaultIndex: 0,
}, {
    flex: 1,
    divider: true,
    content: '分',
}];

export default {
    name: 'double-date-list',
    props: {
        value: {
            type: Date,
            default: () => new Date(),
        }
    },
    data() {
        return {
            dateSlots,
            timeSlots,
        };
    },
    created() {
        this.syncData();
    },
    watch: {
        value() {
            this.syncData();
        },
    },
    methods: {
        onDateChange(picker, values) {
            let [YYYY, MM, DD] = values;
            const valueOptions = dateManager.getDDs(YYYY, MM);
            if (DD > valueOptions.length) {
                DD = valueOptions.length;
            }
            this.dateSlots[4].values = valueOptions;
            picker.setSlotValue(4, __(DD));
            this.$emit('input', new Date(`${YYYY}-${MM}-${DD} ${this.value.getHours()}:${this.value.getMinutes()}`));
        },
        onTimeChange(_, values) {
            const [HH, mm] = values;
            this.$emit('input', new Date(`${this.YYYY}-${this.MM}-${this.DD} ${HH}:${mm}`));
        },
        syncData() {
            this.dateSlots[0].defaultIndex = this.YYYY - new Date().getFullYear() + 8;
            this.dateSlots[2].defaultIndex = this.MM - 1;
            this.dateSlots[4].defaultIndex = this.DD - 1;
            this.timeSlots[0].defaultIndex = this.HH;
            this.timeSlots[2].defaultIndex = this.mm;
        },
    },
    computed: {
        YYYY() {
            return this.value.getFullYear();
        },
        MM() {
            return this.value.getMonth() + 1;
        },
        DD() {
            return this.value.getDate();
        },
        HH() {
            return this.value.getHours();
        },
        mm() {
            return this.value.getMinutes();
        },
    }
}
</script>

<style lang="less" scoped>
.double-date-input-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 320px;
}
</style>
