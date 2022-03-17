import {useState, useEffect} from 'react'

export const Filters = ({filter, setFilter}) => {
  return (
    <section className='filtros sombra contenedor'>
        <form>
            <section className='campo'> 
                <label> Filtrar Gastos </label>
                <select
                    value={filter}
                    onChange={e=>{setFilter(e.target.value)}}
                >
                    <option value=""> Todas las categorias </option>
                    <option value="ahorro">Ahorro</option>
                    <option value="casa">Casa</option>
                    <option value="comida">Comida</option>
                    <option value="gastos">Gastos</option>
                    <option value="ocio">Ocio</option>
                    <option value="salud">Salud</option>
                    <option value="suscripciones">Suscripciones</option>
                </select>
            </section>
        </form>
    </section>
  )
}