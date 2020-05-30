<template>
  <v-layout>
    <v-flex>
      <v-row>
        <v-col cols="2">
          <h1>BKCV</h1>
        </v-col>
        <v-col cols="8">
          <div @keyup.enter="search">
            <v-text-field solo-inverted flat hide-details label="Tìm kiếm" v-model="textSearch">
              <v-icon slot="prepend-inner" color="#b9b9b3">mdi-magnify</v-icon>
            </v-text-field>
          </div>
          <br />
          <h3>Có xxx kết quả tìm kiếm</h3>
        </v-col>
      </v-row>
      <v-row v-for="(item, key) in this.list" :key="key">
        <v-col cols="2"></v-col>
        <v-col cols="8">
          <CardNews
            :title="item.title"
            :topic="item.topic"
            :description="item.description"
            :date="item.publish_date"
            @readMore="read(item)"
          ></CardNews>
        </v-col>
      </v-row>
      <v-dialog
        v-model="dialog"
        scrollable
        max-width="900px"
        persistent
        @click:outside="closeDialog"
        nested
      >
        <DetailNews
          v-if="dialog"
          :title="title"
          :topic="topic"
          :description="description"
          :date="publish_date"
          :content="content"
          :author="author"
        />
      </v-dialog>
    </v-flex>
  </v-layout>
</template>

<script>
import CardNews from "@/components/CardNews";
import DetailNews from "@/components/DetailNews";
import { mapState, mapActions } from "vuex";
export default {
  components: {
    CardNews,
    DetailNews
  },
  data() {
    return {
      dialog: false,
      title: null,
      topic: null,
      description: null,
      publish_date: null,
      content: null,
      author: null,
      textSearch: null,
      //
      list: []
    };
  },
  computed: {
    ...mapState("index", ["dataRes"])
  },
  methods: {
    ...mapActions("index", ["PostText"]),

    async search() {
      const dataReq = {
        text: this.textSearch
      };
      await this.PostText(dataReq);
      this.list = this.dataRes;
    },

    read(item) {
      this.dialog = true;
      this.title = item.title;
      this.description = item.description;
      this.publish_date = item.publish_date;
      this.topic = item.topic;
      this.content = item.content;
      this.author = item.author;
    },
    closeDialog() {
      this.dialog = false;
      this.title = null;
      this.description = null;
      this.publish_date = null;
      this.topic = null;
      this.content = null;
      this.author = null;
    }
  }
};
</script>

<style>
</style>