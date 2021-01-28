import React from 'react';
import { mount } from "enzyme";
import { Navbar } from '../../../components/ui/NavBar';
import { AuthContext } from '../../../auth/AuthContext';
import { MemoryRouter, Router } from 'react-router-dom';
import { types } from '../../../types/types';
import '@testing-library/jest-dom';

describe('Pruebas en <Navbar />', () => {

    const historyMock = {
        push: jest.fn(),
        location: {},
        listen: jest.fn(),
        createHref: jest.fn(),
        replace: jest.fn(),
    };

    const contextValue = {
        dispatch: jest.fn(),
        user: {
            logged: true,
            nombre: 'Fulano'
        }
    }

    const wrapper = mount(
        <AuthContext.Provider value={contextValue}>
            <MemoryRouter>
                <Router history={historyMock}>
                    <Navbar />
                </Router>
            </MemoryRouter>
        </AuthContext.Provider>
    );

    afterEach( () => {
        jest.clearAllMocks();
    });

    test('debe mostrarse correctamente', () => {

        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('.text-info').text().trim()).toBe('Fulano');

    });

    test('debe llamar al logout y usar history', () => {
        
        wrapper.find('button').prop('onClick')();

        expect(contextValue.dispatch).toHaveBeenCalledWith({
            type: types.logout
        });

        expect(historyMock.replace).toHaveBeenCalledWith('/login');

    });
    
    
    
});
