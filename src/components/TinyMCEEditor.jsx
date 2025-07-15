import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { toast } from 'react-toastify';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../App.jsx';

const TinyMCEEditor = ({ value, onChange, onImageUpload }) => {
  const editorRef = useRef(null);

  const handleImageUpload = async (file) => {
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Dosya boyutu 5MB\'dan küçük olmalıdır');
      return null;
    }

    if (!file.type.startsWith('image/')) {
      toast.error('Sadece resim dosyaları yüklenebilir');
      return null;
    }

    const loadingToast = toast.loading('Resim yükleniyor...');
    try {
      const fileName = `blog-content-images/${Date.now()}-${file.name}`;
      const storageRef = ref(storage, fileName);
      
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      
      toast.dismiss(loadingToast);
      toast.success('Resim başarıyla eklendi');
      return downloadURL;
    } catch (error) {
      toast.dismiss(loadingToast);
      console.error('Resim yükleme hatası:', error);
      toast.error('Resim yüklenirken hata oluştu');
      return null;
    }
  };

  return (
    <div className="tinymce-editor-wrapper">
      <Editor
        apiKey="mhsnyhm1esfhkgwfz7q9is1toe2xqligo33ly4i9g90yminw"
        onInit={(evt, editor) => editorRef.current = editor}
        value={value}
        onEditorChange={onChange}
        init={{
          height: 500,
          menubar: false,
          plugins: [
            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
            'insertdatetime', 'media', 'table', 'paste', 'help', 'wordcount'
          ],
          toolbar: 'undo redo | formatselect | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent | link image | table | code | removeformat | help',
          content_style: `
            body { 
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; 
              font-size: 16px; 
              line-height: 1.6; 
              color: #333; 
            }
            h1, h2, h3, h4, h5, h6 { 
              color: #2F3D8D; 
              margin-top: 1.5em; 
              margin-bottom: 0.5em; 
            }
            p { 
              margin-bottom: 1em; 
            }
            img { 
              max-width: 100%; 
              height: auto; 
            }
          `,
          automatic_uploads: true,
          file_picker_types: 'image',
          file_picker_callback: (callback, value, meta) => {
            if (meta.filetype === 'image') {
              const input = document.createElement('input');
              input.setAttribute('type', 'file');
              input.setAttribute('accept', 'image/*');
              input.addEventListener('change', async (e) => {
                const file = e.target.files[0];
                if (file) {
                  const url = await handleImageUpload(file);
                  if (url) {
                    callback(url, { title: file.name });
                  }
                }
              });
              input.click();
            }
          },
          paste_data_images: true,
          images_upload_handler: async (blobInfo, progress) => {
            const file = blobInfo.blob();
            const url = await handleImageUpload(file);
            if (url) {
              return url;
            }
            throw new Error('Resim yüklenemedi');
          },
          setup: (editor) => {
            editor.on('drop', (e) => {
              const files = e.dataTransfer.files;
              if (files.length > 0) {
                const file = files[0];
                if (file.type.startsWith('image/')) {
                  e.preventDefault();
                  handleImageUpload(file).then(url => {
                    if (url) {
                      editor.insertContent(`<img src="${url}" alt="${file.name}" style="max-width: 100%; height: auto;" />`);
                    }
                  });
                }
              }
            });
          }
        }}
      />
    </div>
  );
};

export default TinyMCEEditor; 