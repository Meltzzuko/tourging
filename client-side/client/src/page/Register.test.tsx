import { describe, it } from "vitest";
import { render , screen} from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'; // import MemoryRouter
import RegisterPage from "./Register";

describe('Register Page', () => {
    it('Check text Email Address', () => {
        render(
          <MemoryRouter> // wrap with MemoryRouter
            <RegisterPage />
          </MemoryRouter>
        );
        expect(screen.getByText('Email Address')).toBeInTheDocument();
    })

    it('Check text สมัครสมาชิก', () => {
        render(
          <MemoryRouter> // wrap with MemoryRouter
            <RegisterPage />
          </MemoryRouter>
        );
        expect(screen.getByText('สมัครสมาชิก')).toBeInTheDocument();
    })

    it('Check text Username', () => {
        render(
          <MemoryRouter> // wrap with MemoryRouter
            <RegisterPage />
          </MemoryRouter>
        );
        expect(screen.getByText('Username')).toBeInTheDocument();
    })

    it('Check text Password', () => {
        render(
          <MemoryRouter> // wrap with MemoryRouter
            <RegisterPage />
          </MemoryRouter>
        );
        expect(screen.getByText('Password')).toBeInTheDocument();
    })

    it('Check text Register', () => {
        render(
          <MemoryRouter> // wrap with MemoryRouter
            <RegisterPage />
          </MemoryRouter>
        );
        expect(screen.getByText('Register')).toBeInTheDocument();
    })
})