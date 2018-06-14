<template>
    <div class="number-input-wrapper">
        <div class="value">
            {{format}}<span class="unit">{{unit}}</span>
        </div>
        <div class="ruler-wrapper" ref="ruler" @scroll.passive="onScroll">
            <ul 
                class="ruler"
            >
                <li class="padding-left"/>
                <li 
                    class="scale"
                    :class="{
                        five: i % 5 === 0,
                        ten: i % 10 === 0,
                    }" 
                    v-for="(scale, i) in scales" 
                    :key="i"
                    :data-value="scale"
                />
                <li class="padding-right"/>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: '',
    props: {
        value: {
            type: Number,
            default: 0,
        },
        min: {
            type: Number,
            default: 0,
        },
        max: {
            type: Number,
            default: 100,
        },
        accuracy: {
            type: Number,
            default: 10,
        },
        unit: {
            type: String,
            default: '',
        },
    },
    computed: {
        scales() {
            return Array((this.max - this.min) * this.accuracy + 1)
                .fill(null)
                .map((_, idx) => (this.min * this.accuracy + idx) / this.accuracy);
        },
        translateValue() {
            return -(this.value - this.min) * this.accuracy * 6;
        },
        format() {
            return this.value;
        }
    },
    methods: {
        onScroll(e) {
            let newVal = this.$refs.ruler.scrollLeft / this.accuracy / 6 + this.min;
            if (newVal > this.max) newVal = this.max;
            if (newVal < this.min) newVal = this.min;
            newVal = Math.floor(newVal * this.accuracy) / this.accuracy;
            if (newVal !== this.value) {
                this.$emit('input', newVal);
            }
        }
    },
    mounted() {
        this.$refs.ruler.scrollLeft = (this.value - this.min) * 6 * this.accuracy;
    }
}
</script>

<style lang="less" scoped>
.number-input-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    height: 300px;
    padding: 25px 0;
    box-sizing: border-box;
    .value {
        font-size: 60px;
        line-height: 100px;
        font-weight: bolder;
        color: #333;
        .unit {
            font-size: 40px;
        }
    }
    .ruler-wrapper {
        position: relative;
        width: 100%;
        overflow: scroll;
        background: #eee;
        .ruler {
            display: flex;
            height: 80px;
        }
    }

    @w: 5px;
    .scale {
        position: relative;
        flex: 0 0 auto;
        border-left: 1px solid #333;
        width: @w;
        height: 20px;
        &.five {
            height: 25px;
        }
        &.ten {
            height: 35px;
        }
        &.ten::before {
            content: attr(data-value);
            display: block;
            position: absolute;
            text-align: center;
            width: 4em;
            bottom: -40px;
            left: -2em;
            font-size: 18px;
        }
    }
    .padding-left, .padding-right {
        flex: 0 0 auto;
        height: 20px;
    }
    .padding-left {
        width: 50%;
    }
    .padding-right {
        width: calc(50% - @w + 1px);
    }
}
</style>
