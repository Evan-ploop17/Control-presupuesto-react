import {useState} from 'react'
import Message from './Message'

export default function NewBuget({ 
    budget, 
    setBudget, 
    setIsValidBudget 
}) {

    const [message, setMessage] = useState('')

    const handleBudget = (event) => {
        event.preventDefault()
        if(!budget || budget < 0 ){
            setMessage('No es un presupuesto valido')
            return
        }
        setMessage('')
        setIsValidBudget(true)
    }

  return (
    <section className='contenedor-presupuesto contenedor sombra'>
        <form className='formulario' onSubmit={handleBudget} >
            <section className='campo' >
                <label htmlFor="budget">Definir presupuesto</label>
                <input
                    className='nuevo-presupuesto'
                    type="number"
                    placeholder='Añade tu presupuesto'
                    value={budget}
                    onChange={ e => setBudget( Number(e.target.value )) }
                />
            </section>
            <input type='submit' value='Añadir' />
            {message && <Message tipo="error" >{message}</Message> }
        </form>
    </section>
  )
}