
export interface inputsFields{
    productName:string;
    productNumber:string | number;
    productPrice:string | number ;
    productSellPrice:string |number;
    productProfit:number;
    productTotalProfit:number,

}
export interface Products {
  products? : inputsFields[];
  setInputsFields?: React.Dispatch<React.SetStateAction<inputsFields>>;
  setTap:(tap:string)=>void;
  handleInputsChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  inputsFields?: inputsFields;


}
export interface StoreInputsProps {
  inputsField: inputsFields;
  handleInputsChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setInputsFields: React.Dispatch<React.SetStateAction<inputsFields>>;

}



export interface CapitalCardProps {
cardText:string;
moneyNumber?:number|null|string;
}


export interface EditItemProps {
openDialog:boolean;
setOpenDialog:(open:boolean)=>void;
product:inputsFields;
setEditProduct:(product:inputsFields)=>void;
formData:inputsFields;
// setFormData:(formData:inputsFields)=>void;
  setFormData: React.Dispatch<React.SetStateAction<inputsFields>>;

handleInputsChange:(event: React.ChangeEvent<HTMLInputElement>)=>void;
disableSaveBtn:boolean;
updateData:(e:React.FormEvent)=>void;

}

export interface RemoveItemProps {
  products:inputsFields[] ;
  setProducts:(products:inputsFields[]|null)=>void;
  deletedProduct:inputsFields;
}