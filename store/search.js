import {
    set
} from "@/utils/actions"
import { replaceAllText } from "@/utils/replaceWord"
export const state = () => {
    return {
        api: {
            text: '/api'
        },
        dataRes: {},
        request: {}
    }
}

export const mutations = {
    SET_DATA_SEARCH: set('dataRes'),

    SET_DETAIL_SEARCH: set('dataRes'),

    ADD_CLICKED: set('request')
}

export const actions = {
    async PostText({ state, commit }, docs) {
        const { text } = state.api
        const res = { isSuccess: false }
        try {

            const data = await this.$axios.$post(`${text}/fulltext`, docs)
            for (let i = 0; i < data.results.length; i++) {
                data.results[i].description = replaceAllText(data.results[i].description, '_', ' ');
                data.results[i].author = replaceAllText(data.results[i].author, '_', ' ');
                data.results[i].topic = replaceAllText(data.results[i].topic, '_', ' ');
                data.results[i].title = replaceAllText(data.results[i].title, '_', ' ');
                data.results[i].content = replaceAllText(data.results[i].content, '_', ' ');

            }
            for (let i = 0; i < data.hightlight.length; i++) {
                if (!data.hightlight[i].description) { }
                else {
                    data.hightlight[i].description[0] = replaceAllText(data.hightlight[i].description[0], '_', ' ');
                }
                if (!data.hightlight[i].content) { }
                else {
                    data.hightlight[i].content[0] = replaceAllText(data.hightlight[i].content[0], '_', ' ');
                }
                if (!data.hightlight[i].title) { }
                else {
                    data.hightlight[i].title[0] = replaceAllText(data.hightlight[i].title[0], '_', ' ');
                }
                if (!data.hightlight[i].topic) { }
                else {
                    data.hightlight[i].topic[0] = replaceAllText(data.hightlight[i].topic[0], '_', ' ');
                }
            }

            commit('SET_DATA_SEARCH', data)
            res.isSuccess = true
        }
        catch (err) {
            console.log("PostText", err)
        }
        return res
    },

    async DetailSearch({ state, commit }, docs) {
        const { text } = state.api
        const res = { isSuccess: false }
        try {

            const data = await this.$axios.$post(`${text}/field`, docs)

            for (let i = 0; i < data.results.length; i++) {
                data.results[i].description = replaceAllText(data.results[i].description, '_', ' ');
                data.results[i].author = replaceAllText(data.results[i].author, '_', ' ');
                data.results[i].topic = replaceAllText(data.results[i].topic, '_', ' ');
                data.results[i].title = replaceAllText(data.results[i].title, '_', ' ');
                data.results[i].content = replaceAllText(data.results[i].content, '_', ' ');

            }
            for (let i = 0; i < data.hightlight.length; i++) {
                if (!data.hightlight[i].description) { }
                else {
                    data.hightlight[i].description[0] = replaceAllText(data.hightlight[i].description[0], '_', ' ');
                }
                if (!data.hightlight[i].content) { }
                else {
                    data.hightlight[i].content[0] = replaceAllText(data.hightlight[i].content[0], '_', ' ');
                }
                if (!data.hightlight[i].title) { }
                else {
                    data.hightlight[i].title[0] = replaceAllText(data.hightlight[i].title[0], '_', ' ');
                }
                if (!data.hightlight[i].topic) { }
                else {
                    data.hightlight[i].topic[0] = replaceAllText(data.hightlight[i].topic[0], '_', ' ');
                }

            }

            commit('SET_DETAIL_SEARCH', data)
            res.isSuccess = true
        }
        catch (err) {
            console.log("DetailSearch", err)
        }
        return res
    },

    async addClick({ state, commit }, idPost) {
        const { text } = state.api
        const res = { isSuccess: false }
        try {
            const data = await this.$axios.$post(`${text}/result_search/clicked`, { id: idPost })
            console.log(data)
            commit('ADD_CLICKED', data)
            res.isSuccess = true
        }
        catch (err) {
            console.log("addClick", err)
        }
        return res
    }
}