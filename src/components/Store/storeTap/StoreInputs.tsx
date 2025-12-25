import type { StoreInputsProps } from "@/types/store";
import { Input } from "../../ui/input";
import { Field, FieldGroup, FieldLabel } from "../../ui/field";
import { toast } from "sonner";
import { BsX } from "react-icons/bs";
import { Button } from "../../ui/button";
import { addDataToLocalStorage, getDataFromLocalStorage } from "@/actions";
import { FaCartPlus } from "react-icons/fa";
import { type FormEvent } from "react";
import type { inputsFields } from "@/types/store";
import CapitalCard from "../CapitalCard";
import { motion } from "motion/react";

export default function StoreInputs({
  inputsField,
  setInputsFields,
  handleInputsChange,
}: StoreInputsProps) {
  function addData(e: FormEvent) {
    e.preventDefault();
    // if there is no data
    if (!getDataFromLocalStorage("products")) {
      // update products state
      // add new item item to storage
      addDataToLocalStorage("products", [inputsField]);
      // empty input fields
      setInputsFields({
        ...inputsField,
        productName: "",
        productNumber: "",
        productPrice: "",
        productSellPrice: "",
      });
      toast.success("تمت إضافة المنتج بنجاح");
      return;
    }
    // Get existing products or initialize empty array
    const existingProducts =
      getDataFromLocalStorage<inputsFields[]>("products") || [];

    // Find if product already exists
    const productIndex = existingProducts.findIndex(
      (product) => product.productName === inputsField.productName
    );

    // Create updated products array
    let updatedProducts: inputsFields[];

    if (productIndex === -1) {
      // Case 2: Product doesn't exist - add new item
      updatedProducts = [...existingProducts, inputsField];
      toast.success("تم إضافة المنتج بنجاح");
    } else {
      // Case 3: Product exists - update only it's number
      updatedProducts = existingProducts.map((product, index) =>
        index === productIndex
          ? {
              ...product,
              productNumber:
                Number(product.productNumber) +
                Number(inputsField.productNumber),
            }
          : product
      );
      toast.success("تمت تحديث المتجر ");
    }
    // Save to localStorage
    addDataToLocalStorage("products", updatedProducts);

    // Clear input fields
    setInputsFields({
      ...inputsField,
      productName: "",
      productNumber: "",
      productPrice: "",
      productSellPrice: "",
    });
  }
  let moneyNumber: number | undefined;
  if (getDataFromLocalStorage("products")) {
    moneyNumber = getDataFromLocalStorage<inputsFields[]>("products")?.reduce(
      (total: number, product: inputsFields) => {
        total += Number(product.productPrice) * Number(product.productNumber);
        return total;
      },
      0
    );
  } else {
    moneyNumber = 0;
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="flex gap-3 flex-col"
    >
      <CapitalCard
        cardText="رأس المال"
        moneyNumber={moneyNumber?.toLocaleString("en-US")}
      />
      <form className="[direction:rtl]" onSubmit={addData}>
        <FieldGroup className="gap-3">
          <Field className="flex flex-row items-center gap-3">
            <FieldLabel
              className="text-sm max-w-fit text-slate-600"
              htmlFor="productName"
            >
              اسم المنتج
            </FieldLabel>
            <div className="relative">
              <Input
                id="productName"
                placeholder="اسم المنتج"
                className="text-center grow-1 [direction:ltr]"
                value={inputsField.productName}
                onChange={handleInputsChange}
                required
              />
              <BsX
                onClick={() =>
                  setInputsFields((prev) => ({ ...prev, productName: "" }))
                }
                color="white"
                className={`absolute left-0 -translate-y-1/2 top-1/2 translate-x-2 bg-purple rounded-full transition-all duration-300 ease-in-out ${
                  inputsField.productName.length > 1
                    ? "visible opacity-100"
                    : "opacity-0 invisible"
                } `}
              />
            </div>
          </Field>

          <Field className="flex flex-row items-center gap-3">
            <FieldLabel
              className="max-w-fit text-sm text-slate-600"
              htmlFor="productNumber"
            >
              عدد المنتج
            </FieldLabel>
            <div className="relative">
              <Input
                id="productNumber"
                type="number"
                placeholder="0"
                className="text-center  [direction:ltr]"
                value={inputsField.productNumber}
                onChange={handleInputsChange}
                required
              />
              <BsX
                onClick={() =>
                  setInputsFields((prev) => ({ ...prev, productNumber: "" }))
                }
                color="white"
                className={`absolute left-0 -translate-y-1/2 top-1/2 translate-x-2 bg-purple rounded-full transition-all duration-300 ease-in-out ${
                  typeof inputsField.productNumber === "string" &&
                  inputsField.productNumber.length > 1
                    ? "visible opacity-100"
                    : "opacity-0 invisible"
                } `}
              />
            </div>
          </Field>
          {/* only show this fields on store window */}
          <Field className="flex flex-row items-center gap-3">
            <FieldLabel
              className="max-w-fit text-sm text-slate-600"
              htmlFor="productPrice"
            >
              سعر الشراء
            </FieldLabel>
            <div className="relative">
              <Input
                id="productPrice"
                type="number"
                placeholder="0.00"
                className="text-center  [direction:ltr]"
                value={inputsField.productPrice}
                onChange={handleInputsChange}
                required
              />
              <BsX
                onClick={() =>
                  setInputsFields((prev) => ({ ...prev, productPrice: "" }))
                }
                color="white"
                className={`absolute left-0 -translate-y-1/2 top-1/2 translate-x-2 bg-purple rounded-full transition-all duration-300 ease-in-out ${
                  typeof inputsField.productPrice === "string" &&
                  inputsField.productPrice.length > 1
                    ? "visible opacity-100"
                    : "opacity-0 invisible"
                } `}
              />
            </div>
          </Field>

          <Field className="flex flex-row items-center gap-3">
            <FieldLabel
              className="max-w-fit text-sm text-slate-600"
              htmlFor="productSellPrice"
            >
              سعر البيع
            </FieldLabel>

            <div className="relative">
              <Input
                id="productSellPrice"
                type="number"
                placeholder="0.00"
                className="text-center [direction:ltr]"
                value={inputsField.productSellPrice}
                onChange={handleInputsChange}
                required
              />
              <BsX
                onClick={() =>
                  setInputsFields((prev) => ({
                    ...prev,
                    productSellPrice: "",
                  }))
                }
                color="white"
                className={`absolute left-0 -translate-y-1/2 top-1/2 translate-x-2 bg-purple rounded-full transition-all duration-300 ease-in-out ${
                  typeof inputsField.productSellPrice === "string" &&
                  inputsField.productSellPrice.length > 1
                    ? "visible opacity-100"
                    : "opacity-0 invisible"
                } `}
              />
            </div>
          </Field>
          {/* buttons */}
          <Button
            variant="default"
            className="bg-purple hover:bg-lightPurple/80"
            type="submit"
          >
            إضافة إلى المتجر <FaCartPlus />
          </Button>
        </FieldGroup>
      </form>
    </motion.div>
  );
}
