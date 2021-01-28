import React from 'react';
import { mount } from 'enzyme';
import { HeroScreen } from '../../../components/heroes/HeroScreen';
import { MemoryRouter } from 'react-router-dom';

describe('Pruebas en <HeroScreen />', () => {

    const history = {
        length: 10,
        push: jest.fn(),
        goBack: jest.fn(),
    }

    const wrapper = mount(
        <MemoryRouter initialEntries={['/hero']}>
            <HeroScreen history={history}/>
        </MemoryRouter>
    );

    test('debe mostrar el componente redirect si no hay argumentos en la URL', () => {
        
        expect(wrapper.find('Redirect').exists()).toBe(true);

    })
    
    
});
