import { describe, it } from "vitest";
import { render , screen} from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'; // import MemoryRouter
import Login from "./Login";

describe('LoginPage', () => {
    it('Check text Email Address', () => {
        render(
          <MemoryRouter> // wrap with MemoryRouter
            <Login />
          </MemoryRouter>
        );
        expect(screen.getByText('Email Address')).toBeInTheDocument();
    })

    it('Check text Password', () => {
        render(
          <MemoryRouter> // wrap with MemoryRouter
            <Login />
          </MemoryRouter>
        );
        expect(screen.getByText('Password')).toBeInTheDocument();
    })

    it('Check text in button ลืมรหัสผ่าน?', () => {
        render(
          <MemoryRouter> // wrap with MemoryRouter
            <Login />
          </MemoryRouter>
        );
        expect(screen.getByText('ลืมรหัสผ่าน?')).toBeInTheDocument();
    })

    it('Check text in button สมัครสมาชิก', () => {
        render(
          <MemoryRouter> // wrap with MemoryRouter
            <Login />
          </MemoryRouter>
        );
        expect(screen.getByText('สมัครสมาชิก')).toBeInTheDocument();
    })

    it('Check text in button Tour Ging', () => {
        render(
          <MemoryRouter> // wrap with MemoryRouter
            <Login/>
          </MemoryRouter>
        );
        expect(screen.getByText('Tour Ging')).toBeInTheDocument();
    })
})