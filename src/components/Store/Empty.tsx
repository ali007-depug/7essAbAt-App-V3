import { BsCartPlus } from "react-icons/bs";
import { Button } from "../ui/button";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "../ui/empty"
import { MdOutlineProductionQuantityLimits } from "react-icons/md";

export default function EmptyStore({setTap}:{setTap:(tap:string)=>void}) {
    return(
        <Empty>
            <EmptyHeader>
                <EmptyMedia variant="icon"><MdOutlineProductionQuantityLimits/></EmptyMedia>
                <EmptyTitle>لا توجد عناصر في المتجر</EmptyTitle>
                <EmptyDescription>عذراً،متجرك فارغ ، الرجاء قم بإضافة بعض العناصر</EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
                <div className="felx items-center gap-3">
                <Button className="bg-purple cursor-pointer hover:bg-lightPurple" onClick={()=>setTap('store')}><BsCartPlus/>إضافة منتج </Button>
                </div>
            </EmptyContent>
        </Empty>
    )
}