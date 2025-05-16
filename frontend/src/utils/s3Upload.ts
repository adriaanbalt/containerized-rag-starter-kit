import { PutObjectCommand } from '@aws-sdk/client-s3';
import { awsFactory } from './awsFactory';

export interface UploadProgress {
  progress: number;
  totalFiles: number;
  uploadedFiles: number;
}

export const uploadToS3 = async (
  files: FileList,
  onProgress: (progress: UploadProgress) => void
): Promise<void> => {
  try {
    // Initialize AWS clients
    const clients = await awsFactory();
    const s3Client = clients.s3;

    const totalFiles = files.length;
    let uploadedFiles = 0;

    // Process each file
    for (const file of Array.from(files)) {
      const fileContent = await file.arrayBuffer();
      
      // Create a unique key for the file
      const key = `uploads/${Date.now()}-${file.name}`;

      // Upload to S3
      await s3Client.send(new PutObjectCommand({
        Bucket: 'banabanabucket9571c-dev', // Replace with your actual bucket name
        Key: key,
        Body: fileContent,
        ContentType: file.type,
      }));

      uploadedFiles++;
      
      // Calculate and report progress
      const progress = Math.round((uploadedFiles / totalFiles) * 100);
      onProgress({
        progress,
        totalFiles,
        uploadedFiles
      });
    }
  } catch (error) {
    console.error('Error uploading to S3:', error);
    throw error;
  }
}; 