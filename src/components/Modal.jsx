import { useState, useEffect } from 'react'
import cerrarBtn from '../img/cerrar.svg'
import Message from './Message'

export default function Modal({setModal, animateModal, setAnimateModal, saveSpending, editSpending, setEditSpending}) {

    const [message, setMessage] = useState('')
    const [nameSpending, setNameSpending] = useState('')
    const [amount, setAmount] = useState('')
    const [category, setCategory] = useState('')
    const [date, setDate] = useState('')
    const [id, setId] = useState('')

    useEffect( () => {
        if(Object.keys(editSpending).length > 0 ){
            setNameSpending(editSpending.nameSpending)
            setAmount(editSpending.amount)
            setCategory(editSpending.category)
            setId(editSpending.id)
            setDate(editSpending.date)
        }
    }, [] )

    const hideModal = ()=>{
        setAnimateModal(false)
        setEditSpending({})
        setTimeout(() => {
            setModal(false)
        }, 500);
    }
    const handleSubmit = (event) => {
        event.preventDefault()
        if([nameSpending, amount, category].includes('')){
            setMessage('Todos los campos son obligatorios')
            setTimeout(() => {
                setMessage('')
            }, 2500);
            return
        }
        saveSpending({nameSpending, amount, category, id, date })
    }

  return (
      <section className='modal'>
          <section className="cerrar-modal">
              <img src={cerrarBtn} alt="CerrarModal" onClick={hideModal} />
          </section>

          <form 
            className={`formulario ${animateModal ? 'animar': 'cerrar'}`} 
            onSubmit={handleSubmit}
          >

              <legend> { editSpending.nameSpending ? 'Editar Gasto' : 'Añadir Gasto' } </legend>
              {message && <Message tipo='error'> {message} </Message>}
              <section className='campo'>

                  <label htmlFor="nombre">Nombre Gasto</label>
                  <input 
                    id="nombre"
                    type="text"
                    placeholder='Añade el nombre del gasto'
                    value={nameSpending}
                    onChange={e=>{setNameSpending(e.target.value)}}
                  />
              </section>

              <section className='campo'>
                  <label htmlFor="cantidad">Cantidad</label>
                  <input 
                    id='cantidad'
                    type="number"
                    placeholder='Añade la camtidad del gasto'
                    value={amount}
                    onChange={e=>{setAmount(Number(e.target.value))}}
                  />
              </section>

              <section className='campo'>
                  <label htmlFor="categoria">Categoria</label>
                  <select
                    value={category}
                    onChange={e=>{setCategory(e.target.value)}}
                  >
                      <option value="">--Seleccione--</option>
                      <option value="ahorro">Ahorro</option>
                      <option value="casa">Casa</option>
                      <option value="comida">Comida</option>
                      <option value="gastos">Gastos</option>
                      <option value="ocio">Ocio</option>
                      <option value="salud">Salud</option>
                      <option value="suscripciones">Suscripciones</option>
                  </select>
              </section>
              <input
                type='submit'
                value= { editSpending.nameSpending ? 'Guardar Cambios' : 'Añadir Gasto' }
              />
          </form>
      </section>
  )
}