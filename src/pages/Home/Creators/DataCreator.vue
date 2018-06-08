<template>
    <div class="data-creator">
        <ul class="component-list">
            <li v-for="(component, idx) in record.components" :key="idx">
                {{component.name}} {{component.amount}}{{component.unit}}
            </li>
        </ul>
    </div>
</template>

<script>
import axios from 'axios'
import Upload from './Uploader'

const type = 0;

export default {
    name: 'data-creator',
    data() {
        return {
            record: {
                date: '',
                components: [],
                message: '',
            },
            componentOptions: [],
        };
    },
    create() {
        axios.get('component/get').then((res) => {
            this.componentOptions = res.data.data;
        }).catch((err) => {});
    },
    methods: {
        createComponentType(component) {
            this.record.components.push(component);
        },
    }
}
</script>

<style>

</style>
