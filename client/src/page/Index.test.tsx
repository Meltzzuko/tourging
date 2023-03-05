import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import IndexPage from './Index';
import { MemoryRouter } from 'react-router-dom';

describe('Index Page', () => {
  it('renders user navbar', () => {
    render(
      <MemoryRouter>
        <IndexPage />
      </MemoryRouter>
    );
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('renders company description', () => {
    render(
      <MemoryRouter>
        <IndexPage />
      </MemoryRouter>
    );
    expect(
      screen.getByText(
        'หากคุณกำลังหาบริษัทที่จัดทำทัวร์ท่องเที่ยวในภูเก็ต และต้องการได้รับบริการที่ดี สถานที่พักคุณภาพ วิวสวยๆในราคา ย่อมเยาละก็ เราขอเสนอ บริษัท Tourging ซึ่งทำเกี่ยวกับการท่องเที่ยวในภูเก็ต พร้อมมีทีมงานคุณภาพคอยดูแลการท่องเที่ยว ซึ่งจะมอบประสบการณ์ที่ดีในการเที่ยว ของคุณแน่นอน'
      )
    ).toBeInTheDocument();
  });

  it('renders "เข้าสู่หน้าเว็บไซต์" button', () => {
    render(
      <MemoryRouter>
        <IndexPage />
      </MemoryRouter>
    );
    expect(screen.getByRole('button', { name: 'เข้าสู่หน้าเว็บไซต์' })).toBeInTheDocument();
  });
});
