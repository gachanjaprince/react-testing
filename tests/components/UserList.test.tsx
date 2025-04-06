import { render, screen } from '@testing-library/react';
import UserList from '../../src/components/UserList';
import { User } from '../../src/entities';

describe ('UserList', ()=> {
    it('should render No users available when no users are available', ()=>{
        render(<UserList users = {[]} />)
        expect(screen.getByText(/no users/i)).toBeInTheDocument()
    })

    it('should render list of users if users are available', ()=>{
        const users: User[] = [
            { id: 0, name: 'bob'},
            { id: 1, name: 'henry'}
        ]

        render(<UserList users = {users} />);
        users.forEach((user =>{
            const link = screen.getByRole('link', {name: user.name});
            expect(link).toBeInTheDocument();
            expect(link).toHaveAttribute('href', `/users/${user.id}`);
        }))

    })
})