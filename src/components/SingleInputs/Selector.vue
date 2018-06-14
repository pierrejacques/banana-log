<template>
    <mt-picker :slots="slots" :visibleItemCount="5" valueKey="name" @change="onChange"/>
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
            default: [],
        },
        customContent: {
            type: String,
            default: '自定义',
        },
    },
    data() {
        return {
            slots: [{
                values: [...this.options, { value: -1, name: this.customContent }],
                textAlign: 'center',
                defaultIndex: 0,
            }],
        };
    },
    created() {
        const index = this.options.findIndex(i => i.value === this.value);
        this.slots[0].defaultIndex = index === -1 ? 0 : index;
    },
    methods: {
        onChange(_, values) {
            this.$emit('input', values[0].value);
        }
    },
}
</script>

<style lang="less" scoped>

</style>
