import Sidebar from "../side-bar/Sidebar";
import AddProductsFromExcel from "./AddProductsFromExcel";
import './ExcelPage.css';

const ExeclPage =  () => {
    return(
        <div className="Excel-page">
        <Sidebar/>
        <AddProductsFromExcel/>
        </div>
    )
}

export default ExeclPage;