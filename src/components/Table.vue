<template>
  <div>
    <table role="table" class="table b-table table-striped table-hover">
      <thead role="rowgroup">
        <tr role="row">
          <th
            role="columnheader"
            scope="col"
            v-for="(field, index) in tableFields"
            :key="index"
          >
            {{ field }}
          </th>
        </tr>
      </thead>
      <tbody role="rowgroup">
        <router-link
          :to="{ name: 'currency', params: { id: item.id, currency: item } }"
          v-for="(item, index) in items"
          :key="index"
          tag="tr"
          style="cursor: pointer"
        >
          <td role="cell">{{ item.name }}</td>
          <td role="cell">{{ item.symbol }}</td>
          <td role="cell">
            {{ item.current_price | formatNumber }} {{ currencyBased }}
          </td>
          <td role="cell">
            {{ item.total_volume | formatNumber }} {{ currencyBased }}
          </td>
          <td role="cell">
            {{ item.market_cap | formatNumber }} {{ currencyBased }}
          </td>
        </router-link>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    tableFields: {
      type: Array,
      required: false,
    },
    items: {
      type: Array,
      required: true,
    },
    currencyBased: {
      type: String,
      required: false,
    },
  },
};
</script>

<style>
.table {
  margin: 30px 0;
}
.table thead th {
  font-weight: 600;
}
</style>