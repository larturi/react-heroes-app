import React, { useMemo } from 'react';
import queryString from 'query-string';

import { useLocation } from 'react-router-dom';
import { heroes } from '../../data/heroes';
import { useForm } from '../../hooks/useForm';
import { HeroeCard } from '../heroes/HeroeCard';
import { getHeroesByName } from '../../selectors/getHeroesByName';

export const SearchScreen = ({ history }) => {

    const location = useLocation();
    const { q = '' } = queryString.parse(location.search);

    const [ formValues, handleInputChange ] = useForm({
        searchText: q
    });

    const { searchText } = formValues;

    const handleSearch = (e) => {
        e.preventDefault();
        history.push(`?q=${searchText}`)
    }

    const heroesFiltered = useMemo(() => getHeroesByName(q), [q]);

    return (
        <div>
            <h1>Buscar Heroes</h1>
            <hr/>

            <div className="row">
                <div className="col-5">
                    <h4>Buscador</h4>
                    <hr/>

                    <form onSubmit={handleSearch}>
                        <input 
                           type="text"
                           placeholder="Buscar heroe..."
                           className="form-control"
                           name="searchText"
                           autoComplete="off"
                           value={ searchText }
                           onChange={ handleInputChange }
                        />

                        <div className="d-grid gap-2">
                            <button
                                type="submit"
                                className="btn mt-2 w-100 btn-outline-primary"
                            >
                                Buscar...
                            </button>
                        </div>

                    </form>
                </div>

                <div className="col-7">
                    <h4>Resultados</h4>
                    <hr/>

                    {
                        (q==='') && <div className="alert alert-info">Busca un heroe</div>
                    }

                    {
                        (q!=='' && heroesFiltered.length === 0) && <div className="alert alert-danger">No se han encontrado heroes</div>
                    }

                    {
                        heroesFiltered.map(hero => (
                            <HeroeCard
                                key={hero.id}
                                { ...hero }
                            />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}
