import axios from "axios";
import { useUiStore } from "@/lib/stores/uiStore";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";

const sleep = (delay: number) =>
  new Promise((resolve) => setTimeout(resolve, delay));

const agent = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

agent.interceptors.request.use((config) => {
  const uiStore = useUiStore();
  uiStore.isBusy();
  return config;
});

agent.interceptors.response.use(
  async (response) => {
    const uiStore = useUiStore();
    if (import.meta.env.DEV) await sleep(1000);

    uiStore.isIdle();
    return response;
  },
  async (error) => {
    const uiStore = useUiStore();
    const toast = useToast();
    const router = useRouter();

    if (import.meta.env.DEV) await sleep(1000);

    uiStore.isIdle();

    const { status, data } = error.response || {};

    switch (status) {
      case 400:
        if (data.errors) {
          const modalStateErrors: any[] = [];
          for (const key in data.errors) {
            if (data.errors[key]) modalStateErrors.push(data.errors[key]);
          }
          throw modalStateErrors.flat(); // rejette la promesse avec les erreurs de validation
        } else {
          toast.error(data);
        }
        break;
      case 401:
        toast.error("Non autorisé", { timeout: 3000 });
        break;
      case 404:
        toast.error("Page non trouvée", { timeout: 3000 });
        router.push("/not-found");
        break;
      case 500:
        toast.error("erreur interne du serveur", { timeout: 3000 });
        router.push({ path: "/server-error", state: { error: data } });
        break;
      default:
        break;
    }

    return Promise.reject(error);
  }
);

export default agent;
