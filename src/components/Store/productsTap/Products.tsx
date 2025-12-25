import { addDataToLocalStorage, getDataFromLocalStorage } from "@/actions";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "../../ui/table";
import { Button } from "../../ui/button";
import { Trash, Trash2Icon } from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import EmptyStore from "../Empty";
import { useState } from "react";
import type { inputsFields, Products } from "@/types/store";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { toast } from "sonner";
import EditItem from "./EditItem";
import Info from "./Info";
import RemoveItem from "./RemoveItem";
import { motion } from "motion/react";

export default function Products({ setTap }: Products) {
  const [products, setProducts] = useState(
    getDataFromLocalStorage<inputsFields[] | undefined>("products")
  );
  const [editProduct, setEditProduct] = useState<inputsFields | null>(null);
  const [formData, setFormData] = useState<inputsFields>({
    productName: "",
    productNumber: "",
    productPrice: "",
    productSellPrice: "",
    productProfit: 0,
    productTotalProfit: 0,
  });
  const [openDialog, setOpenDialog] = useState(false);
  const [disableSaveBtn, setDisableSaveBtn] = useState(true);
  const [openMenuFor, setOpenMenuFor] = useState<string | null>(null);

  // Handle input changes
  const handleInputsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    // Convert numeric fields to numbers
    const numericFields = ["productNumber", "productPrice", "productSellPrice"];
    const processedValue = numericFields.includes(id) ? Number(value) : value;

    setFormData((prevData) => ({
      ...prevData,
      [id]: processedValue,
    }));
    // compare the new value with the old on
    if (editProduct) {
      const hasChange =
        (id === "productName" && value !== editProduct.productName) ||
        (id === "productNumber" &&
          Number(value) !== Number(editProduct.productNumber)) ||
        (id === "productPrice" &&
          Number(value) !== Number(editProduct.productPrice)) ||
        (id === "productSellPrice" &&
          Number(value) !== Number(editProduct.productSellPrice));
      setDisableSaveBtn(!hasChange);
    }
  };

  function updateData(e: React.FormEvent) {
    e.preventDefault();
    // check if there is any input is empty

    // Update products array
    const updatedProducts = products?.map((product) =>
      product.productName === editProduct?.productName ? formData : product
    );
    setProducts(updatedProducts);
    // Save to localStorage
    addDataToLocalStorage("products", updatedProducts);
    toast.success("تم تعديل المنتج بنجاح");

    setOpenDialog(false);
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-4"
    >
      {products ? (
        <>
          <div className="relative max-h-[300px] overflow-y-scroll ">
            <Table className="bg-purple/30 rounded ">
              <TableHeader>
                <TableRow>
                  <TableHead className="text-left"></TableHead>{" "}
                  <TableHead className="text-left">سعر البيع</TableHead>{" "}
                  <TableHead className="text-center">سعر الشراء</TableHead>
                  <TableHead className="text-center">العدد</TableHead>
                  <TableHead className="text-right">الاسم</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products?.map((product) => (
                  <TableRow
                    key={product.productName}
                    className="odd:bg-purple/10"
                  >
                    <TableCell>
                      <DropdownMenu
                        open={openMenuFor === product.productName}
                        onOpenChange={(open) =>
                          setOpenMenuFor(open ? product.productName : null)
                        }
                      >
                        <DropdownMenuTrigger
                          asChild
                          className="bg-lightPurple text-white hover:text-white border-0 hover:bg-lightPurple"
                        >
                          <Button
                            variant="outline"
                            className={`flex justify-center ${
                              openMenuFor &&
                              openMenuFor !== product.productName &&
                              "opacity-0 pointer-events-none"
                            } `}
                          >
                            <div className="rotate-90 translate-x-1/2">...</div>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="bg-darkPurple rounded-md p-2">
                          <div className="flex flex-col gap-0 z-200 relative">
                            {/* Edit */}
                            <EditItem
                              openDialog={openDialog}
                              setOpenDialog={setOpenDialog}
                              product={product}
                              setEditProduct={setEditProduct}
                              formData={formData}
                              setFormData={setFormData}
                              handleInputsChange={handleInputsChange}
                              updateData={updateData}
                              disableSaveBtn={disableSaveBtn}
                            />
                            {/* End Edit */}
                            {/* Info */}
                            <Info product={product} />
                            {/* End Info */}
                            {/* Remove Item */}
                            <RemoveItem
                              products={products}
                              deletedProduct={product}
                              setProducts={setProducts}
                            />
                            {/* End Remove Item */}
                          </div>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>

                    <TableCell className="text-center">
                      {product.productSellPrice}
                    </TableCell>
                    <TableCell className="text-center">
                      {product.productPrice}
                    </TableCell>

                    <TableCell className="text-center">
                      {product.productNumber}
                    </TableCell>
                    <TableCell className="font-medium text-right">
                      {product.productName}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </>
      ) : (
        <EmptyStore setTap={setTap} />
      )}
      {products && (
        <Dialog>
          <DialogTrigger className="relative left-[88%] top-2 bg-red-500 p-2 rounded-md cursor-pointer  hover:bg-red-600 transition">
            <Trash size={20} color="white" />
          </DialogTrigger>
          <DialogContent className="[direction:rtl] sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>حذف جميع المنتجات</DialogTitle>
              <DialogDescription>
                هل أنت متأكد أنك تريد حذف جميع المنتجات؟ هذا الإجراء لا يمكن
                التراجع عنه.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <div className="flex justify-center gap-2">
                <DialogClose asChild>
                  <Button variant="outline">إلغاء</Button>
                </DialogClose>
                <DialogClose>
                  <Button
                    variant="destructive"
                    onClick={() => {
                      localStorage.clear();
                      setProducts(null);
                    }}
                  >
                    حذف <Trash2Icon />
                  </Button>
                </DialogClose>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </motion.div>
  );
}
