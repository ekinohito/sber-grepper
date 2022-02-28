import { promises } from "fs";
import path from "path";
import { Category } from "../api/sber/getSubcategories";
import { collectGoods } from "../collectGoods";
import ExcelJS from "exceljs"
import { fullGoodsInformation } from "../api/sber/fullGoodsInformation";
import { FULL_INFO, PROBABILITY } from "../config";

export async function saveCategory(category: Category, directory?: string) {
    const preItems = (await collectGoods(category, category.total, 40)).flat().filter(() => Math.random() <= PROBABILITY)
    const items = (FULL_INFO ? await Promise.all(preItems.map(item => fullGoodsInformation(item.goodsId))) : preItems)
    const dirPath = directory ? path.join('output', directory) : 'output'
    try {
        await promises.mkdir(dirPath, {recursive: true})
    } catch {}
    const headers = [...new Set(items.map(item => Object.keys(item ?? {})).flat())]
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet(`collection-${category.collectionId}`)
    worksheet.columns = headers.map(header => {return {header, key: header, width: 20}})
    worksheet.addRows(items)
    await workbook.xlsx.writeFile(path.join(dirPath, `collection-${category.title}-${category.collectionId}.xlsx`));
}