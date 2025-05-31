import extensions from '../../lib/extensions.json'
import ImageIcon from '@mui/icons-material/Image';
import MovieIcon from '@mui/icons-material/Movie';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';

const FilePreview = ({ extension }: { extension: string }) => {
    if (extensions.image.includes(extension))
        return <ImageIcon fontSize='large' />
    else if (extensions.video.includes(extension))
        return <MovieIcon fontSize='large' />

    return <TextSnippetIcon fontSize='large' />
};

export default FilePreview;