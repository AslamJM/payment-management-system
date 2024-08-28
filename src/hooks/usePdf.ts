import { type Table } from "@tanstack/react-table";
import { format } from "date-fns";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import _ from "underscore";
import { rupees } from "~/lib/utils";
import { type WholePayment } from "~/schemas/payment";

export const usePdf = (table: Table<WholePayment>) => {



    const cols = table.getVisibleFlatColumns().map((c,) => {
        const header = c.columnDef.id
        return header
    }).filter(c => c !== "select")

    const rows = table.getSelectedRowModel().rows.map(r => {
        const pdfRow: Record<string, string | number> = {}
        cols.forEach(colId => {
            if (colId)
                pdfRow[colId] = r.getValue(colId)
        })
        return pdfRow
    })

    const modelData = () => {
        const pdfCols = cols.map(c => ({
            header: c,
            dataKey: c
        }))

        const totalCol: Record<string, string | number> = _.mapObject(rows[0]!, (val) => {
            if (typeof val === "number") {
                return 0
            } else {
                return ""
            }
        })



        const tableBody = rows.map(row => {
            return _.mapObject(row, (val, key) => {
                if (typeof val === "number") {
                    totalCol[key] = totalCol[key] as number + val
                    return rupees(val)
                } else {
                    return val
                }
            })
        })



        const totalRow = _.mapObject(totalCol, (v) => typeof v === "number" ? rupees(v) : "")

        const company = _.uniq(rows.map(r => r.Company)).join(",")

        const doc = new jsPDF({ orientation: "landscape" });
        doc.setFontSize(15);
        doc.text("HS Enterprises Payment Report", 100, 10);
        doc.setFontSize(12);
        doc.text(`Date - ${format(new Date(), "PPP")}`, 15, 15);
        doc.text(`Company - ${company}`, 15, 20);


        autoTable(doc, {
            body: tableBody,
            columns: pdfCols,
            foot: [totalRow],
            margin: { top: 25 },
            styles: { cellPadding: 1, fontSize: 10, },
            headStyles: {
                fillColor: "#BB892D",

            },

            columnStyles: {
                "total": { halign: "right" },
                "paid": { halign: "right" },
                "due": { halign: "right" },
                "free": { halign: "right" },
                "discount": { halign: "right" },
                "saleable": { halign: "right" },
                "market": { halign: "right" },
            },
            footStyles: {
                halign: "right",
                fillColor: "#D0B87E"
            }
        });

        doc.save(`table-${format(new Date(), "dd/MM/yyyy")}.pdf`);

    }

    return { modelData }

}