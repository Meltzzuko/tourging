import { describe, it } from "vitest";
import { render , screen} from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'; // import MemoryRouter
import ForgotPasswordPage from "./ForgotPassword";

describe('ForgotPassword Page', () => {
    it('Check text Forgot Password', () => {
        render(
            <MemoryRouter>
                <ForgotPasswordPage/>
            </MemoryRouter>
        );
        expect(screen.getByText('Forgot your password?')).toBeInTheDocument();
    })

    it('Check text Email Address', () => {
        render(
          <MemoryRouter> 
            <ForgotPasswordPage />
          </MemoryRouter>
        );
        expect(screen.getByText('Email Address')).toBeInTheDocument();
    })

    it('Check text in button Send Email for reset password', () => {
        render(
            <MemoryRouter> 
            <ForgotPasswordPage />
          </MemoryRouter>
        );
        expect(screen.getByText('Send Email for reset password')).toBeInTheDocument();
    })

    it('Check text in button สมัครสมาชิก', () => {
        render(
          <MemoryRouter> // wrap with MemoryRouter
            <ForgotPasswordPage />
          </MemoryRouter>
        );
        expect(screen.getByText('สมัครสมาชิก')).toBeInTheDocument();
    })

    it('Check text in button Tour Ging', () => {
        render(
          <MemoryRouter> // wrap with MemoryRouter
            <ForgotPasswordPage/>
          </MemoryRouter>
        );
        expect(screen.getByText('Tour Ging')).toBeInTheDocument();
    })
})