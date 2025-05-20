import { FC, useEffect, useState } from "react";

import { ProductAccessJump } from "@/utils/ProductAccessJump";

import { fetchRecommendationList } from "@/api";
import { Toast } from "@/components";
import { Container } from "@/components";
import { RecommendationListData } from "@/modules/RecommendationListData";
import { setPageTitle } from "@/utils";

import { EmptyProducts } from "./components/EmptyProducts";
import { ProductList } from "./components/ProductList";

const RecommendedList: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [recProducts, setRecProducts] = useState<RecommendationListData["recProducts"] | null>();

  useEffect(() => {
    setPageTitle("Recommend List");
    fetchData();
  }, []);

  const fetchData = async () => {
    Toast.showLoading("loading...");
    try {
      const res = await fetchRecommendationList();
      Toast.clear();

      const data = RecommendationListData.parseJson(res.data);
      console.log(data, "data");
      const recProducts = data?.recProducts ?? [];

      if (recProducts.length == 1) {
        ProductAccessJump(recProducts[0].productId, 0);
        return;
      }
      setIsLoading(false);
      setRecProducts(data?.recProducts);
    } catch (error) {
      setIsLoading(false);
      if (error instanceof Error) {
        Toast.fail(error.message);
      } else if (typeof error === "string") {
        Toast.fail(error);
      } else {
        Toast.fail("发生未知错误");
        console.error("捕获到非标准错误:", error);
      }
    }
  };

  if (isLoading) {
    return <></>;
  }

  if (recProducts?.length == 0) {
    return <EmptyProducts />;
  }

  return (
    <Container className='recommendedProductsPage'>
      <ProductList data={recProducts || []} />
    </Container>
  );
};

export { RecommendedList };
