import React, { use, useState } from 'react'
import Input from './Input'
import SelectInput from './SelectInput'

export default function ExpenseForm({ setExpenses, setExpense, expense, editingRowId, setEditingRowId }) {
    const [error, setError] = useState({})
    const validateConfig = {
        title: [{ required: true, message: 'Title is required' }],
        category: [{ required: true, message: 'Please select an option.' }],
        amount: [
            { required: true, message: 'Please add amount' },
            { maxAmount: 100000, message: 'Amount should be less than 100000' },
            { number: true, message: 'amount must be a number' }
        ]
    }

    function validate(formData) {
        const errorData = {}
        Object.entries(formData).forEach(([key, value]) => {
            validateConfig[key]?.forEach((rule) => {
                if (rule.required && !value) {
                    errorData[key] = rule.message
                }
                if (rule.maxAmount && value > 100000) {
                    errorData[key] = rule.message
                }
                if (rule.number && !(parseFloat(value))) {
                    errorData[key] = rule.message
                }


            })
        })


        setError(errorData)
        return (errorData)
    }

    function submitHandler(e) {
        e.preventDefault()

        const validateResult = validate(expense)

        if (Object.keys(validateResult).length) return

        if (editingRowId) {
            setExpenses((prevState) =>
                prevState.map((prevExpense) => {
                    if (prevExpense.id === editingRowId) {
                        return { ...expense, id: editingRowId }
                    }
                    return prevExpense
                })
            )
            setExpense({
                title: '',
                category: '',
                amount: ''
            })
            setEditingRowId('')
            return
        }
        setExpenses((prevState) => [
            ...prevState,
            { ...expense, id: crypto.randomUUID() },
        ])
        setExpense({
            title: '',
            category: '',
            amount: '',
        })
    }

    function changeValue(e) {
        const { name, value } = e.target
        setExpense((prevState) => ({ ...prevState, [name]: value }))
        setError({})
    }

    return (
        <form className="expense-form" onSubmit={submitHandler}>
            <Input label={'Title'} id={'title'} name={'title'} value={expense.title} onChange={changeValue} error={error.title} />

            <SelectInput label={'Category'} id={'category'} name={'category'} value={expense.category} onChange={changeValue} optionLabel={'Select Category'} error={error.category} options={['Grocery', 'Clothes', 'Bills', 'Education', 'Medicines']} />

            <Input label={'Amount'} id={'amount'} name={'amount'} value={expense.amount} onChange={changeValue} error={error.amount} />

            <button className="add-btn">{editingRowId ? 'Save' : 'Add'}</button>
        </form>
    )
}
