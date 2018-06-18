<template>
    <div>
        <mt-picker 
            :slots="slots" 
            :visibleItemCount="5" 
            valueKey="label" 
            @change="onChange"
        />
    </div>
</template>

<script>
export default {
    name: 'selector',
    props: {
        value: {
            types: [Number, String],
            default: 0,
        },
        options: {
            type: Array,
            default: () => [],
        },
        customContent: {
            type: String,
            default: '新建',
        },
        hasCustom: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            index: 0,
        };
    },
    computed: {
        slots() {
            const values = [...this.options];
            if (this.hasCustom) {
                values.push({
                    value: -1,
                    name: this.customContent,
                });
            }
            return [{
                values,
                textAlign: 'center',
                defaultIndex: this.index,
            }];
        }
    },
    mounted() {
        const index = this.options.findIndex(i => i.value === this.value);
        this.index = index === -1 ? 0 : index;
    },
    methods: {
        onChange(_, values) {
            if (values[0]) {
                this.$emit('input', values[0].value);
            }
        }
    },
}
</script>

<style lang="less" scoped>

</style>
