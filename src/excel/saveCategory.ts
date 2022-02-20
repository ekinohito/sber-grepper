import { promises } from "fs";
import path from "path";
import { Category } from "../api/sber/getSubcategories";
import { collectGoods } from "../collectGoods";
import ExcelJS from "exceljs"

export async function saveCategory(category: Category) {
    const items = (await collectGoods(category.collectionId, category.total, 200)).flat()
    try {
        await promises.mkdir('output')
    } catch {}
    const headers = [...new Set(items.map(item => Object.keys(item)).flat())]
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet(`collection-${category.collectionId}`)
    worksheet.columns = headers.map(header => {return {header, key: header, width: 20}})
    worksheet.addRows(items)
    await workbook.xlsx.writeFile(path.join('output', `collection-${category.collectionId}.xlsx`));
}