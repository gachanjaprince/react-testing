import { render, screen } from '@testing-library/react';
import UserAccount from '../../src/components/UserAccount';
import { User } from '../../src/entities';

describe('UserAccount', () => {
    it('should render name', () => {
        const user: User = { id: 0, name: 'bob'}
        render(<UserAccount user = {user}/>)

        expect(screen.getByText(user.name)).toBeInTheDocument()
    })
    
    it('should render edit button is user is admin', () => {
        const adminUser: User = { id: 0, name: 'bob', isAdmin: true}
        render(<UserAccount user = {adminUser} />)

        const button = screen.getByRole('button')
        expect(button).toBeInTheDocument()
        expect(button).toHaveTextContent(/edit/i)
    })


    it('should NOT render edit button is user is NOT admin', () => {
        const notAdminUser: User = { id: 0, name: 'bob', isAdmin: false}
        render(<UserAccount user = {notAdminUser} />)

       const button = screen.queryByRole('button')
       expect(button).not.toBeInTheDocument()
    })

})