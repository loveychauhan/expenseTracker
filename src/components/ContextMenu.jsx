import React from 'react'

export default function ContextMenu({ menuPosition, setExpenses, rowId, setMenuPosition, setExpense, setEditingRowId, expenses }) {
    if (!menuPosition.left) return
    const [{ category, title, amount }] = expenses.filter((expense) => expense.id === rowId)
    return (
        <div className="context-menu" style={{ left: menuPosition.left, top: menuPosition.top }}>
            <div onClick={(e) => {
                setExpense({ title, category, amount })
                setEditingRowId(rowId)
                setMenuPosition({})
            }
            }>Edit</div>
            <div onClick={() => {
                setExpenses((prevState) => prevState.filter((expense) => expense.id !== rowId))
                setMenuPosition({})
            }
            } > Delete</div>
        </div >
    )
}
