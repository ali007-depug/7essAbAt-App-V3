import {
  Dialog,
  DialogTrigger,
  DialogHeader,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SaveIcon, Edit } from "lucide-react";
import { BsX } from "react-icons/bs";
import type { EditItemProps } from "@/types/store";
import { memo } from "react";

// Edit product dialog component
function  EditItem({
  openDialog,
  setOpenDialog,
  product,
  setEditProduct,
  formData,
  setFormData,
  handleInputsChange,
  disableSaveBtn,
  updateData,
}: EditItemProps) {
  return (
    <>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        {/* Edit button trigger */}
        <DialogTrigger className="z-3">
          <Button
            onClick={() => {
              // Set current product for editing
              setEditProduct(product);
              // Populate form with existing product data
              setFormData({
                productName: product.productName,
                productNumber: product.productNumber,
                productPrice: product.productPrice,
                productSellPrice: product.productSellPrice,
                productProfit: product.productProfit,
                productTotalProfit: product.productTotalProfit,
              });
              setOpenDialog(true);
            }}
            variant="default"
            className="w-full"
          >
            <Edit />
          </Button>
        </DialogTrigger>

        <DialogContent>
          {/* Dialog header */}
          <DialogHeader className="md:text-center">
            <DialogTitle>تعديل المنتج</DialogTitle>
            <DialogDescription>
              قم بتعديل تفاصيل المنتج أدناه
            </DialogDescription>
          </DialogHeader>

          {/* Edit form */}
          <form className="space-y-3 [direction:rtl]" onSubmit={updateData}>
            <FieldGroup className="gap-3">
              {/* Product name field */}
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
                    placeholder="مثال : &&&"
                    className="text-center [direction:ltr] grow-1"
                    value={formData?.productName}
                    onChange={handleInputsChange}
                    required
                  />
                  {/* Clear button */}
                  <BsX
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        productName: "",
                      }))
                    }
                    color="white"
                    className={`absolute left-0 -translate-y-1/2 top-1/2 translate-x-2 bg-purple rounded-full transition-all duration-300 ease-in-out ${
                      formData.productName.length > 1
                        ? "visible opacity-100"
                        : "opacity-0 invisible"
                    } `}
                  />
                </div>
              </Field>

              {/* Product quantity field */}
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
                    className="text-center [direction:ltr] grow-1"
                    value={formData?.productNumber}
                    onChange={handleInputsChange}
                    required
                  />
                  {/* Clear button */}
                  <BsX
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        productNumber: "",
                      }))
                    }
                    color="white"
                    className={`absolute left-0 -translate-y-1/2 top-1/2 translate-x-2 bg-purple rounded-full transition-all duration-300 ease-in-out ${
                    typeof formData.productNumber === "string" &&
                    formData.productNumber.length > 1
                      ? "visible opacity-100"
                      : "opacity-0 invisible"
                    } `}
                  />
                </div>
              </Field>

              {/* Purchase price field */}
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
                    className="text-center [direction:ltr] grow-1"
                    value={formData?.productPrice}
                    onChange={handleInputsChange}
                    required
                  />
                  {/* Clear button */}
                  <BsX
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        productPrice: "",
                      }))
                    }
                    color="white"
                    className={`absolute left-0 -translate-y-1/2 top-1/2 translate-x-2 bg-purple rounded-full transition-all duration-300 ease-in-out ${
                    typeof formData.productPrice === "string" &&
                    formData.productPrice.length > 1
                      ? "visible opacity-100"
                      : "opacity-0 invisible"
                    } `}
                  />
                </div>
              </Field>

              {/* Selling price field */}
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
                    className="text-center [direction:ltr] grow-1"
                    value={formData?.productSellPrice}
                    onChange={handleInputsChange}
                    required
                  />
                  {/* Clear button */}
                  <BsX
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        productSellPrice: "",
                      }))
                    }
                    color="white"
                    className={`absolute left-0 -translate-y-1/2 top-1/2 translate-x-2 bg-purple rounded-full transition-all duration-300 ease-in-out ${
                    typeof formData.productSellPrice === "string" &&
                    formData.productSellPrice.length > 1
                      ? "visible opacity-100"
                      : "opacity-0 invisible"
                    } `}
                  />
                </div>
              </Field>
            </FieldGroup>

            {/* Form footer with save button */}
            <DialogFooter className="md:justify-center">
              <Button
                type="submit"
                variant="default"
                className="w-full"
                disabled={disableSaveBtn}
              >
                حفظ
                <SaveIcon />
              </Button>
              <DialogClose></DialogClose>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default memo(EditItem);