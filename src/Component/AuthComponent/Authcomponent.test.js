import { render,fireEvent } from '@testing-library/react';
import AuthComponent from './AuthComponent'
import { act } from 'react-dom/test-utils';
import {
    BrowserRouter as Router,
  } from "react-router-dom";

describe("Login render Page", () => {
    it('renders the Login page', () => {
      const {getByText} = render(<Router><AuthComponent/></Router>);
      expect(getByText(/login/i)).toBeInTheDocument();
    });
  
    it('render 2 input components', () => {
      const {getByPlaceholderText} = render(<Router><AuthComponent/></Router>);
      expect(getByPlaceholderText(/username/i)).toBeInTheDocument();
      expect(getByPlaceholderText(/password/i)).toBeInTheDocument();
    });
  
    it('renders a submit button', () => {
      const {getByText} = render(<Router><AuthComponent/></Router>);
      expect(getByText("Login")).toBeInTheDocument();
    });
  }  );

  describe('Validation',()=>{
    it('validate user inputs, and provides error messages', async () => {
        const { getByTestId, getByText,getByPlaceholderText } = render(<Router><AuthComponent/></Router>)
    
        await act (async () => {
          fireEvent.change(getByPlaceholderText(/username/i), {
            target: {value: ''},
          });
    
          fireEvent.change(getByPlaceholderText(/password/i), {
            target: {value: ''},
          })
        });
    
        await act (async () => {
          fireEvent.click(getByTestId('login-cta'))
        });
    
        expect(getByText("Oops wrong password Entered, pls try again")).toBeInTheDocument();
        
      });
  })