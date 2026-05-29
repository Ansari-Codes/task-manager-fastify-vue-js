<script setup>
const props = defineProps({
  columns: {
    type: Array,
    default: () => []
  },
  rows: {
    type: Array,
    default: () => []
  }
})
</script>

<template>
  <div class="table-base">
    <table>
      <thead>
        <tr>
          <th v-for="column in columns" :key="column.key">
            {{ column.label }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in rows" :key="index">
          <td v-for="column in columns" :key="column.key">
            {{ row[column.key] }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>@reference "tailwindcss";

.table-base {
  @apply w-full overflow-hidden border bg-white/5;
  border-radius: 0;
  border-color: rgba(255, 255, 255, 0.1);
}

.table-base table {
  @apply w-full text-left;
}

.table-base th,
.table-base td {
  @apply px-4 py-3;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.table-base th {
  @apply text-slate-300 text-sm font-semibold;
}

.table-base td {
  @apply text-slate-200 text-sm;
}
</style>
