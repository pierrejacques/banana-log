<template>
    <div class="number-input-wrapper">
        <div class="value">
            {{format}}<span class="unit">{{unit}}</span>
        </div>
        <svg class="pointer">
            <path fill="#f66" d="M0 0 L20 0 L10 20  Z"/>
        </svg>
        <div class="ruler-wrapper" ref="rulerWrapper" @scroll.passive="onScroll">
            <canvas ref="ruler" class="ruler"/>
        </div>
    </div>
</template>

<script>

const SCALE_WIDTH = 6;

class Ruler {
    constructor(canvas, scales, wrapperWidth) {
        canvas.width = (scales.length - 1) * SCALE_WIDTH + wrapperWidth;
        canvas.height = 80;
        this.context = canvas.getContext('2d');
        this.context.fillStyle = '#999';
        this.context.strokeStyle = '#999';
        this.context.textAlign = 'center';
        scales.forEach((scale, idx) => {
            const x = idx * SCALE_WIDTH + wrapperWidth / 2;
            if (idx % 10 === 0) {
                this.paintScale(x, 30);
                this.paintValue(x, scale);
            } else {
                this.paintScale(x, idx % 5 === 0 ? 20 : 15);
            }
        });
    }

    paintScale(x, height) {
        this.context.beginPath();
        this.context.moveTo(x, 0);
        this.context.lineTo(x, height);
        this.context.stroke();
    }

    paintValue(x, value) {
        this.context.font = '18px sanserif';

        this.context.fillText(value, x, 70);
    }
}

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
    data() {
        return {
            ruler: null,
        }
    },
    computed: {
        format() {
            return this.value.toFixed(Math.log10(this.accuracy));
        }
    },
    methods: {
        onScroll(e) {
            let newVal = this.$refs.rulerWrapper.scrollLeft / this.accuracy / SCALE_WIDTH + this.min;
            if (newVal > this.max) newVal = this.max;
            if (newVal < this.min) newVal = this.min;
            newVal = Math.floor(newVal * this.accuracy) / this.accuracy;
            if (newVal !== this.value) {
                this.$emit('input', newVal);
            }
        },
    },
    mounted() {
        const len = (this.max - this.min) * this.accuracy;
        const scales = Array(len + 1).fill(null).map((_, idx) => 
            (this.min * this.accuracy + idx) / this.accuracy
        );
        this.ruler = new Ruler(
            this.$refs.ruler,
            scales,
            this.$refs.rulerWrapper.offsetWidth
        );
        this.$refs.rulerWrapper.scrollLeft = (this.value - this.min) * SCALE_WIDTH * this.accuracy;
    }
}
</script>

<style lang="less" scoped>
.number-input-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
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
    .pointer {
        width: 20px;
        height: 20px;
        margin: auto;
    }
    .ruler-wrapper {
        position: relative;
        width: 100%;
        overflow-x: scroll;
        overflow-y: hidden;
        background: #eee;
    }
}
</style>
