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
          <v-btn @click="searchFullText">Tìm kiếm Full Text</v-btn>
        </v-col>
      </v-row>

      <v-row>
        <v-toolbar>
          <v-col cols="6">
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
          <v-col cols="2">
            <v-select :items="items" flat hide-details outlined v-model="topic_s.link"></v-select>
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
          <v-col cols="6">
            <v-text-field solo-inverted flat hide-details label="Title" v-model="title_s.text">
              <v-icon slot="prepend-inner" color="#b9b9b3">mdi-magnify</v-icon>
            </v-text-field>
          </v-col>
          <v-col cols="2">
            <v-select :items="items" flat hide-details outlined v-model="title_s.link"></v-select>
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
          <v-col cols="6">
            <v-text-field solo-inverted flat hide-details label="Author" v-model="author_s.text">
              <v-icon slot="prepend-inner" color="#b9b9b3">mdi-magnify</v-icon>
            </v-text-field>
          </v-col>
          <v-col cols="2">
            <v-select :items="items" flat hide-details outlined v-model="author_s.link"></v-select>
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
          <v-col cols="6">
            <v-text-field solo-inverted flat hide-details label="Date" v-model="content_s.text">
              <v-icon slot="prepend-inner" color="#b9b9b3">mdi-magnify</v-icon>
            </v-text-field>
          </v-col>
          <v-col cols="2">
            <v-select :items="items" flat hide-details outlined v-model="content_s.link"></v-select>
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
          <v-col cols="6">
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
          <v-col cols="2">
            <v-select :items="items" flat hide-details outlined v-model="description_s.link"></v-select>
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
        <h3>Có {{ list.length }} các kết quả tìm kiếm</h3>
      </v-row>
      <br />
      <v-row v-for="(item, key) in this.list" :key="key">
        <v-col cols="2"></v-col>
        <v-col cols="8">
          <CardNews
            :title="item.title"
            :topic="item.topic"
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
        "đời_sống",
        "du_lịch",
        "giải_trí",
        "Giáo_dục",
        "Khoa_học",
        "Kinh_doanh",
        "Pháp_luật",
        "Số_hóa",
        "Sức_khỏe",
        "Thế_giới",
        "Thể_thao",
        "Thời_sự",
        "Xe",
        "Ý_kiến"
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
      items: ["AND", "OR"],

      topic_s: {
        text: null,
        link: "AND",
        slider: 1.0
      },
      title_s: {
        text: null,
        link: "AND",
        slider: 1.0
      },
      author_s: {
        text: null,
        link: "AND",
        slider: 1.0
      },
      date_s: {
        text: null,

        slider: 1.0
      },
      description_s: {
        text: null,
        link: "AND",
        slider: 1.0
      },
      content_s: {
        text: null,
        link: "AND",
        slider: 1.0
      },

      list: [
        {
          content:
            '\u0110\u1ea3o qu\u1ed1c n\u00e0y \u0111ang l\u00ean k\u1ebf ho\u1ea1ch th\u1ef1c hi\u1ec7n x\u00e9t nghi\u1ec7m Covid-19 mi\u1ec5n ph\u00ed t\u1ea1i s\u00e2n bay - nh\u1eefng ai c\u00f3 k\u1ebft qu\u1ea3 \u00e2m t\u00ednh s\u1ebd \u0111\u01b0\u1ee3c t\u1ef1 do t\u1eadn h\u01b0\u1edfng k\u1ef3 ngh\u1ec9, trong khi nh\u1eefng ng\u01b0\u1eddi d\u01b0\u01a1ng t\u00ednh v\u1edbi nCoV ph\u1ea3i t\u1ef1 c\u00e1ch ly trong 14 ng\u00e0y. \n\nTh\u1ee7 t\u01b0\u1edbng Iceland\u00a0Katrin Jakobsdottir th\u00f4ng b\u00e1o c\u00e1c l\u1ec7nh h\u1ea1n ch\u1ebf \u0111i l\u1ea1i \u0111\u01b0\u1ee3c n\u1edbi l\u1ecfng "ch\u1eadm nh\u1ea5t v\u00e0o 15/6, trong khi \u0111\u00f3\u00a0t\u1eeb 15/5 nh\u1eefng chuy\u00ean gia nh\u01b0 nh\u00e0 khoa h\u1ecdc, nh\u00e0 l\u00e0m phim, v\u1eadn \u0111\u1ed9ng vi\u00ean \u0111\u1ebfn Icealand s\u1ebd \u0111\u01b0\u1ee3c s\u1eafp x\u1ebfp c\u00e1ch ly theo c\u00e1ch th\u00edch h\u1ee3p. \n\n"\u0110\u1ebfn nay, th\u1eadt quan tr\u1ecdng khi ch\u00fang t\u00f4i\u00a0c\u00f3 t\u1ea7m nh\u00ecn d\u00e0i h\u1ea1n. T\u00f4i tin r\u1eb1ng n\u1ebfu m\u1ecdi th\u1ee9 \u1ed5n th\u1ecfa, ch\u00fang t\u00f4i s\u1ebd \u0111\u00f3n m\u1ed9t s\u1ed1 kh\u00e1ch du l\u1ecbch \u0111\u1ebfn \u0111\u00e2y m\u00f9a h\u00e8 n\u00e0y. V\u1edbi nh\u1eefng ai th\u1ef1c s\u1ef1 mu\u1ed1n t\u1edbi Iceland, \u0111\u00e2y\u00a0l\u00e0 kh\u1ea3 n\u0103ng ho\u00e0n to\u00e0n c\u00f3 th\u1ec3 x\u1ea3y ra", Bjarnheiour Hallsdottir, Ch\u1ee7 t\u1ecbch Hi\u1ec7p h\u1ed9i C\u00f4ng nghi\u1ec7p Du l\u1ecbch Iceland, n\u00f3i. \n\nHi\u1ec7n t\u1ea1i ch\u1ec9 kh\u00e1ch du l\u1ecbch c\u00f3 h\u1ed9 chi\u1ebfu Schengen m\u1edbi \u0111\u01b0\u1ee3c ph\u00e9p nh\u1eadp c\u1ea3nh Iceland, v\u1edbi \u0111i\u1ec1u ki\u1ec7n c\u00e1ch ly 14 ng\u00e0y b\u1eaft bu\u1ed9c ngay khi \u0111\u1ebfn. Nh\u1eefng l\u1ec7nh h\u1ea1n ch\u1ebf \u0111i l\u1ea1i hi\u1ec7n t\u1ea1i c\u00f3 hi\u1ec7u l\u1ef1c t\u1eeb 15/3, v\u00e0 \u0111\u1ed9ng l\u1ef1c \u0111\u1ec3 gi\u1edbi c\u1ea7m quy\u1ec1n n\u1edbi l\u1ecfng c\u00e1c quy \u0111\u1ecbnh n\u00e0y l\u00e0 nh\u1eb1m t\u00e1i kh\u1edfi \u0111\u1ed9ng ng\u00e0nh du l\u1ecbch, t\u1eeb \u0111\u00f3 th\u00fac \u0111\u1ea9y n\u1ec1n kinh t\u1ebf. \n\nH\u00e3ng h\u00e0ng kh\u00f4ng qu\u1ed1c gia\u00a0Icelandair \u0111ang ch\u1eadt v\u1eadt \u0111\u1ed1i ph\u00f3 v\u1edbi \u0111\u1ea1i d\u1ecbch, khi gi\u1ea3m t\u1ea7n su\u1ea5t bay, 3.000 nh\u00e2n vi\u00ean \u0111\u00e3 b\u1ecb sa th\u1ea3i. "C\u00f3 r\u1ea5t nhi\u1ec1u th\u00e1ch th\u1ee9c m\u00e0 Icelandair ph\u1ea3i \u0111\u1ed1i m\u1eb7t khi ti\u1ebfp t\u1ee5c ho\u1ea1t \u0111\u1ed9ng. T\u00ecnh h\u00ecnh th\u1ef1c s\u1ef1 \u0111\u1eb7t ra c\u00e2u h\u1ecfi s\u1ed1ng c\u00f2n v\u1edbi ng\u00e0nh du l\u1ecbch Iceland. Hy v\u1ecdng m\u1ecdi ng\u01b0\u1eddi c\u00f3 th\u1ec3 nh\u1eadn ra r\u1eb1ng quy\u1ebft \u0111\u1ecbnh hi\u1ec7n nay kh\u00f4ng ch\u1ec9 v\u00ec Icelandair, m\u00e0 c\u00f2n\u00a0c\u1ea3 ng\u00e0nh du l\u1ecbch Iceland, c\u1ea3 n\u1ec1n kinh t\u1ebf v\u00e0 to\u00e0n x\u00e3 h\u1ed9i c\u1ee7a ch\u00fang ta", \u00f4ng\u00a0Hallsdottir b\u00e0y t\u1ecf. \n\nIceland, \u0111\u1ea3o qu\u1ed1c c\u00f3 kho\u1ea3ng 364.000 d\u00e2n, ghi nh\u1eadn 1.802 ca nhi\u1ec5m b\u1ec7nh, v\u00e0 10 ng\u01b0\u1eddi t\u1eed vong v\u00ec nCoV. Kho\u1ea3ng 38% ng\u01b0\u1eddi d\u00e2n n\u01b0\u1edbc n\u00e0y \u0111\u00e3 t\u1ea3i nh\u1eefng \u1ee9ng d\u1ee5ng theo d\u00f5i Covid-19 - t\u1ef7 l\u1ec7 t\u1ed1t nh\u1ea5t th\u1ebf gi\u1edbi trong c\u00e1c \u1ee9ng d\u1ee5ng theo d\u00f5i d\u1ecbch b\u1ec7nh hi\u1ec7n nay. B\u1ea5t k\u1ef3 du kh\u00e1ch n\u00e0o \u0111\u1ebfn \u0111\u00e2y v\u00e0o m\u00f9a h\u00e8 n\u00e0y s\u1ebd ch\u1eafc ch\u1eafn \u0111\u01b0\u1ee3c y\u00eau c\u1ea7u l\u00e0m \u0111i\u1ec1u t\u01b0\u01a1ng t\u1ef1. \n\n"Khi du kh\u00e1ch tr\u1edf l\u1ea1i Iceland, ch\u00fang t\u00f4i mu\u1ed1n th\u1ef1c hi\u1ec7n m\u1ecdi\u00a0c\u01a1 ch\u1ebf \u0111\u1ec3 b\u1ea3o v\u1ec7 h\u1ecd v\u00e0 \u0111\u1ea1t nh\u1eefng b\u01b0\u1edbc ti\u1ebfn m\u1edbi\u00a0trong ki\u1ec3m so\u00e1t \u0111\u1ea1i d\u1ecbch", Thordis Kolbrun Reykfjord Gylfadottir, B\u1ed9 tr\u01b0\u1edfng B\u1ed9 Du l\u1ecbch, C\u00f4ng nghi\u1ec7p v\u00e0 \u0110\u1ed5i m\u1edbi, cho hay. \n\nTheo \u00f4ng, chi\u1ebfn d\u1ecbch c\u1ee7a Iceland l\u00e0 x\u00e9t nghi\u1ec7m tr\u00ean di\u1ec7n r\u1ed9ng, theo d\u00f5i v\u00e0 c\u00e1ch ly, ph\u01b0\u01a1ng ph\u00e1p n\u00e0y \u0111\u00e3 ch\u1ee9ng minh hi\u1ec7u qu\u1ea3.\u00a0"Ch\u00fang t\u00f4i mu\u1ed1n x\u00e2y d\u1ef1ng m\u1ed9t tr\u1ea3i nghi\u1ec7m v\u1ec1 m\u1ed9t n\u01a1i an to\u00e0n cho nh\u1eefng ai mu\u1ed1n thay \u0111\u1ed5i kh\u00f4ng kh\u00ed sau\u00a0m\u00f9a xu\u00e2n ng\u1ed9t ng\u1ea1t v\u1edbi t\u1ea5t c\u1ea3 ch\u00fang ta". \n\nAn An (Theo Insider ) \n\nXem th\u00eam \n\nVi\u1ec7t Nam sau gi\u00e3n c\u00e1ch trong m\u1eaft du kh\u00e1ch T\u00e2y \n\nD\u00f9ng nh\u00e0 v\u1ec7 sinh tr\u00ean m\u00e1y bay ph\u1ea3i xin ph\u00e9p \n\nTh\u00e1i Lan c\u1ea5m c\u00e1c chuy\u1ebfn bay qu\u1ed1c t\u1ebf \u0111\u1ebfn h\u1ebft th\u00e1ng 6',
          author: "An An",
          title:
            "Iceland s\u1edbm \u0111\u00f3n du kh\u00e1ch qu\u1ed1c t\u1ebf tr\u1edf l\u1ea1i",
          publish_date: "Th\u1ee9 hai, 18/5/2020, 13:06 (GMT+7)",
          description:
            "Th\u1ee7 t\u01b0\u1edbng Iceland tuy\u00ean b\u1ed1 k\u1ebf ho\u1ea1ch m\u1edf c\u1eeda bi\u00ean gi\u1edbi tr\u1edf l\u1ea1i v\u1edbi kh\u00e1ch qu\u1ed1c t\u1ebf t\u1eeb 15/6 v\u00e0 mi\u1ec5n ph\u00ed x\u00e9t nghi\u1ec7m nCoV.",
          topic: "Du l\u1ecbch"
        },
        {
          content:
            '\u0110\u1ea3o qu\u1ed1c n\u00e0y \u0111ang l\u00ean k\u1ebf ho\u1ea1ch th\u1ef1c hi\u1ec7n x\u00e9t nghi\u1ec7m Covid-19 mi\u1ec5n ph\u00ed t\u1ea1i s\u00e2n bay - nh\u1eefng ai c\u00f3 k\u1ebft qu\u1ea3 \u00e2m t\u00ednh s\u1ebd \u0111\u01b0\u1ee3c t\u1ef1 do t\u1eadn h\u01b0\u1edfng k\u1ef3 ngh\u1ec9, trong khi nh\u1eefng ng\u01b0\u1eddi d\u01b0\u01a1ng t\u00ednh v\u1edbi nCoV ph\u1ea3i t\u1ef1 c\u00e1ch ly trong 14 ng\u00e0y. \n\nTh\u1ee7 t\u01b0\u1edbng Iceland\u00a0Katrin Jakobsdottir th\u00f4ng b\u00e1o c\u00e1c l\u1ec7nh h\u1ea1n ch\u1ebf \u0111i l\u1ea1i \u0111\u01b0\u1ee3c n\u1edbi l\u1ecfng "ch\u1eadm nh\u1ea5t v\u00e0o 15/6, trong khi \u0111\u00f3\u00a0t\u1eeb 15/5 nh\u1eefng chuy\u00ean gia nh\u01b0 nh\u00e0 khoa h\u1ecdc, nh\u00e0 l\u00e0m phim, v\u1eadn \u0111\u1ed9ng vi\u00ean \u0111\u1ebfn Icealand s\u1ebd \u0111\u01b0\u1ee3c s\u1eafp x\u1ebfp c\u00e1ch ly theo c\u00e1ch th\u00edch h\u1ee3p. \n\n"\u0110\u1ebfn nay, th\u1eadt quan tr\u1ecdng khi ch\u00fang t\u00f4i\u00a0c\u00f3 t\u1ea7m nh\u00ecn d\u00e0i h\u1ea1n. T\u00f4i tin r\u1eb1ng n\u1ebfu m\u1ecdi th\u1ee9 \u1ed5n th\u1ecfa, ch\u00fang t\u00f4i s\u1ebd \u0111\u00f3n m\u1ed9t s\u1ed1 kh\u00e1ch du l\u1ecbch \u0111\u1ebfn \u0111\u00e2y m\u00f9a h\u00e8 n\u00e0y. V\u1edbi nh\u1eefng ai th\u1ef1c s\u1ef1 mu\u1ed1n t\u1edbi Iceland, \u0111\u00e2y\u00a0l\u00e0 kh\u1ea3 n\u0103ng ho\u00e0n to\u00e0n c\u00f3 th\u1ec3 x\u1ea3y ra", Bjarnheiour Hallsdottir, Ch\u1ee7 t\u1ecbch Hi\u1ec7p h\u1ed9i C\u00f4ng nghi\u1ec7p Du l\u1ecbch Iceland, n\u00f3i. \n\nHi\u1ec7n t\u1ea1i ch\u1ec9 kh\u00e1ch du l\u1ecbch c\u00f3 h\u1ed9 chi\u1ebfu Schengen m\u1edbi \u0111\u01b0\u1ee3c ph\u00e9p nh\u1eadp c\u1ea3nh Iceland, v\u1edbi \u0111i\u1ec1u ki\u1ec7n c\u00e1ch ly 14 ng\u00e0y b\u1eaft bu\u1ed9c ngay khi \u0111\u1ebfn. Nh\u1eefng l\u1ec7nh h\u1ea1n ch\u1ebf \u0111i l\u1ea1i hi\u1ec7n t\u1ea1i c\u00f3 hi\u1ec7u l\u1ef1c t\u1eeb 15/3, v\u00e0 \u0111\u1ed9ng l\u1ef1c \u0111\u1ec3 gi\u1edbi c\u1ea7m quy\u1ec1n n\u1edbi l\u1ecfng c\u00e1c quy \u0111\u1ecbnh n\u00e0y l\u00e0 nh\u1eb1m t\u00e1i kh\u1edfi \u0111\u1ed9ng ng\u00e0nh du l\u1ecbch, t\u1eeb \u0111\u00f3 th\u00fac \u0111\u1ea9y n\u1ec1n kinh t\u1ebf. \n\nH\u00e3ng h\u00e0ng kh\u00f4ng qu\u1ed1c gia\u00a0Icelandair \u0111ang ch\u1eadt v\u1eadt \u0111\u1ed1i ph\u00f3 v\u1edbi \u0111\u1ea1i d\u1ecbch, khi gi\u1ea3m t\u1ea7n su\u1ea5t bay, 3.000 nh\u00e2n vi\u00ean \u0111\u00e3 b\u1ecb sa th\u1ea3i. "C\u00f3 r\u1ea5t nhi\u1ec1u th\u00e1ch th\u1ee9c m\u00e0 Icelandair ph\u1ea3i \u0111\u1ed1i m\u1eb7t khi ti\u1ebfp t\u1ee5c ho\u1ea1t \u0111\u1ed9ng. T\u00ecnh h\u00ecnh th\u1ef1c s\u1ef1 \u0111\u1eb7t ra c\u00e2u h\u1ecfi s\u1ed1ng c\u00f2n v\u1edbi ng\u00e0nh du l\u1ecbch Iceland. Hy v\u1ecdng m\u1ecdi ng\u01b0\u1eddi c\u00f3 th\u1ec3 nh\u1eadn ra r\u1eb1ng quy\u1ebft \u0111\u1ecbnh hi\u1ec7n nay kh\u00f4ng ch\u1ec9 v\u00ec Icelandair, m\u00e0 c\u00f2n\u00a0c\u1ea3 ng\u00e0nh du l\u1ecbch Iceland, c\u1ea3 n\u1ec1n kinh t\u1ebf v\u00e0 to\u00e0n x\u00e3 h\u1ed9i c\u1ee7a ch\u00fang ta", \u00f4ng\u00a0Hallsdottir b\u00e0y t\u1ecf. \n\nIceland, \u0111\u1ea3o qu\u1ed1c c\u00f3 kho\u1ea3ng 364.000 d\u00e2n, ghi nh\u1eadn 1.802 ca nhi\u1ec5m b\u1ec7nh, v\u00e0 10 ng\u01b0\u1eddi t\u1eed vong v\u00ec nCoV. Kho\u1ea3ng 38% ng\u01b0\u1eddi d\u00e2n n\u01b0\u1edbc n\u00e0y \u0111\u00e3 t\u1ea3i nh\u1eefng \u1ee9ng d\u1ee5ng theo d\u00f5i Covid-19 - t\u1ef7 l\u1ec7 t\u1ed1t nh\u1ea5t th\u1ebf gi\u1edbi trong c\u00e1c \u1ee9ng d\u1ee5ng theo d\u00f5i d\u1ecbch b\u1ec7nh hi\u1ec7n nay. B\u1ea5t k\u1ef3 du kh\u00e1ch n\u00e0o \u0111\u1ebfn \u0111\u00e2y v\u00e0o m\u00f9a h\u00e8 n\u00e0y s\u1ebd ch\u1eafc ch\u1eafn \u0111\u01b0\u1ee3c y\u00eau c\u1ea7u l\u00e0m \u0111i\u1ec1u t\u01b0\u01a1ng t\u1ef1. \n\n"Khi du kh\u00e1ch tr\u1edf l\u1ea1i Iceland, ch\u00fang t\u00f4i mu\u1ed1n th\u1ef1c hi\u1ec7n m\u1ecdi\u00a0c\u01a1 ch\u1ebf \u0111\u1ec3 b\u1ea3o v\u1ec7 h\u1ecd v\u00e0 \u0111\u1ea1t nh\u1eefng b\u01b0\u1edbc ti\u1ebfn m\u1edbi\u00a0trong ki\u1ec3m so\u00e1t \u0111\u1ea1i d\u1ecbch", Thordis Kolbrun Reykfjord Gylfadottir, B\u1ed9 tr\u01b0\u1edfng B\u1ed9 Du l\u1ecbch, C\u00f4ng nghi\u1ec7p v\u00e0 \u0110\u1ed5i m\u1edbi, cho hay. \n\nTheo \u00f4ng, chi\u1ebfn d\u1ecbch c\u1ee7a Iceland l\u00e0 x\u00e9t nghi\u1ec7m tr\u00ean di\u1ec7n r\u1ed9ng, theo d\u00f5i v\u00e0 c\u00e1ch ly, ph\u01b0\u01a1ng ph\u00e1p n\u00e0y \u0111\u00e3 ch\u1ee9ng minh hi\u1ec7u qu\u1ea3.\u00a0"Ch\u00fang t\u00f4i mu\u1ed1n x\u00e2y d\u1ef1ng m\u1ed9t tr\u1ea3i nghi\u1ec7m v\u1ec1 m\u1ed9t n\u01a1i an to\u00e0n cho nh\u1eefng ai mu\u1ed1n thay \u0111\u1ed5i kh\u00f4ng kh\u00ed sau\u00a0m\u00f9a xu\u00e2n ng\u1ed9t ng\u1ea1t v\u1edbi t\u1ea5t c\u1ea3 ch\u00fang ta". \n\nAn An (Theo Insider ) \n\nXem th\u00eam \n\nVi\u1ec7t Nam sau gi\u00e3n c\u00e1ch trong m\u1eaft du kh\u00e1ch T\u00e2y \n\nD\u00f9ng nh\u00e0 v\u1ec7 sinh tr\u00ean m\u00e1y bay ph\u1ea3i xin ph\u00e9p \n\nTh\u00e1i Lan c\u1ea5m c\u00e1c chuy\u1ebfn bay qu\u1ed1c t\u1ebf \u0111\u1ebfn h\u1ebft th\u00e1ng 6',
          author: "An An",
          title:
            "Iceland s\u1edbm \u0111\u00f3n du kh\u00e1ch qu\u1ed1c t\u1ebf tr\u1edf l\u1ea1i",
          publish_date: "Th\u1ee9 hai, 18/5/2020, 13:06 (GMT+7)",
          description:
            "Th\u1ee7 t\u01b0\u1edbng Iceland tuy\u00ean b\u1ed1 k\u1ebf ho\u1ea1ch m\u1edf c\u1eeda bi\u00ean gi\u1edbi tr\u1edf l\u1ea1i v\u1edbi kh\u00e1ch qu\u1ed1c t\u1ebf t\u1eeb 15/6 v\u00e0 mi\u1ec5n ph\u00ed x\u00e9t nghi\u1ec7m nCoV.",
          topic: "Du l\u1ecbch"
        },
        {
          content:
            '\u0110\u1ea3o qu\u1ed1c n\u00e0y \u0111ang l\u00ean k\u1ebf ho\u1ea1ch th\u1ef1c hi\u1ec7n x\u00e9t nghi\u1ec7m Covid-19 mi\u1ec5n ph\u00ed t\u1ea1i s\u00e2n bay - nh\u1eefng ai c\u00f3 k\u1ebft qu\u1ea3 \u00e2m t\u00ednh s\u1ebd \u0111\u01b0\u1ee3c t\u1ef1 do t\u1eadn h\u01b0\u1edfng k\u1ef3 ngh\u1ec9, trong khi nh\u1eefng ng\u01b0\u1eddi d\u01b0\u01a1ng t\u00ednh v\u1edbi nCoV ph\u1ea3i t\u1ef1 c\u00e1ch ly trong 14 ng\u00e0y. \n\nTh\u1ee7 t\u01b0\u1edbng Iceland\u00a0Katrin Jakobsdottir th\u00f4ng b\u00e1o c\u00e1c l\u1ec7nh h\u1ea1n ch\u1ebf \u0111i l\u1ea1i \u0111\u01b0\u1ee3c n\u1edbi l\u1ecfng "ch\u1eadm nh\u1ea5t v\u00e0o 15/6, trong khi \u0111\u00f3\u00a0t\u1eeb 15/5 nh\u1eefng chuy\u00ean gia nh\u01b0 nh\u00e0 khoa h\u1ecdc, nh\u00e0 l\u00e0m phim, v\u1eadn \u0111\u1ed9ng vi\u00ean \u0111\u1ebfn Icealand s\u1ebd \u0111\u01b0\u1ee3c s\u1eafp x\u1ebfp c\u00e1ch ly theo c\u00e1ch th\u00edch h\u1ee3p. \n\n"\u0110\u1ebfn nay, th\u1eadt quan tr\u1ecdng khi ch\u00fang t\u00f4i\u00a0c\u00f3 t\u1ea7m nh\u00ecn d\u00e0i h\u1ea1n. T\u00f4i tin r\u1eb1ng n\u1ebfu m\u1ecdi th\u1ee9 \u1ed5n th\u1ecfa, ch\u00fang t\u00f4i s\u1ebd \u0111\u00f3n m\u1ed9t s\u1ed1 kh\u00e1ch du l\u1ecbch \u0111\u1ebfn \u0111\u00e2y m\u00f9a h\u00e8 n\u00e0y. V\u1edbi nh\u1eefng ai th\u1ef1c s\u1ef1 mu\u1ed1n t\u1edbi Iceland, \u0111\u00e2y\u00a0l\u00e0 kh\u1ea3 n\u0103ng ho\u00e0n to\u00e0n c\u00f3 th\u1ec3 x\u1ea3y ra", Bjarnheiour Hallsdottir, Ch\u1ee7 t\u1ecbch Hi\u1ec7p h\u1ed9i C\u00f4ng nghi\u1ec7p Du l\u1ecbch Iceland, n\u00f3i. \n\nHi\u1ec7n t\u1ea1i ch\u1ec9 kh\u00e1ch du l\u1ecbch c\u00f3 h\u1ed9 chi\u1ebfu Schengen m\u1edbi \u0111\u01b0\u1ee3c ph\u00e9p nh\u1eadp c\u1ea3nh Iceland, v\u1edbi \u0111i\u1ec1u ki\u1ec7n c\u00e1ch ly 14 ng\u00e0y b\u1eaft bu\u1ed9c ngay khi \u0111\u1ebfn. Nh\u1eefng l\u1ec7nh h\u1ea1n ch\u1ebf \u0111i l\u1ea1i hi\u1ec7n t\u1ea1i c\u00f3 hi\u1ec7u l\u1ef1c t\u1eeb 15/3, v\u00e0 \u0111\u1ed9ng l\u1ef1c \u0111\u1ec3 gi\u1edbi c\u1ea7m quy\u1ec1n n\u1edbi l\u1ecfng c\u00e1c quy \u0111\u1ecbnh n\u00e0y l\u00e0 nh\u1eb1m t\u00e1i kh\u1edfi \u0111\u1ed9ng ng\u00e0nh du l\u1ecbch, t\u1eeb \u0111\u00f3 th\u00fac \u0111\u1ea9y n\u1ec1n kinh t\u1ebf. \n\nH\u00e3ng h\u00e0ng kh\u00f4ng qu\u1ed1c gia\u00a0Icelandair \u0111ang ch\u1eadt v\u1eadt \u0111\u1ed1i ph\u00f3 v\u1edbi \u0111\u1ea1i d\u1ecbch, khi gi\u1ea3m t\u1ea7n su\u1ea5t bay, 3.000 nh\u00e2n vi\u00ean \u0111\u00e3 b\u1ecb sa th\u1ea3i. "C\u00f3 r\u1ea5t nhi\u1ec1u th\u00e1ch th\u1ee9c m\u00e0 Icelandair ph\u1ea3i \u0111\u1ed1i m\u1eb7t khi ti\u1ebfp t\u1ee5c ho\u1ea1t \u0111\u1ed9ng. T\u00ecnh h\u00ecnh th\u1ef1c s\u1ef1 \u0111\u1eb7t ra c\u00e2u h\u1ecfi s\u1ed1ng c\u00f2n v\u1edbi ng\u00e0nh du l\u1ecbch Iceland. Hy v\u1ecdng m\u1ecdi ng\u01b0\u1eddi c\u00f3 th\u1ec3 nh\u1eadn ra r\u1eb1ng quy\u1ebft \u0111\u1ecbnh hi\u1ec7n nay kh\u00f4ng ch\u1ec9 v\u00ec Icelandair, m\u00e0 c\u00f2n\u00a0c\u1ea3 ng\u00e0nh du l\u1ecbch Iceland, c\u1ea3 n\u1ec1n kinh t\u1ebf v\u00e0 to\u00e0n x\u00e3 h\u1ed9i c\u1ee7a ch\u00fang ta", \u00f4ng\u00a0Hallsdottir b\u00e0y t\u1ecf. \n\nIceland, \u0111\u1ea3o qu\u1ed1c c\u00f3 kho\u1ea3ng 364.000 d\u00e2n, ghi nh\u1eadn 1.802 ca nhi\u1ec5m b\u1ec7nh, v\u00e0 10 ng\u01b0\u1eddi t\u1eed vong v\u00ec nCoV. Kho\u1ea3ng 38% ng\u01b0\u1eddi d\u00e2n n\u01b0\u1edbc n\u00e0y \u0111\u00e3 t\u1ea3i nh\u1eefng \u1ee9ng d\u1ee5ng theo d\u00f5i Covid-19 - t\u1ef7 l\u1ec7 t\u1ed1t nh\u1ea5t th\u1ebf gi\u1edbi trong c\u00e1c \u1ee9ng d\u1ee5ng theo d\u00f5i d\u1ecbch b\u1ec7nh hi\u1ec7n nay. B\u1ea5t k\u1ef3 du kh\u00e1ch n\u00e0o \u0111\u1ebfn \u0111\u00e2y v\u00e0o m\u00f9a h\u00e8 n\u00e0y s\u1ebd ch\u1eafc ch\u1eafn \u0111\u01b0\u1ee3c y\u00eau c\u1ea7u l\u00e0m \u0111i\u1ec1u t\u01b0\u01a1ng t\u1ef1. \n\n"Khi du kh\u00e1ch tr\u1edf l\u1ea1i Iceland, ch\u00fang t\u00f4i mu\u1ed1n th\u1ef1c hi\u1ec7n m\u1ecdi\u00a0c\u01a1 ch\u1ebf \u0111\u1ec3 b\u1ea3o v\u1ec7 h\u1ecd v\u00e0 \u0111\u1ea1t nh\u1eefng b\u01b0\u1edbc ti\u1ebfn m\u1edbi\u00a0trong ki\u1ec3m so\u00e1t \u0111\u1ea1i d\u1ecbch", Thordis Kolbrun Reykfjord Gylfadottir, B\u1ed9 tr\u01b0\u1edfng B\u1ed9 Du l\u1ecbch, C\u00f4ng nghi\u1ec7p v\u00e0 \u0110\u1ed5i m\u1edbi, cho hay. \n\nTheo \u00f4ng, chi\u1ebfn d\u1ecbch c\u1ee7a Iceland l\u00e0 x\u00e9t nghi\u1ec7m tr\u00ean di\u1ec7n r\u1ed9ng, theo d\u00f5i v\u00e0 c\u00e1ch ly, ph\u01b0\u01a1ng ph\u00e1p n\u00e0y \u0111\u00e3 ch\u1ee9ng minh hi\u1ec7u qu\u1ea3.\u00a0"Ch\u00fang t\u00f4i mu\u1ed1n x\u00e2y d\u1ef1ng m\u1ed9t tr\u1ea3i nghi\u1ec7m v\u1ec1 m\u1ed9t n\u01a1i an to\u00e0n cho nh\u1eefng ai mu\u1ed1n thay \u0111\u1ed5i kh\u00f4ng kh\u00ed sau\u00a0m\u00f9a xu\u00e2n ng\u1ed9t ng\u1ea1t v\u1edbi t\u1ea5t c\u1ea3 ch\u00fang ta". \n\nAn An (Theo Insider ) \n\nXem th\u00eam \n\nVi\u1ec7t Nam sau gi\u00e3n c\u00e1ch trong m\u1eaft du kh\u00e1ch T\u00e2y \n\nD\u00f9ng nh\u00e0 v\u1ec7 sinh tr\u00ean m\u00e1y bay ph\u1ea3i xin ph\u00e9p \n\nTh\u00e1i Lan c\u1ea5m c\u00e1c chuy\u1ebfn bay qu\u1ed1c t\u1ebf \u0111\u1ebfn h\u1ebft th\u00e1ng 6',
          author: "An An",
          title:
            "Iceland s\u1edbm \u0111\u00f3n du kh\u00e1ch qu\u1ed1c t\u1ebf tr\u1edf l\u1ea1i",
          publish_date: "Th\u1ee9 hai, 18/5/2020, 13:06 (GMT+7)",
          description:
            "Th\u1ee7 t\u01b0\u1edbng Iceland tuy\u00ean b\u1ed1 k\u1ebf ho\u1ea1ch m\u1edf c\u1eeda bi\u00ean gi\u1edbi tr\u1edf l\u1ea1i v\u1edbi kh\u00e1ch qu\u1ed1c t\u1ebf t\u1eeb 15/6 v\u00e0 mi\u1ec5n ph\u00ed x\u00e9t nghi\u1ec7m nCoV.",
          topic: "Du l\u1ecbch"
        }
      ]
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
        bool_1: this.topic_s.link,
        weight_topic: this.topic_s.slider,
        title: this.title_s.text,
        bool_2: this.title_s.link,
        weight_title: this.title_s.slider,
        description: this.description_s.text,
        bool_3: this.description_s.link,
        weight_description: this.description_s.slider,
        content: this.content_s.text,
        bool_4: this.content_s.link,
        weight_content: this.content_s.slider,
        author: this.author_s.text,
        bool_5: this.author_s.link,
        weight_author: this.author_s.slider,
        publish_date: this.date_s.text,
        weight_publish_date: this.date_s.slider
      };
      await this.DetailSearch(dataReq);

      for (let i = 0; i < this.dataRes.results.length; i++) {
        // highlight description
        if (!this.dataRes.hightlight[i].description) {
          this.dataRes.results[i].description_highlight = this.dataRes.results[
            i
          ].description;
        } else {
          this.dataRes.results[
            i
          ].description_highlight = this.dataRes.hightlight[i].description[0];
        }
        // // highlight content
        // if (!this.dataRes.hightlight[i].content) {
        //   this.dataRes.results[i].content_highlight = this.dataRes.results[
        //     i
        //   ].content;
        // } else {
        //   this.dataRes.results[i].content_highlight = this.dataRes.hightlight[
        //     i
        //   ].content[0];
        // }
      }
      this.list = Object.assign({}, this.dataRes.results);
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
</style>