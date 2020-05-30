<template>
  <v-card shaped>
    <v-list-item three-line>
      <v-list-item-content>
        <div class="overline mb-4">{{ date }}</div>

        <v-list-item-title class="headline mb-1">{{ title }}</v-list-item-title>
        <v-list-item-subtitle v-html="description"></v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-card-actions>
      <div class="overline mb-4">{{ topic }}</div>
      <div class="flex-grow-1"></div>
      <v-btn color="primary" @click="$emit('readMore')">Chi Tiết</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    topic: {
      type: String
    },
    title: {
      type: String
    },
    description: {
      type: String
    },
    date: {
      type: String
    }
  }
};
</script>