<template>
  <v-dialog
    :model-value="props.modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
    :max-width="$vuetify.display.smAndUp ? '500' : '95%'"
    persistent
    class="ma-2"
  >
    <v-card>
      <v-card-title class="text-h6 pa-4 pb-2">
        {{ props.title }}
      </v-card-title>

      <v-card-text class="pa-4 pt-2">
        <p class="text-body-1 mb-0">
          {{ props.message }}
        </p>

        <!-- Optional slot for custom content -->
        <slot></slot>
      </v-card-text>

      <v-card-actions class="pa-4 pt-0">
        <v-spacer></v-spacer>

        <v-btn
          variant="outlined"
          @click="$emit('update:modelValue', false)"
          :disabled="props.loading"
          class="mr-2"
        >
          {{ props.cancelText }}
        </v-btn>

        <v-btn
          :color="props.confirmColor"
          :variant="props.confirmVariant"
          @click="handleConfirm"
          :loading="props.loading"
          :disabled="props.loading"
        >
          {{ props.confirmText }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
interface Props {
  modelValue: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  confirmColor?: string;
  confirmVariant?:
    | "flat"
    | "elevated"
    | "tonal"
    | "outlined"
    | "text"
    | "plain";
  loading?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  confirmText: "Bestätigen",
  cancelText: "Abbrechen",
  confirmColor: "primary",
  confirmVariant: "flat",
  loading: false,
});

const emit = defineEmits<{
  "update:modelValue": [value: boolean];
  confirm: [];
}>();

function handleConfirm() {
  emit("confirm");
}
</script>

<style scoped></style>
