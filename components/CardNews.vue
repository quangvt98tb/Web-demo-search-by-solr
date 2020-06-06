<template>
  <v-card shaped>
    <v-list-item three-line>
      <v-list-item-content>
        <div class="mb-4">
          <p v-html="date"></p>
        </div>

        <v-list-item-title class="mb-1">
          <h3 v-html="title"></h3>
        </v-list-item-title>
        <v-list-item-subtitle v-html="description"></v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-card-actions>
      <v-col>
        <!-- <div class="overline mb-4">{{ topic }}</div> -->
        <div class="mb-4">
          <p v-html="topic"></p>
        </div>
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