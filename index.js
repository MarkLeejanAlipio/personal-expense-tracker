const total = document.querySelector('#totalValue')
const average = document.querySelector('#averageValue')
const expenseName = document.querySelector('#expenseName')
const expenseAmount = document.querySelector('#expenseAmount')
const expenseForm = document.querySelector('#expenseForm');
const expenseList = document.querySelector('#expenseList');
const expensePlaceholder = document.querySelector('#expensePlaceholder');
const clearBtn = document.querySelector('#clearExpensesBtn')

const expenses = []

function formatCurrency(amount) {
    return `$${amount.toFixed(2)}`;
}

function updateSummary() {
    const totalAmount = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    const averageAmount = expenses.length === 0 ? 0 : totalAmount / expenses.length;

    total.textContent = formatCurrency(totalAmount);
    average.textContent = formatCurrency(averageAmount);
    expensePlaceholder.hidden = expenses.length > 0;
}

function addExpense(name, amount) {
    const trimmedName = name.trim();
    const numericAmount = Number(amount);

    if (!trimmedName || Number.isNaN(numericAmount) || numericAmount < 0) return false;

    const expenseData = { name: trimmedName, amount: numericAmount };
    expenses.push(expenseData);

    const expense = document.createElement('li');
    expense.classList.add('expense-item');

    const expenseText = document.createElement('span');
    expenseText.textContent = `${trimmedName} - ${formatCurrency(numericAmount)}`;

    const delBtn = document.createElement('button');
    delBtn.classList.add('delBtn');
    delBtn.type = 'button';
    delBtn.textContent = 'Delete';

    delBtn.addEventListener('click', () => {
        const expenseIndex = expenses.indexOf(expenseData);

        if (expenseIndex !== -1) {
            expenses.splice(expenseIndex, 1);
        }

        expense.remove();
        updateSummary();
    });

    expense.append(expenseText, delBtn);
    expenseList.appendChild(expense);
    updateSummary();

    return true;
}

expenseForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const wasAdded = addExpense(expenseName.value, expenseAmount.value);

    if (!wasAdded) {
        return;
    }

    expenseForm.reset();
    expenseName.focus();
});

clearBtn.addEventListener('click', () => {
    expenses.length = 0;
    expenseList.innerHTML = '';
    updateSummary();
});

updateSummary();
