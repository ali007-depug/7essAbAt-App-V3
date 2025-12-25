import {
  Dialog,
  DialogTrigger,
  DialogHeader,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Info } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import type { inputsFields } from "@/types/store";
export default function ItemInfo({ product }: { product: inputsFields }) {
  return (
    <>
      <Dialog>
        <DialogTrigger>
          <Button variant="default" className="mt-2 w-full">
            <Info />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>معلومات المنتج</DialogTitle>
            <DialogDescription>  معلومات حول المنتج</DialogDescription>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-center">إجمالي الربح</TableHead>
                  <TableHead className="text-center">سعر الشراء</TableHead>
                  <TableHead className="text-center">سعر البيع</TableHead>
                  <TableHead className="text-center">العدد</TableHead>

                  <TableHead className="text-center">الاسم</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="text-lightPurple">
                <TableRow>
                  <TableCell className="text-center">
                    {product.productTotalProfit}
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
                  <TableCell className="text-center">
                    {product.productName}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}
