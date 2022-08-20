import renderer from 'react-test-renderer';
import ShortenedUrl from '../Components/ShortenedUrl';

it('Renders a shortened URL referencing to the original URL', () => {
    const tree = renderer
        .create(<ShortenedUrl shortUrl={"abc123"} url={"https://drive.google.com/file/d/1XoERT9CyIk7mTT8qXvI6fvoCgjcaM2IL/view"} />)
        .toJSON();
    expect(tree).toMatchSnapshot();
});