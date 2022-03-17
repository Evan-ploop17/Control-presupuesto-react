import React from 'react'
import ManageBudget from './ManageBudget'
import NewBuget from './NewBuget'

export default function Header({ 
    spendings,
    setSpendings,
    budget,    
    setBudget, 
    isValidBudget, 
    setIsValidBudget
}) {
  return (
    <header>
        <h1>Planificador de gastos</h1>

        {isValidBudget
            ?   <ManageBudget
                    spendings={spendings}
                    setSpendings={setSpendings}
                    budget={budget}
                    setBudget={setBudget}
                    setIsValidBudget={setIsValidBudget}
                />
            :   <NewBuget
                    budget={budget}
                    setBudget={setBudget}
                    setIsValidBudget={setIsValidBudget}
                />
        }

        
    </header>
  )
}
