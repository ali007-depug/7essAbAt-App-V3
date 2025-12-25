import { useMemo,useState } from "react";
import { FieldGroup, Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BsFillCartCheckFill, BsX } from "react-icons/bs";
import { type inputsFields, type StoreInputsProps } from "@/types/store";
import CapitalCard from "../CapitalCard";
import { addDataToLocalStorage, getDataFromLocalStorage } from "@/actions";
import { toast } from "sonner";
import {
  Dialog,
  DialogTitle,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { motion } from "motion/react"


export default function SellsInputs({
  inputsField,
  setInputsFields,
  handleInputsChange,
}: StoreInputsProps) {
  const [profitResetKey, setProfitResetKey] = useState<number>(0);
  const [products, setProducts] = useState<inputsFields[]>(
    getDataFromLocalStorage<inputsFields[]>("products") ?? []
  );

  const profit = useMemo(() => {
    if (profitResetKey > 0) return 0;

    return products.reduce(
      (acc, product) => acc + (product.productProfit || 0),
      0
    );
  }, [products, profitResetKey]);

  function updateStore(e: React.FormEvent) {
    e.preventDefault();
    // loop through products and update the sold number and the profit
    if (products) {
      // find the product
      const productIndex = products.findIndex(
        (product) => product.productName === inputsField.productName
      );
      // if product found
      if (productIndex !== -1) {
        // check if there is enough products to sell
        if (
          Number(products[productIndex].productNumber) <
          Number(inputsField.productNumber)
        ) {
          toast.error("لا يوجد كمية كافية من المنتج في المتجر");
          return;
        }
        // update the productNumber

        const updatedProducts = products.map((product, index) => {
          if (index !== productIndex) return product;

          const sold = Number(inputsField.productNumber);

          return {
            ...product,
            productNumber: Number(product.productNumber) - sold,
            productProfit:
              product.productProfit +
              (Number(product.productSellPrice) -
                Number(product.productPrice)) *
                sold,
            productTotalProfit:
              product.productProfit +
              (Number(product.productSellPrice) -
                Number(product.productPrice)) *
                sold,
          };
        });
        toast.success("تم تحديث المتجر بنجاح");
        addDataToLocalStorage("products", updatedProducts); // empty fields
        setInputsFields({
          ...inputsField,
          productName: "",
          productNumber: "",
        });
        setProducts(updatedProducts);
      } else {
        toast.error("المنتج غير موجود في المتجر");
      }
    } else {
      toast.error("لا يوجد منتجات في المتجر");
    }
  }

  function resetProfit() {
    const updatedProducts = products.map((product) => ({
      ...product,
      productProfit: 0,
    }));
    setProfitResetKey(1);
    setProducts(updatedProducts);
    addDataToLocalStorage("products", updatedProducts);
    toast.success("تم تصفير الأرباح بنجاح");
  }

  return (
    <motion.div initial={{opacity:0,x:-20}} animate={{opacity:1,x:0}} transition={{duration:0.5}} className="space-y-4">
      <div className="flex justify-between gap-3 items-center">
        <Dialog>
          <DialogTrigger>
            <Button variant="outline" className="">
              تصفير الأرباح
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>هل أنت متأكد ؟</DialogTitle>
              <DialogDescription>سيتم تصفير جميع الأرباح</DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <div className="flex justify-center gap-5">
                <DialogClose>
                  <Button variant={"destructive"} onClick={() => resetProfit()}>
                    نعم
                  </Button>
                </DialogClose>
                <DialogClose>
                  <Button>إلغاء</Button>
                </DialogClose>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        {/* capital Card */}
        <CapitalCard
          cardText="إجمالي الأرباح"
          moneyNumber={profit.toLocaleString("en-US")}
        />
        {/* reset button */}
      </div>

      <form className="[direction:rtl]" onSubmit={updateStore}>
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
              <button>
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
              </button>
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
              <button>
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
              </button>
            </div>
          </Field>
          <Button
            type="submit"
            aria-label="submit"
            variant="default"
            className="bg-purple hover:bg-purple/80"
          >
            تحديث المتجر <BsFillCartCheckFill />
          </Button>
        </FieldGroup>
      </form>
    </motion.div>
  );
}
