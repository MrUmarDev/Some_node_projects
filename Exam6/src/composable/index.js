import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';

export function useHome() {
    const store = useStore();
    const authors = computed(() => store.getters.authors);

    onMounted(async () => {
        await store.dispatch("fetchAuthors")
    });

    return {
        authors,
    };
}