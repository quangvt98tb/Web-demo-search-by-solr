<template>
  <div>
    <v-card>
      <v-row>
        <v-col cols="2">
          <center>
            <h2>
              <strong>{{ topic }}</strong>
            </h2>
          </center>
        </v-col>
        <v-col cols="9">
          <v-row>
            <div class="overline mb-4">{{ date }}</div>
            <div class="flex-grow-1"></div>
            <p>
              <strong>{{ author }}</strong>
            </p>
          </v-row>

          <v-card-title>
            <span class="headline">{{ title }}</span>
          </v-card-title>
          <v-card-text v-html="description"></v-card-text>
          <v-card-text v-html="content"></v-card-text>
        </v-col>
      </v-row>
    </v-card>
  </div>
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
    content: {
      type: String
    },
    author: {
      type: String
    }
  }
};
</script>