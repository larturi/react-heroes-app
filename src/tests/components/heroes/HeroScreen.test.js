import React from 'react';
import { mount } from 'enzyme';
import { HeroScreen } from '../../../components/heroes/HeroScreen';
import { MemoryRouter, Route } from 'react-router-dom';

describe('Pruebas en <HeroScreen />', () => {

    const history = {
        length: 10,
        push: jest.fn(),
        goBack: jest.fn(),
    }
    
    test('debe mostrar el componente redirect si no hay argumentos en la URL', () => {
        
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero']}>
                <HeroScreen history={history}/>
            </MemoryRouter>
        );

        expect(wrapper.find('Redirect').exists()).toBe(true);

    });

    test('debe mostrar un heroe si el parametro existe en la base', () => {
    
        const wrapper = mount(
            <MemoryRouter initialEntries={['/heroe/marvel-spider']}>
                <Route path="/heroe/:heroeId" component={HeroScreen} />
            </MemoryRouter>
        );

        expect(wrapper.find('.row').exists()).toBe(true);

    });

    test('debe regresar a la pantalla anterior history', () => {
       
        const history = {
            length: 1,
            push: jest.fn(),
            goBack: jest.fn(),
        }

        const wrapper = mount(
            <MemoryRouter initialEntries={['/heroe/marvel-spider']}>
                <Route 
                    path="/heroe/:heroeId" 
                    component={ () => <HeroScreen history={history} />} 
                />
            </MemoryRouter>
        );

        wrapper.find('button').prop('onClick')();

        expect(history.push).toHaveBeenCalledWith('/');
        expect(history.goBack).not.toHaveBeenCalled();

    });

    test('debe regresar a la pantalla anterior goBack', () => {
       
        const wrapper = mount(
            <MemoryRouter initialEntries={['/heroe/marvel-spider']}>
                <Route 
                    path="/heroe/:heroeId" 
                    component={ () => <HeroScreen history={history} />} 
                />
            </MemoryRouter>
        );

        wrapper.find('button').prop('onClick')();

        expect(history.push).not.toHaveBeenCalled();
        expect(history.goBack).toHaveBeenCalled();

    });

    test('debe llamar el redirect si el heroe no existe', () => {

        const wrapper = mount(
            <MemoryRouter initialEntries={['/heroe/marvel-spider-123123123']}>
                <Route 
                    path="/heroe/:heroeId" 
                    component={ () => <HeroScreen history={history} />} 
                />
            </MemoryRouter>
        );

        expect(wrapper.text()).toBe('');
        
    });
    
    
});
