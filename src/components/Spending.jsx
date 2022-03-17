import React from 'react'

// estas son para los swipe de cada item de la lista
import { 
    LeadingActions,
    SwipeableList,
    SwipeableListItem,
    SwipeAction,
    TrailingActions
} from 'react-swipeable-list'
import 'react-swipeable-list/dist/styles.css'

import { formatDate } from '../helpers'

import IconSaving from '../img/icono_ahorro.svg'
import IconHome from '../img/icono_casa.svg'
import IconFood from '../img/icono_comida.svg'
import IconSpending from '../img/icono_gastos.svg'
import IconLeisure from '../img/icono_ocio.svg'
import IconMedical from '../img/icono_salud.svg'
import IconSuscriptions from '../img/icono_suscripciones.svg'

const dictionaryIcons = {
    ahorro : IconSaving,
    casa : IconHome,
    comida : IconFood,
    gastos : IconSpending,
    ocio : IconLeisure,
    salud : IconMedical,
    suscripciones : IconSuscriptions,
}


export const Spending = ({ spending, setEditSpending, deleteSpending }) => {

    const {nameSpending, category, id, amount, date } = spending


    const leadingActions = () => (
        <LeadingActions>
            <SwipeAction onClick={()=> setEditSpending(spending)} >
                Editar
            </SwipeAction>
        </LeadingActions>
    )

    const trailingActions = () => (
        <TrailingActions>
            <SwipeAction 
                onClick={()=> deleteSpending(id) }
                destructive={true}
            >
                Eliminar
            </SwipeAction>
        </TrailingActions>
    )

  return (
      <SwipeableList>
          <SwipeableListItem
            leadingActions={leadingActions()}
            trailingActions={trailingActions()}
          >
            <section className='gasto sombra'>
                <section className='contenido-gasto'>
                    <img
                    src={dictionaryIcons[category]}
                    alt='Icono gasto'
                    />
                    <section className='descripcion-gasto'>
                        <p className='categoria'> {category} </p>
                        <p className='nombre-gasto'> {nameSpending} </p>
                        <p className='fecha-gasto'> 
                        Agregar el: {''}
                        <span>{formatDate(date)}</span>
                        </p>
                    </section>
                </section>
                <p className='cantidad-gasto'> $ {amount}</p>
            </section>
          </SwipeableListItem>
      </SwipeableList>
      
  )
}