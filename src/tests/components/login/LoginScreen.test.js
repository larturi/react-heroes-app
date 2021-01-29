import React from 'react';
import { mount } from "enzyme";
import { LoginScreen } from '../../../components/login/LoginScreen';
import { AuthContext } from '../../../auth/AuthContext';
import { types } from '../../../types/types';

describe('Pruebas en <LoginScreen />', () => {

    const history = {
        replace: jest.fn(),
    };

    const contextValue = {
        dispatch: jest.fn(),
        user: {
            logged: false
        }
    };

    const wrapper = mount(
        <AuthContext.Provider value={contextValue}>
            <LoginScreen history={history} />
        </AuthContext.Provider>
    );

    test('debe mostrarse correctamente', () => {

        expect(wrapper).toMatchSnapshot();
        
    });

    test('debe realizar el dispatch y la navegacion', () => {
        
        wrapper.find('button').prop('onClick')();

        expect(contextValue.dispatch).toHaveBeenCalledWith({
            payload:  {
                nombre: "Leandro Arturi",
            },
            type: types.login,
        });

        expect(history.replace).toHaveBeenCalled();

    });
    
    
    
});
