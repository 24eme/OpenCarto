<script setup>
import { ref, computed, watch } from "vue";

const props = defineProps({
    name: {
        type: String,
        required: true,
        default: "autocomplete",
    },
    placeholder: {
        type: String,
        required: false,
        default: "Commencez à taper",
    },
    disabled: {
        type: Boolean,
        required: false,
        default: false,
    },
    options: {
        type: Array,
        required: true,
        default: [],
    },
    maxItems: {
        type: Number,
        required: false,
        default: 5,
    },
});

const emit = defineEmits(["filter"]);

const focused = ref(false);
const textFilter = ref("");

const filteredOptions = computed(() => {
    return props.options
        .filter((option) => fuzzysearch(textFilter.value, option))
        .slice(0, props.maxItems);
});

watch(textFilter, () => emit("filter", textFilter));

function fuzzysearch(needle, haystack) {
    // @see https://github.com/bevacqua/fuzzysearch/blob/9873ea0/index.js
    const hlen = haystack.length;
    const nlen = needle.length;

    needle = needle
        .toLocaleUpperCase()
        .normalize("NFD") // @see https://stackoverflow.com/a/37511463
        .replace(/\p{Diacritic}/gu, "");
    haystack = haystack
        .toLocaleUpperCase()
        .normalize("NFD")
        .replace(/\p{Diacritic}/gu, "");

    if (nlen > hlen) {
        return false;
    }

    if (nlen === hlen) {
        // @see https://github.com/bevacqua/fuzzysearch/pull/28/changes
        return haystack.startsWith(needle);
    }

    outer: for (let i = 0, j = 0; i < nlen; i++) {
        var nch = needle.charCodeAt(i);
        while (j < hlen) {
            if (haystack.charCodeAt(j++) === nch) {
                continue outer;
            }
        }
        return false;
    }
    return true;
}
</script>

<template>
    <div class="wrapper">
        <input
            :name="name"
            :placeholder="placeholder"
            :disabled="disabled"
            :value="textFilter"
            @focus="focused = true"
            @blur="focused = false"
            @input="(e) => (textFilter = e.target.value)"
        />
        <div class="autocomplete-options" v-show="focused">
            <div
                class="autocomplete-option"
                v-for="option in filteredOptions"
                @pointerdown="textFilter = option"
            >
                {{ option }}
            </div>
        </div>
    </div>
</template>

<style scoped>
.wrapper {
    background-color: #123;
}
.autocomplete-options {
    width: 100px;
    height: 100px;
    background-color: darkorchid;
}
.autocomplete-option {
    cursor: pointer;
    &:hover {
        background-color: #ddd;
    }
}
</style>
