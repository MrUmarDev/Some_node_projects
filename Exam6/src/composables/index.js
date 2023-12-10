import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';

export function useHome() {
    const store = useStore();


    const products = computed(() => store.getters.products);

    onMounted(async () => {
        await store.dispatch("fetchAuthors")
    });

    // const searchWord = ref("");
    // const searchProducts = async () => {
    //     if (searchWord.value) {
    //         const res = await fetch(
    //             `https://dummyjson.com/products/search?q=${searchWord.value}`
    //         );
    //         const data = await res.json();
    //         products.value = data.products;
    //     }
    // };

    return {
        products,
        // searchProducts, searchWord
    };
}