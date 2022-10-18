<template>
    <tr v-bind="$attrs" v-if="tag == 'tr' && data.length == 0">
        <td class="text-center" :colspan="colspan">No data available!</td>
    </tr>
    <div v-bind="$attrs" v-else-if="data.length == 0">
        <slot></slot>
    </div>
</template>
<script>
import { h } from 'vue'

export default {
   /*  render: function() {
        let child;
        if (this.data.length == 0) {
            if (this.tag == 'tr') {
                child = h('td', {
                    attrs: {
                        class: 'text-center',
                        colspan: this.colspan,
                    }
                }, 'No data available!');
            }
            let slot = '';
            if(this.$slots.default != undefined){
                slot = this.$slots.default();
            }
            return h(this.tag, {
                attrs: this.$attrs
            }, [
                child,
                slot,
            ]);
        }
        return;
    }, */
    props: {
        data: {
            type: Array, // String, Number, Boolean, Function, Object, Array
            required: false,
            default: () => {
                return [];
            }
        },
        tag: {
            type: String, // String, Number, Boolean, Function, Object, Array
            required: false,
            default: 'div'
        },
        colspan: {
            type: Number, // String, Number, Boolean, Function, Object, Array
            required: false,
            default: 1
        }
    }
}

</script>
