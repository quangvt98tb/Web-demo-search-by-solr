<template>
  <v-layout>
    <v-flex>
      <v-row>
        <v-col cols="7">
          <h1>BKCV</h1>
        </v-col>

        <v-col cols="3">
          <v-btn>
            <v-checkbox v-model="word_similar" class="mx-2" label="Từ đồng nghĩa"></v-checkbox>
          </v-btn>
        </v-col>
        <v-col cols="2">
          <div></div>
          <v-btn @click="searchFullText">Tìm kiếm Full Text</v-btn>
        </v-col>
      </v-row>

      <v-row>
        <v-toolbar>
          <v-col cols="8">
            <v-select
              :items="listTopic"
              flat
              hide-details
              outlined
              v-model="topic_s.text"
              label="Topic"
            >
              <v-icon slot="prepend-inner" color="#b9b9b3">mdi-magnify</v-icon>
            </v-select>
          </v-col>

          <v-col cols="4">
            <v-slider
              flat
              hide-details
              step="0.01"
              min="0"
              max="3"
              v-model="topic_s.slider"
              thumb-label="always"
              :thumb-size="24"
            ></v-slider>
          </v-col>
        </v-toolbar>
      </v-row>

      <v-row>
        <v-toolbar>
          <v-col cols="8">
            <v-text-field solo-inverted flat hide-details label="Title" v-model="title_s.text">
              <v-icon slot="prepend-inner" color="#b9b9b3">mdi-magnify</v-icon>
            </v-text-field>
          </v-col>

          <v-col cols="4">
            <v-slider
              flat
              hide-details
              step="0.01"
              min="0"
              max="3"
              v-model="title_s.slider"
              thumb-label="always"
              :thumb-size="24"
            ></v-slider>
          </v-col>
        </v-toolbar>
      </v-row>

      <v-row>
        <v-toolbar>
          <v-col cols="8">
            <v-text-field solo-inverted flat hide-details label="Author" v-model="author_s.text">
              <v-icon slot="prepend-inner" color="#b9b9b3">mdi-magnify</v-icon>
            </v-text-field>
          </v-col>

          <v-col cols="4">
            <v-slider
              flat
              hide-details
              step="0.01"
              min="0"
              max="3"
              v-model="author_s.slider"
              thumb-label="always"
              :thumb-size="24"
            ></v-slider>
          </v-col>
        </v-toolbar>
      </v-row>

      <v-row>
        <v-toolbar>
          <v-col cols="8">
            <v-text-field solo-inverted flat hide-details label="Content" v-model="content_s.text">
              <v-icon slot="prepend-inner" color="#b9b9b3">mdi-magnify</v-icon>
            </v-text-field>
          </v-col>

          <v-col cols="4">
            <v-slider
              flat
              hide-details
              step="0.01"
              min="0"
              max="3"
              v-model="content_s.slider"
              thumb-label="always"
              :thumb-size="24"
            ></v-slider>
          </v-col>
        </v-toolbar>
      </v-row>

      <v-row>
        <v-toolbar>
          <v-col cols="8">
            <v-text-field
              solo-inverted
              flat
              hide-details
              label="Description"
              v-model="description_s.text"
            >
              <v-icon slot="prepend-inner" color="#b9b9b3">mdi-magnify</v-icon>
            </v-text-field>
          </v-col>

          <v-col cols="4">
            <v-slider
              flat
              hide-details
              step="0.01"
              min="0"
              max="3"
              v-model="description_s.slider"
              thumb-label="always"
              :thumb-size="24"
            ></v-slider>
          </v-col>
        </v-toolbar>
      </v-row>

      <v-row>
        <v-toolbar>
          <v-col cols="8">
            <v-text-field solo-inverted flat hide-details label="Date" v-model="date_s.text">
              <v-icon slot="prepend-inner" color="#b9b9b3">mdi-magnify</v-icon>
            </v-text-field>
          </v-col>
          <v-col cols="4">
            <v-slider
              flat
              hide-details
              step="0.01"
              min="0"
              max="3"
              v-model="date_s.slider"
              thumb-label="always"
              :thumb-size="24"
            ></v-slider>
          </v-col>
        </v-toolbar>
      </v-row>

      <v-row>
        <v-toolbar>
          <div class="flex-grow-1"></div>
          <v-col cols="2">
            <v-select flat hide-details v-model="rows" :items="[5,10,20,30,40,50]" label="Rows"></v-select>
          </v-col>
          <v-btn color="primary" @click="searchDetail">Tìm kiếm</v-btn>
        </v-toolbar>
      </v-row>
      <br />
      <v-row>
        <h3>Có các kết quả tìm kiếm</h3>
      </v-row>
      <br />
      <v-row v-for="(item, key) in this.list" :key="key">
        <v-col cols="2"></v-col>
        <v-col cols="8">
          <CardNews
            :title="item.title_h"
            :topic="item.topic_h"
            :description="item.description_highlight"
            :date="item.date_h"
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
import { mapState, mapActions } from "vuex";
import CardNews from "@/components/CardNews";
import DetailNews from "@/components/DetailNews";
export default {
  components: {
    CardNews,
    DetailNews
  },
  data() {
    return {
      listTopic: [
        "Đời sống",
        "Du lịch",
        "Giải trí",
        "Giáo dục",
        "Khoa học",
        "Kinh doanh",
        "Pháp luật",
        "Số hóa",
        "Sức khỏe",
        "Thế giới",
        "Thể thao",
        "Thời sự",
        "Xe",
        "Ý kiến"
      ],
      rows: 10,
      word_similar: false,

      dialog: false,
      title: null,
      topic: null,
      description: null,
      publish_date: null,
      content: null,
      author: null,

      topic_s: {
        text: null,
        slider: 1.0
      },
      title_s: {
        text: null,
        slider: 1.0
      },
      author_s: {
        text: null,
        slider: 1.0
      },
      date_s: {
        text: null,
        slider: 1.0
      },
      description_s: {
        text: null,
        slider: 1.0
      },
      content_s: {
        text: null,
        slider: 1.0
      },

      list: []
    };
  },
  computed: {
    ...mapState("search", ["dataRes"])
  },
  methods: {
    ...mapActions("search", ["DetailSearch", "addClick"]),
    searchFullText() {
      setTimeout(() => {
        this.$router.push("/");
      });
    },

    async searchDetail() {
      const dataReq = {
        word_similar: this.word_similar,
        rows: this.rows,
        topic: this.topic_s.text,
        weight_topic: this.topic_s.slider,
        title: this.title_s.text,
        weight_title: this.title_s.slider,
        description: this.description_s.text,
        weight_description: this.description_s.slider,
        content: this.content_s.text,
        weight_content: this.content_s.slider,
        author: this.author_s.text,
        weight_author: this.author_s.slider,
        publish_date: this.date_s.text,
        weight_publish_date: this.date_s.slider
      };
      await this.DetailSearch(dataReq);

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
        // highlight date
        if (!this.dataRes.hightlight[i].publish_date) {
          this.dataRes.results[i].date_h = this.dataRes.results[i].publish_date;
        } else {
          this.dataRes.results[i].date_h = this.dataRes.hightlight[
            i
          ].publish_date[0];
        }
        // highlight title
        if (!this.dataRes.hightlight[i].title) {
          this.dataRes.results[i].title_h = this.dataRes.results[i].title;
        } else {
          this.dataRes.results[i].title_h = this.dataRes.hightlight[i].title[0];
        }
      }
      this.list = Object.assign({}, this.dataRes.results);
      //console.log(this.list);
    },

    async read(item) {
      await this.addClick(item.id);
      console.log(item);
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