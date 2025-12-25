import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { FaProductHunt, FaStoreAlt } from "react-icons/fa";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import type { inputsFields } from "@/types/store";
import StoreInputs from "./storeTap/StoreInputs";
import Products from "./productsTap/Products";
import SellsInputs from "./sellsTap/SellsInputs";

export default function AppTabs() {
  const [inputsField, setInputsFields] = useState<inputsFields>({
    productName: "",
    productNumber: "",
    productPrice: "",
    productSellPrice: "",
    productProfit: 0,
    productTotalProfit: 0,
  });
  const [tap, setTap] = useState<string>("store");

  function handleInputsChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { id, value } = event.target;
    setInputsFields({
      ...inputsField,
      [id]: value,
    });
  }

  return (
    <div className="max-w-md mx-auto rounded-2xl bg-white shadow-lg px-2 py-3 space-y-4">
      <Tabs defaultValue={"store"} value={tap} onValueChange={setTap}>
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          {/* Tabs */}
          <TabsList className="bg-purple/20 mx-auto rounded-xl p-1 h-11">
            {/* sells */}
            <TabsTrigger
              value="sells"
              className="flex items-center gap-2 rounded-lg px-4 data-[state=active]:bg-white data-[state=active]:shadow"
            >
              <FaMoneyBillTrendUp />
              المبيعات
            </TabsTrigger>
            {/* products */}
            <TabsTrigger
              value="products"
              className="flex items-center gap-2 rounded-lg px-4 data-[state=active]:bg-white data-[state=active]:shadow"
            >
              <FaProductHunt />
              المنتجات
            </TabsTrigger>
            {/* store */}
            <TabsTrigger
              value="store"
              className="flex items-center gap-2 rounded-lg px-4 data-[state=active]:bg-white data-[state=active]:shadow"
            >
              <FaStoreAlt />
              المتجر
            </TabsTrigger>
          </TabsList>
        </div>
        {/* Contents */}
        {/* stores */}
        <TabsContent value="store" className="space-y-3">
          <StoreInputs
            inputsField={inputsField}
            handleInputsChange={handleInputsChange}
            setInputsFields={setInputsFields}
          />
        </TabsContent>
        {/* products */}
        <TabsContent value="products">
          <Products inputsFields={inputsField} setTap={setTap} />
        </TabsContent>
        {/* sells */}
        <TabsContent value="sells" className="space-y-3">
          <SellsInputs
            inputsField={inputsField}
            handleInputsChange={handleInputsChange}
            setInputsFields={setInputsFields}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
