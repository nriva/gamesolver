    /**
     * 
     * @param e 
     * @returns 
     */
     export function getClickedRowCol(e: any): [number, number] {
        const cell = e.currentTarget;
        const span = cell.children.item(0);
        const id = span!.id.substring(span!.id.length - 2);
        const currentEditRow = Number(id.substring(0, 1)) - 1;
        const currentEditCol = Number(id.substring(1)) - 1;
        return [currentEditRow, currentEditCol ];
    }