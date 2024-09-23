const useCrypto = () => {
  const getAllCurrencies = async () => {
    try {
      const response = await fetch(
        `https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=1&limit=${5}&convert=EUR`,
        {
          headers: {
            "X-CMC_PRO_API_KEY": "8fcb7d84-bbf4-4049-95df-b7bab365ce85",
          },
        }
      ).then((res) => res.json());

      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const getAllInfoCurrencies = async (ids: string) => {
    try {
      const response = await fetch(
        `https://pro-api.coinmarketcap.com/v2/cryptocurrency/info?id=${ids}`,
        {
          headers: {
            "X-CMC_PRO_API_KEY": "8fcb7d84-bbf4-4049-95df-b7bab365ce85",
          },
        }
      ).then((res) => res.json());

      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error("Failed to fetch currency info.");
    }
  };

  return {
    getAllCurrencies,
    getAllInfoCurrencies,
  };
};

export default useCrypto;
