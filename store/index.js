export const state = () => {
    return {
        api: {
            text: '/api'
        },
        dataRes: {},

    }
}

export const mutations = {
    SET_DATA_SEARCH: set('dataRes'),
}

export const actions = {
    async PostText({ state, commit }, docs) {
        const { text } = state.api
        const res = { isSuccess: false }
        try {

            const data = await this.$axios.$post(`${text}/search`, docs)
            console.log("data", data)
            res.isSuccess = true
            commit('SET_DATA_SEARCH', data)
        }
        catch (err) {
            console.log("PostText", err)
        }
        return res
    }
}