import { serverApi } from "@/app/api/api";

/**
 * Faz uma requisição GET para a API do servidor com tentativas automáticas em caso de falha, incluindo um delay entre as tentativas.
 *
 * @param {string} url - O caminho da rota da API, começando com "/".
 * @param {number} [retries=3] - Quantidade de tentativas em caso de erro (padrão é 3).
 * @param {number} [delay=1000] - Delay entre as tentativas em milissegundos (padrão é 1000ms, ou 1 segundo).
 * @returns {Promise<any>} Os dados da resposta da API.
 * @throws Lança um erro se todas as tentativas falharem.
 *
 * @example
 * const data = await fetchData('/products?stock=true');
 */
export async function fetchData<T>(url: string, retries = 3, delay = 1000): Promise<T> {
  try {
    const response = await serverApi.get(url);
    return response.data;
  } catch (error) {
    if (retries > 0) {
      console.warn(`Erro ao buscar ${url}. Tentando novamente... (${3 - retries + 1}/3)`);
      await new Promise(resolve => setTimeout(resolve, delay)); // Delay de 1 segundo (pode ajustar o tempo)
      return fetchData(url, retries - 1, delay);
    } else {
      throw new Error(`Erro ao buscar dados de ${url} após múltiplas tentativas.`);
    }
  }
}