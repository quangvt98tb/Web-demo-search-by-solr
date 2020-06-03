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
      <v-col>
        <div class="overline mb-4">{{ topic }}</div>
        <div class="overline mb-4">Luợt xem {{ views }}</div>
      </v-col>
      <div class="flex-grow-1"></div>
      <v-btn color="primary" @click="readPaper">Chi Tiết</v-btn>
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
    },
    views: {
      type: Number,
      default: 0
    }
  },
  methods: {
    readPaper() {
      this.$emit("readMore");
    }
  }
};
</script>