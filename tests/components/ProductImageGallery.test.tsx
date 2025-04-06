import { render, screen } from "@testing-library/react";
import ProductImageGallery from "../../src/components/ProductImageGallery";

describe ('ProductImageGallery', () => {
    it('should render nothing if imageUrls is empty', () => {
        const result = render(<ProductImageGallery imageUrls = {[]} />)
        expect(result.container).toBeEmptyDOMElement();
    })

    it('should render image list if imageUrls is populated', () => {
        const imgUrls :string[] = ['url1', 'url2', "url3"]

        render(<ProductImageGallery imageUrls = {imgUrls} />);
        const images = screen.getAllByRole('img');
        expect(images).toHaveLength(3);
        imgUrls.forEach((url, i)=>{
            expect(images[i]).toHaveAttribute('src', url)
        })
    })
})