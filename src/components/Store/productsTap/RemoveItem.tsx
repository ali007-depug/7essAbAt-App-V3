import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogHeader,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogClose,
  DialogDescription,
} from "@/components/ui/dialog";
import type { inputsFields, RemoveItemProps } from "@/types/store";
import { Trash } from "lucide-react";

export default function RemoveItem({products,deletedProduct,setProducts}:RemoveItemProps) {
    function removeItem(products:inputsFields[],deletedProduct:inputsFields) {
        const updatedProducts = products.filter(
            (product: { productName: string }) =>
            product.productName !== deletedProduct.productName
        );
        if(products.length === 1){
            localStorage.clear();
            setProducts(null)
        }else{
        localStorage.setItem("products", JSON.stringify(updatedProducts));
        setProducts(updatedProducts);
        }
    }
  return (
    <>
      <Dialog>
        <DialogTrigger>
          <Button variant="destructive" className="w-full mt-2">
            <Trash />
          </Button>
        </DialogTrigger>

          <DialogContent className="md:text-center">
            <DialogHeader>
                <DialogTitle>هل تود حذف هذا المنتج؟</DialogTitle>
                <DialogDescription>سيتم حذف المنتج من المتجر</DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <div className="flex justify-center gap-2">
                <DialogClose asChild>
                  <Button variant="outline">إلغاء</Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button variant="destructive" onClick={()=>removeItem(products,deletedProduct)}>
                     <Trash /> حذف 
                  </Button>
                </DialogClose>
              </div>
              </DialogFooter>
          </DialogContent>
      </Dialog>
    </>
  );
}
