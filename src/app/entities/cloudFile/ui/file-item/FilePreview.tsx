import Image from 'next/image';
import { fileTypeIcons } from '../../model/types';

const FilePreview = ({ extension }: { extension: string }) => {
    if (!fileTypeIcons[extension]) 
        return <Image src={`/file-type-icons/${fileTypeIcons["other"]}`} width={40} height={40} alt='fileIcon' className='my-auto'/>
    return <Image src={`/file-type-icons/${fileTypeIcons[extension]}`} width={40} height={40} alt='fileIcon' className='my-auto'/>
};

export default FilePreview;