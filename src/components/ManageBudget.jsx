import { useState, useEffect } from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

const ManageBudget = ({ 
        budget,
        setBudget,
        spendings,
        setSpendings,
        setIsValidBudget
     }) => {
    
    const [available, setAvailable] = useState(0)
    const [spent, setSpent] = useState(0)
    const [percentage, setPercentage] = useState(0)


    useEffect(() => {
        const totalSpent = spendings.reduce( (total, spending) => spending.amount + total, 0)
        const totalAvailable = budget - totalSpent
        const newPercentage = (( (budget - totalAvailable) / budget ) * 100).toFixed(2) 
        setTimeout(() => {
            setPercentage(newPercentage)
        }, 800);
        setAvailable(totalAvailable)
        setSpent(totalSpent)
    }, [spendings])
    

    const formatQuantity = (amount) =>{
        return amount.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
        })
    }

    const handleResetApp = () => {
        const result = confirm('Deseas reiniciar presupuesto y gastos?')
        if(result ){
            setSpendings([])
            setBudget(0)
            setIsValidBudget(false)
        }
    }

  return (
    <section className='contenedor-presupuesto contenedor sombra dos-columnas' >
        <section>{}
            <CircularProgressbar
                styles={buildStyles({
                    pathColor: percentage > 100 ? '#DC2626' : '#3B82F6' ,
                    trailColor: '#f5f5f5',
                    pathTransitionDuration: 0.8,
                    textColor: percentage > 100 ? '#DC2626' : '#3B82F6' ,
                })}
                text={`${percentage}% Gastado`}
                value={percentage}
            />
        </section>
        <section className='contenido-presupuesto' >
            <button 
                className='reset-app'
                type='button'
                onClick={handleResetApp}
            >
                Resetear app
            </button>
            <p>
                <span>Presupuesto: </span>{formatQuantity(budget)}   
            </p>
            <p  className={`${available < 0 ? 'negativo' : ''}`} >  
                <span>Disponible: </span>{formatQuantity(available)}   
            </p>
            <p>
                <span>Gastado: </span>{formatQuantity(spent)}   
            </p>
        </section>
    </section>
  )
}
export default ManageBudget