import React from 'react'
import { Spending } from './Spending'

export const ListSpending = ( 
  { spendings,
   setEditSpending,
    deleteSpending,
    filteredSpendings,
    filter} ) => {
  return (
    <section className='listado-gastos contenedor'> 
        {
          filter ? 
          (
            <>
            <h2>{filteredSpendings.lenght ?  'Gastos' : 'No hay gastos'}</h2>
              {
                filteredSpendings.map( spending => (
                  <Spending
                    key={spending.id}
                    spending={spending}
                    setEditSpending={setEditSpending}
                    deleteSpending={deleteSpending}
                  />
                ))
              }
            </>
          )
          :
          (
            <>
            <h2>{spendings.lenght ?  'Gastos' : 'No hay gastos'}</h2>
              {
                spendings.map( spending => (
                  <Spending
                      key={spending.id}
                      spending={spending}
                      setEditSpending={setEditSpending}
                      deleteSpending={deleteSpending}
                  />
                ))
              }
            </>
          )
        }

    </section>
  )
}