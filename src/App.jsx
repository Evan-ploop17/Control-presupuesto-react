import { useState, useEffect } from 'react'
import Header from './components/Header'
import Modal from './components/Modal'
import IconNewSpending from './img/nuevo-gasto.svg'
import {generateRandomNumber} from './helpers'
import { ListSpending } from './components/ListSpending'
import { Filters } from './components/Filters'

function App() {

  const [budget, setBudget] = useState(
    Number(localStorage.getItem('budget')) ?? 0
    )
  const [spendings, setSpendings] = useState(
    localStorage.getItem('spendings') ? JSON.parse(localStorage.getItem('spendings'))  : []
  )
  const [isValidBudget, setIsValidBudget] = useState(false)
  const [modal, setModal] = useState(false)
  const [animateModal, setAnimateModal] = useState(false)
  const [editSpending, setEditSpending] = useState({})
  const [filter, setFilter] = useState('')
  const [filteredSpendings, setFilteredSpendings] = useState([])

  useEffect(() => {
    if(Object.keys(editSpending).length > 0 ){
      setModal(true)
      setTimeout(() => {
        setAnimateModal(true)
      }, 500);
    }
  }, [editSpending])

  useEffect(()=>{
    localStorage.setItem('budget', budget ?? 0)
  }, [budget])

  useEffect( ()=>{
    const budgetLS = Number(localStorage.getItem('budget') ) ?? 0 
    if(budgetLS > 0){
      setIsValidBudget(true)
    }
  }, [] )

  useEffect( () => {
    localStorage.setItem('spendings', JSON.stringify(spendings)) ?? []   
  }, [spendings])
  
  useEffect( ()=>{
    if(filter){
      const filteredSpendings = spendings.filter( spending => spending.category === filter )
      setFilteredSpendings(filteredSpendings)
    }
  }, [filter] )

  const handleNewSpending = () => {
    setModal(true)
    setEditSpending({})
    setTimeout(() => {
      setAnimateModal(true)
    }, 500);
  }

  const saveSpending = spending => {
    if(spending.id){
      // Actualizar
      const updatedSpending = spendings.map( stateSpending => stateSpending.id === spending.id ? spending : stateSpending )
      setSpendings(updatedSpending)
      setEditSpending({})
    }else{
      // New Spending
      spending.id = generateRandomNumber()
      spending.date = Date.now()
      setSpendings([...spendings, spending])
    }
    
    setTimeout(() => {
      setModal(false)
    }, 500);
  }

  const deleteSpending = id => {
    const updatedSpending = spendings.filter( spending => spending.id !== id)
    setSpendings(updatedSpending)
  }

  return (
    <section className={ modal ? 'fijar' : '' }>
      <Header
        spendings={spendings}
        setSpendings={setSpendings}
        budget={budget}
        setBudget={setBudget}
        isValidBudget={isValidBudget}
        setIsValidBudget={setIsValidBudget}
      />

      {
        isValidBudget && (
          <>
            <main>
              <Filters
                filter={filter}
                setFilter={setFilter}
              />
              <ListSpending
                spendings={spendings}
                setEditSpending={setEditSpending}
                deleteSpending={deleteSpending}

                filteredSpendings={filteredSpendings}
                filter={filter}
              />
            </main>
            <section className='nuevo-gasto'>
              <img 
                src={IconNewSpending} 
                alt='Icono de nuevo gasto'
                onClick={handleNewSpending}
              />
            </section>
          </>
        )}

      { modal && 
        <Modal 
          setModal={setModal} 
          animateModal={animateModal}
          setAnimateModal={setAnimateModal}  
          saveSpending={saveSpending}
          editSpending={editSpending}
          setEditSpending={setEditSpending}
        /> 
      }

    </section>
  )
}
export default App
