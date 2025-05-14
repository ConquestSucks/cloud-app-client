import { useMutation } from '@tanstack/react-query';
import { UploadFileParams } from '../model/types';

export const uploadFile = async ({ file, metadata }: UploadFileParams): Promise<number> => {
  const formData = new FormData();

  formData.append('file', file);

  if (metadata.name) formData.append('name', metadata.name);
  if (metadata.user?.id) formData.append('userId', metadata.user.id.toString());
  if (metadata.cloudFolder?.id) formData.append('cloudFolderId', metadata.cloudFolder.id.toString());
  if (metadata.extension) formData.append('extension', metadata.extension);

  const res = await fetch('/api/files/upload', {
    method: 'POST',
    body: formData,
  });

  return res.status;
};


export const useUploadFile = () => {
  return useMutation({
    mutationFn: uploadFile,
  });
};