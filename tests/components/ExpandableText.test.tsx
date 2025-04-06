import { screen, render } from "@testing-library/react";
import ExpandableText from "../../src/components/ExpandableText";
import userEvent from "@testing-library/user-event";

describe('ExpandableText', ()=>{
    const longText = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab possimus ut doloremque quaerat necessitatibus, deleniti optio saepe magni veritatis ea? Deleniti dolorum molestiae nam recusandae consectetur officiis doloremque facere ab? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab possimus ut doloremque quaerat necessitatibus, deleniti optio saepe magni veritatis ea? Deleniti dolorum molestiae nam recusandae consectetur officiis doloremque facere ab?'
    const truncatedText = longText.substring(0, 255) + '...'
    it('should render full text and no button if text length is less or equal to 255', ()=>{
        render(<ExpandableText text={'short text'}/>);
        
        const article = screen.getByText('short text');
        expect(article).toBeInTheDocument();

    })

    it('should truncate text and show button if text length is greater than 255', ()=>{
        render(<ExpandableText text={longText}/>);
        
        expect(screen.getByText(truncatedText)).toBeInTheDocument();

        const button = screen.getByRole('button');
        expect(button).toHaveTextContent(/more/i);
    })

    it('should expand text when show more button is clicked', async ()=>{
        render(<ExpandableText text={longText}/>);
        
        const button = screen.getByRole('button');
        const user = userEvent.setup();
        await user.click(button);

        expect(screen.getByText(longText)).toBeInTheDocument();
        expect(button).toHaveTextContent(/less/i);
    })

    it('should collapse text when show less button is clicked', async ()=>{
        render(<ExpandableText text={longText}/>);
        const showMoreButton = screen.getByRole('button', {name: /more/i});
        const user = userEvent.setup();
        await user.click(showMoreButton);

        const showLessButton = screen.getByRole('button', {name: /less/i});
        await user.click(showLessButton);

        expect(screen.getByText(truncatedText)).toBeInTheDocument();
        expect(showLessButton).toHaveTextContent(/more/i);
    })
})