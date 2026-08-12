<script setup>
const props = defineProps({
    level: {
        type: String,
        default: null,
        validator(value, _props) {
            return ["info", "success", "warning", "danger"].includes(value);
        },
    },
    message: {
        type: String,
        required: true,
    },
});

const emit = defineEmits(["close"]);

function level2bootstrap() {
    if (!props.level) {
        return "";
    }

    return `text-bg-${props.level}`;
}
</script>

<template>
    <div
        class="toast-container p-3 top-0 start-50 translate-middle-x"
        id="toastNotification"
    >
        <div class="toast fade show" :class="level2bootstrap()">
            <div class="d-flex">
                <div class="toast-body">
                    {{ message }}
                </div>
                <button
                    type="button"
                    class="btn-close btn-close-white me-2 m-auto"
                    aria-label="Close"
                    @click="$emit('close')"
                ></button>
            </div>
        </div>
    </div>
</template>
