<template>
    <div class="create-btn-wrapper" :class="{ active: !isFolded }">
        <a class="create-btn main-bg shadow" @click="showTypes">
            <div class="inside">
                +
            </div>
        </a>
        <a 
            v-if="!isFolded"
            class="type-selector main-bg iconfont shadow"
            :class="{ active: selectorsVisible, [`icon-${type.icon}`]: true }"
            v-for="(type, idx) in types" 
            :key="idx" 
            :style="type.style"
            :name="type.name"
            @click="selectType(type.component)"
        />
        <div v-if="!isFolded" class="mask" @click="showTypes"/>
    </div>
</template>

<script>
import DataCreator from './Creators/DataCreator';
import MealCreator from './Creators/MealCreator';
import MessageCreator from './Creators/MessageCreator';
import ShittingCreator from './Creators/ShittingCreator';

const types = [{
    name: '数据',
    icon: 'measurement',
    component: DataCreator,
}, {
    name: '进食',
    icon: 'meal',
    component: MealCreator,
}, {
    name: '排便',
    icon: 'shit',
    component: MessageCreator,
}, {
    name: '消息',
    icon: 'message',
    component: ShittingCreator,
}].map((item, idx) => {
    const r = 100;
    const phase = 1 / 8;
    const angle = Math.PI * (phase - 1 / 2 + (1 - 2 * phase) * idx / 3);
    return {
        ...item,
        style: {
            bottom: `${r * Math.sin(angle) - 25}px`,
            right: `${r * Math.cos(angle) - 25}px`,
        }
    };
});

export default {
    name: 'create-btn',
    data() {
        return {
            types,
            isFolded: true,
            selectorsVisible: false,
        };
    },
    methods: {
        showTypes() {
            if (this.isFolded) {
                this.isFolded = false;
                setTimeout(() => {
                    this.selectorsVisible = true;
                }, 30);
            } else {
                this.isFolded = true;
                this.selectorsVisible = false;
            }
        },
        selectType(component) {
            this.showTypes();
            this.$emit('open', component);
        },
    }
};
</script>

<style lang="less" scoped>
@t: 0.3s;

.create-btn-wrapper {
    @wrapper-s: 300px;
    position: fixed;
    bottom: 15vh;
    right: 20vw;
    z-index: 10;
    height: @wrapper-s;
    width: @wrapper-s;
    transition: @t;
    .create-btn {
        position: absolute;
        bottom: -@s/2;
        right: -@s/2;
        font-size: 50px;
        font-weight: 400;
        @s: 70px;
        height: @s;
        line-height: @s;
        width: @s;
        border-radius: 50%;
        color: white;
        box-shadow: 0 2px 5px 0 #0003;
        transition: @t;
        .inside {
            transition: @t;
        }
    }
    .type-selector {
        position: absolute;
        @s: 50px;
        height: @s;
        width: @s;
        line-height: @s;
        font-size: 30px;
        border-radius: 50%;
        color: white;
        transition: @t;
        opacity: 0;
        &.active {
            opacity: 1;
        }
        &::after {
            content: attr(name);
            position: absolute;
            top: 0;
            right: 45px;
            font-size: 14px;
            font-weight: 600;
            width: 100%;
            text-align: center;
        }
    }
}

.create-btn-wrapper.active {
    right: 0;
    bottom: 25vh;
    .create-btn {
        box-shadow: 0 0 0 140px #0007;
        .inside {
            transform: translate(-12px) rotate(45deg) scale(0.7);
        }
    }
    .mask {
        position: fixed;
        z-index: -1;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        // background: #0003;
    }
}
</style>
