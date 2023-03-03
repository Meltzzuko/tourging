import { describe, it } from "vitest";
import { render , screen} from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'; // import MemoryRouter
import Homepage from "./Home";

describe('Home Page', () => {
    it('Check text สถานะ', () => {
        render(
          <MemoryRouter> // wrap with MemoryRouter
            <Homepage />
          </MemoryRouter>
        );
        expect(screen.getByText('สถานะ')).toBeInTheDocument();
    })

    it('Check text ทัวร์ภูเก็ต พร้อมที่พัก', () => {
        render(
          <MemoryRouter> // wrap with MemoryRouter
            <Homepage />
          </MemoryRouter>
        );
        expect(screen.getByText('ทัวร์ภูเก็ต พร้อมที่พัก')).toBeInTheDocument();
    })

    it('Check text Sign up', () => {
      render(
        <MemoryRouter> // wrap with MemoryRouter
          <Homepage />
        </MemoryRouter>
      );
      expect(screen.getByText('Sign up')).toBeInTheDocument();
  })

    it('Check text Sign in', () => {
        render(
          <MemoryRouter> // wrap with MemoryRouter
            <Homepage />
          </MemoryRouter>
        );
      expect(screen.getByText('Sign in')).toBeInTheDocument();
    })

    it('Check text หน้าหลัก', () => {
        render(
          <MemoryRouter> // wrap with MemoryRouter
            <Homepage />
          </MemoryRouter>
        );
        expect(screen.getByText('หน้าหลัก')).toBeInTheDocument();
    })
})