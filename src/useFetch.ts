import { ref } from "vue";
import axios from "axios";

export const useFetch = (url: string, config: object = {}) => {
  const data = ref(null);
  const response: { value: any } = ref(null);
  const error = ref(null);
  const loading = ref(false);

  const fetch = async () => {
    loading.value = true;
    try {
      const result = await axios.request({
        url,
        ...config,
      });
      response.value = result;
      data.value = result.data;
      console.log(result.data);
    } catch (ex) {
    } finally {
      loading.value = false;
    }
  };

  !config.skip && fetch();

  return { response, error, data, loading, fetch };
};

// https://nasserspace.hashnode.dev/deep-dive-into-vue-3-ref-function
// Funktionen returnerar refimpl med alla data, vet inte hur jag ska få ut data från refimpl

// const cacheMap = reactive(new Map());

// export const useFetchCache = (key, url: string, config: Object) => {
//   const info = useFetch(url, { skip: true, ...config });

//   const update = () => cacheMap.set(key, info.response.value);
//   const clear = () => cacheMap.set(key, undefined);

//   const fetch = async () => {
//     try {
//       await info.fetch();
//       update();
//     } catch {
//       clear();
//     }
//   };

//   const response = computed(() => cacheMap.get(key));
//   const data = computed(() => response.value?.data);

//   if (response.value === null) fetch();

//   return { ...info, fetch, data, response, clear };
// };
