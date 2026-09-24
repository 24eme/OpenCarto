<script setup>
const props = defineProps({
  mainLink: {
    type: Object,
    required: false,
  },
  mainTitle: {
    type: String,
    required: false,
  },
  mainIcons: {
    type: Object,
    required: true,
  },
  minis: {
    type: Array
  }
})

</script>

<template>
<div class="fabs" role="group" aria-label="Floating action buttons">
    <RouterLink
        :to="mainLink"
        class="fab"
        :title="mainTitle"
        :aria-label="mainTitle"
    >
        <i class="d-flex bi lh-1" :class="[mainIcons.main]">
            <i v-if="mainIcons.stack" class="bi stack stack-be" :class="[mainIcons.stack]"></i>
        </i>
    </RouterLink>
</div>
</template>

<style scoped>
.fabs {
    --_viewport-margin: 3vmin;

    position: fixed;
    z-index: 1000;

    inset-block: auto var(--_viewport-margin);
    inset-inline: auto var(--_viewport-margin);

    display: flex;
    flex-direction: column-reverse;
    place-items: center;
    gap: var(--_viewport-margin);
}

.fab.mini {
    --_size: 1.2rem;
}

.fab {
    --_size: 2rem;

    padding: calc(var(--_size) / 2);
    border-radius: var(--bs-border-radius-lg);
    aspect-ratio: 1;

    box-shadow:
        rgba(0, 0, 0, 0.15) 0px 15px 25px,
        rgba(0, 0, 0, 0.5) 0px 5px 10px;

    background: var(--bs-primary);
    color: var(--bs-light);
    text-align: center;

    &:active {
        @media (prefers-reduced-motion: no-preference) {
            transform: translateY(5%);
        }
    }

    & > i {
        font-size: calc(var(--_size) / 1.2);
    }

    & .bi {
        &.stack {
            position: absolute;
            text-shadow:
                -2px -2px 0 var(--bs-primary),
                2px -2px 0 var(--bs-primary),
                -2px 2px 0 var(--bs-primary),
                2px 2px 0 var(--bs-primary);
        }

        &.stack-be {
            /* bottom-end */
            bottom: 0.5rem;
            right: 0.5rem;
        }
    }
}
</style
