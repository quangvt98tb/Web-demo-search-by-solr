<template>
  <v-layout>
    <v-flex>
      <v-row dense>
        <v-col cols="2">
          <h1>BKCV</h1>
        </v-col>
        <v-col cols="10">
          <v-col cols="10">
            <div @keyup.enter="search">
              <v-text-field solo-inverted flat hide-details label="Tìm kiếm" v-model="textSearch">
                <v-icon slot="prepend-inner" color="#b9b9b3">mdi-magnify</v-icon>
              </v-text-field>
            </div>
          </v-col>
          <v-row>
            <v-col cols="4">
              <div class="btn-lq">
                <v-btn flat hide-details @click="searchDetail">Tìm kiếm nâng cao</v-btn>
              </div>
            </v-col>
            <v-col cols="4"></v-col>
            <v-col cols="2">
              <div class="sohang">
                <v-toolbar>
                  <v-select
                    flat
                    hide-details
                    v-model="rows"
                    :items="[5,10,20,30,40,50]"
                    label="Rows"
                  ></v-select>
                </v-toolbar>
              </div>
            </v-col>
          </v-row>

          <br />
          <h3>Có {{ this.list.length }} kết quả tìm kiếm</h3>
        </v-col>
      </v-row>

      <v-row v-for="(item, key) in this.list" :key="key">
        <v-col cols="2"></v-col>
        <v-col cols="8">
          <CardNews
            :title="item.title_h"
            :topic="item.topic_h"
            :description="item.description_highlight"
            :date="item.publish_date"
            :views="item.clicked"
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
var _ = require("lodash");
export default {
  components: {
    CardNews,
    DetailNews
  },
  data() {
    return {
      rows: 5,
      word_similar: false,
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
    ...mapState("search", ["dataRes"])
  },
  methods: {
    ...mapActions("search", ["PostText", "addClick"]),

    async search() {
      const dataReq = {
        full_text: this.textSearch,
        rows: this.rows
      };
      await this.PostText(dataReq);
      for (let i = 0; i < this.dataRes.results.length; i++) {
        // highlight description
        if (!this.dataRes.hightlight[i].description) {
          if (!this.dataRes.hightlight[i].content) {
            this.dataRes.results[
              i
            ].description_highlight = this.dataRes.results[i].description;
          } else {
            this.dataRes.results[i].description_highlight =
              "..." + this.dataRes.hightlight[i].content[0];
          }
        } else {
          this.dataRes.results[
            i
          ].description_highlight = this.dataRes.hightlight[i].description[0];
        }
        // highlight topic
        if (!this.dataRes.hightlight[i].topic) {
          this.dataRes.results[i].topic_h = this.dataRes.results[i].topic;
        } else {
          this.dataRes.results[i].topic_h = this.dataRes.hightlight[i].topic[0];
        }

        // highlight title
        if (!this.dataRes.hightlight[i].title) {
          this.dataRes.results[i].title_h = this.dataRes.results[i].title;
        } else {
          this.dataRes.results[i].title_h = this.dataRes.hightlight[i].title[0];
        }
      }
      this.list = Object.assign({}, this.dataRes.results);
    },

    searchDetail() {
      setTimeout(() => {
        this.$router.push("/searchDetail");
      });
    },

    async read(item) {
      await this.addClick(item.id);

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
.v-btn:not(.v-btn--round).v-size--default {
  height: 48px;
  min-width: 64px;
  padding: 4px 16px;
}
.v-application .mb-4 {
  margin-bottom: 4px !important;
}
.btn-lq {
  padding-left: 10px;
}
.sohang {
  padding-right: 10px;
}
</style>